"use server"
import Razorpay from "razorpay"
import mongoose from "mongoose"
import Payment from "@/models/Payment.js"
import connectDB from "@/db/connectDb.js"
import User from "@/models/User.js"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    let options = {
        amount: Number.parseInt(amount * 100),
        currency: "INR",
    }

    let x = await instance.orders.create(options)

    //create a payment object which shows a pending payment in database
    await Payment.create({ oid: x.id, amount: amount, to_user: to_username, name: paymentform.name, message: paymentform.message })
    return x
}

export const fetchuser = async (username) => {
    await connectDB()
    let user = await User.findOne({ username }).lean()
    return user ? JSON.parse(JSON.stringify(user)) : null
}


export const fetchpayments = async (username) => {
    await connectDB()
    //find alll payment sorted in decreasing order of amount and flatten object
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(7).lean()
    return JSON.parse(JSON.stringify(p))
}

export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = data

    // If username is updated, check if it's available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
        await User.updateOne({ email: ndata.email }, ndata)
        //Now update all the usernames in the payment table
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })
    } else {
        await User.updateOne({ email: ndata.email }, ndata)
    }

}
