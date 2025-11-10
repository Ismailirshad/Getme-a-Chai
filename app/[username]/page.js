import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDb';
import User from '@/models/User';

export default async function Username({ params }) {
  const { username } = await params; // ✅ FIX: params must be awaited

  await connectDB();
  const user = await User.findOne({ username }).lean();

  if (!user) {
    notFound();
  }

  return <PaymentPage username={username} />;
}

export async function generateMetadata({ params }) {
  const { username } = await params; // ✅ FIX here too
  return {
    title: `${username} · Get Me A Chai`,
  };
}
