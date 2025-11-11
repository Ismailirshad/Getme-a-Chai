"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { fetchuser, fetchpayments, initiate } from '@/app/actions/useractions'

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({ name: "", amount: "", message: "" })
  const [currentUser, setcurrentUser] = useState({})
  const [payments, setPayments] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    console.log(paymentform)
  }

  const getData = async () => {
    let u = await fetchuser(username)
    setcurrentUser(u)
    let dbpayemnts = await fetchpayments(username)
    setPayments(dbpayemnts)
    console.log(u, dbpayemnts)
  }

  const pay = async (amount) => {
    //get the order Id
    let a = await initiate(amount, username, paymentform)
    let orderId = a.id
     const Razorpay = window.Razorpay;
  if (!Razorpay) return alert("Razorpay not loaded yet");
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Get me a chai',
      description: 'Test Transaction',
      order_id: orderId, // This is the order_id created in the backend
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`, // Your success URL
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#F37254'
      },
    };
    const rzp = new Razorpay(options);
    rzp.open();
  }
  return (
    <>
      <button id="rzp-button1">Pay</button>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      {username}
      <div className='cover'>
        <img className='w-full h-[300]' src={currentUser.coverpic || ""}></img>
        <div className='justify-center items-center flex -pt-20'>
          <img className='rounded-full border border-amber-50' width={100} height={100} src={currentUser.profilepic || ""}></img>
        </div>
      </div>

      <div>
        <div className='info flex justify-center items-center text-white flex-col '>
          <div className='font-bold text-lg'>
            @{username}
          </div>
          <div className='text-slate-400'>
            Lets help <span className='font-bold text-yellow-500'>{username} </span> to get a chaii
          </div>
          <div className='text-slate-400'>
            {payments.length} payments <span className='font-bold text-green-500'>{payments.reduce((a, b) => a + (b.amount || 0), 0)}
</span>  raised
          </div>

          <div className="payment flex flex-col md:flex-row gap-3 w-[80%] mt-11">
            <div className="supporters md:w-1/2 w-full bg-slate-800 rounded-lg text-white p-10">
              <h2 className='text-2xl text-center font-bold my-5 '>Supporters</h2>
              <ul>
                {payments.length == 0 && <p>No payments yet  </p>}
                {payments.map((p, i) => {
                  return <li key={i} className='my-2 md:text-lg text-x'>
                    <FontAwesomeIcon icon={faCircleUser} style={{ color: "#B197FC", }} />
                    <span>{p.name} donated <span className='font-bold'>{p.amount}</span> with a message {p.message}</span>
                  </li>
                })}
              </ul>
            </div>

            <div className='makePayment md:w-1/2 w-full bg-slate-800 rounded-lg text-white p-10'>
              <h2 className='text-2xl font-bold my-5'>Make Payment</h2>
              <div className='flex gap-2 flex-col'>

                <input onChange={handleChange} value={paymentform.name} type="text" name='name' className='w-full p-3 rounded-lg bg-slate-600' placeholder='Enter Name' />
                <input onChange={handleChange} value={paymentform.message} type="text" name="message" className='w-full p-3 rounded-lg bg-slate-600' placeholder='Enter Message' />
                <input onChange={handleChange} value={paymentform.amount} type="text" name='amount' className='w-full p-3 rounded-lg bg-slate-600' placeholder='Enter Amount' />
                <button onClick={() => pay(paymentform.amount)} disabled={paymentform.name?.length < 2 || paymentform.message?.length < 2 || paymentform.amount?.length < 1}
                  type="button" className="disabled:bg-gray-50 disabled:from-purple-50 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
                  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium w-1/2  rounded-lg text-sm px-5 py-2.5 text-center mb-2">Pay</button>

                <div className='flex gap-2 mt-5'>
                  <button className="bg-slate-600 p-3 rounded-lg" onClick={() => pay(10)}>Pay 30</button>
                  <button className="bg-slate-600 p-3 rounded-lg" onClick={() => pay(20)}>Pay 20</button>
                  <button className="bg-slate-600 p-3 rounded-lg" onClick={() => pay(30)}>Pay 10</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
export default PaymentPage
