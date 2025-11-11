import PaymentPage from '@/components/PaymentPage.js';
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDb.js';
import User from '@/models/User.js';

export default async function Username({ params }) {
  const { username } = params; 

  await connectDB();
  const user = await User.findOne({ username }).lean();

  if (!user) {
    notFound();
  }
  return <PaymentPage username={username} />;
}

export async function generateMetadata({ params }) {
  const { username } = params; 
  return {
    title: `${username} · Get Me A Chai`,
  };
}
