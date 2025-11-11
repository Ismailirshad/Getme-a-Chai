import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment.js";
import connectDB from "@/db/connectDb.js";
import User from "@/models/User";

export const POST = async (req) => {
  await connectDB();

  let body = await req.formData();
  body = Object.fromEntries(body);

  // Check if Razorpay order exists in DB
  const paymentRecord = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!paymentRecord) {
    return NextResponse.json({ success: false, message: "Order ID not found" });
  }

  // ✅ Use global secret from env
  const secret = process.env.RAZORPAY_KEY_SECRET;

  // Verify Razorpay signature
  const isValid = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    secret
  );

  if (!isValid) {
    return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
  }

  // ✅ Mark payment as completed
  const updatedPayment = await Payment.findOneAndUpdate(
    { oid: body.razorpay_order_id },
    { done: true },
    { new: true }
  );

  // ✅ Redirect user back
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?Paymentdone=true`
  );
};
