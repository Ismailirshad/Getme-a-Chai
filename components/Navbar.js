"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useState } from "react"

function Navbar() {
  const { data: session } = useSession()
  const [showdropdown, setShowdropdown] = useState(false)

  return (
    <div className='bg-black text-white flex flex-col md:flex-row justify-between  items-center md:h-16'>
      <div className='font-bold flex justify-center items-center gap-1 logo'>
        <span>
          <img src="chai.png" width={44} />
        </span>
        <Link href={'/'}>GetMeachai</Link>
      </div>

      <div className='flex flex-col p-2 md:flex-row '>
        {session && <>
          <button onClick={() => { setShowdropdown(!showdropdown) }} onBlur={() => { setTimeout(() => { setShowdropdown(false) }, 100); }}
            id="multiLevelDropdownButton" data-dropdown-toggle="multi-dropdown" className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none
             focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600
              dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> {`Welcome ${session.user.email}`}  <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          <div id="multi-dropdown" className={`z-10 ${showdropdown ? "" : "hidden"} absolute ml-13 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="multiLevelDropdownButton">

              <li>
                <Link href={`${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your page</Link>
              </li>
              <li>
                <Link href='/dashboard' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href="#" onClick={() => signOut()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
          </div>
        </>}

        {session &&
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4
     focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 m-2"
            onClick={() => { signOut() }}>Logout</button>
        }
        {!session &&
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4
     focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 m-2">Login</button>
          </Link>}
      </div>
    </div>
  )
}

export default Navbar
