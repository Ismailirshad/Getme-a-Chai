"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { React, useEffect, useState } from 'react';
import { fetchuser, updateProfile } from '@/app/actions/useractions';

const Dashboard = () => {
    const [form, setForm] = useState({});
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "loading") return
        if (!session) {
            router.push('/login')
        } else {
            getData()
        }
    }, [session, status, router])

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        setForm(u)
    }

    const handleChange = (e) => {
        console.log(e)
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault
        let a = await updateProfile(form, session.user.name)
        if (a.error) {
            alert(a.error)
        } else {
            setForm(a.user)
            alert("Profile updated")
        }
    }

    return (
        <div className="flex items-center justify-between w-full h-[83vh]">
            <form action={handleSubmit} className="mx-auto md:w-1/3 w-full  bg-slate-900 rounded-2xl ">
                <div className="mbsc-row  text-center  text-white">
                    <h1 className='text-white font-bold text-2xl'>DashBoard</h1>
                    <div className="mbsc-col-12 p-3 col-auto gap-2 w-full mbsc-col-md-6 mbsc-col-lg-3">
                        <input className="w-3/4 rounded-xl bg-slate-700    p-2 mt-2 gap-2 border border-black" type="text" value={form.name || ""}
                            onChange={handleChange} id="name " name="name" placeholder="Enter your name" />
                    </div>
                    <div className="mbsc-col-12 p-3 col-auto gap-2 w-full mbsc-col-md-6 mbsc-col-lg-3">
                        <input className="w-3/4 rounded-xl bg-slate-700    p-2 mt-2 gap-2 border border-black" type="text" value={form.email || ""}
                            onChange={handleChange} id="email " name="email" placeholder="Enter your email address" />
                    </div>
                    <div className="mbsc-col-12 p-3 col-auto gap-2 w-full mbsc-col-lg-6">
                        <input className="w-3/4 rounded-xl bg-slate-700    p-2 mt-2 gap-2 border border-black" type="text" value={form.username || ""}
                            onChange={handleChange} id="username " name="username" placeholder=" username?" />
                    </div>
                    <div className="mbsc-col-12 p-3 col-auto gap-2 w-full mbsc-col-md-6 mbsc-col-lg-3">
                        <input className="w-3/4 rounded-xl bg-slate-700    p-2 mt-2 gap-2 border border-black" type="text" value={form.profilepic || ""}
                            onChange={handleChange} id="profilepic " name="profilepic" placeholder="Profile picture" />
                    </div>
                    <div className="mbsc-col-12 p-3 col-auto gap-2 w-full mbsc-col-md-6 mbsc-col-lg-3">
                        <input className="w-3/4 rounded-xl bg-slate-700    p-2 mt-2 gap-2 border border-black" type="text" value={form.coverpic || ""}
                            onChange={handleChange} id="coverpic " name="coverpic" placeholder="Cover picture" />
                    </div>
                    <div className="mbsc-col-12 p-3 col-auto gap-2 w-full mbsc-col-md-6 mbsc-col-lg-3">
                        <input className="w-3/4 rounded-xl bg-slate-700    p-2 mt-2 gap-2 border border-black" type="text" value={form.razorpayid || ""}
                            onChange={handleChange} id="razorpayid " name="razorpayid" placeholder="Razorpay Id" />
                    </div>
                    <div className="mbsc-col-12 p-3 col-auto gap-2 w-full mbsc-col-md-6 mbsc-col-lg-3">
                        <input className="w-3/4 rounded-xl bg-slate-700    p-2 mt-2 gap-2 border border-black" type="text" value={form.razorpaysecret || ""}
                            onChange={handleChange} id="razorpaysecret " name="razorpaysecret" placeholder="Razorpay Secret" />
                    </div>
                    <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
                     focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>

                </div>
            </form>
        </div>
    )
}

export default Dashboard
