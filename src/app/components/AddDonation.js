'use client'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import stripePayment from '../../../lib/stripe/paymentMethod';

const AddDonation = () => {
  const [amount, setAmount] = useState(0);
  
  const router = useRouter()
  const pathname = usePathname().split('/')
  const uid = pathname[2];
  const id = pathname[3];

  const handlePayment = async (e) =>{
    e.preventDefault()
    const url = await stripePayment(uid,id,amount);
    router.replace(url)
  }

  return (
    <form onSubmit={(e)=>handlePayment(e)} className='flex flex-col justify-center items-center w-full space-y-6 dark:text-white'>
        <h3 className='text-2xl'>Please Enter the amount for donation</h3>
        <input onChange={(e)=>{setAmount(e.target.value)}} value={amount} className='bg-gray-100 text-black outline-none w-1/2 px-4 py-2 rounded-full' type="number" name="donationAmount" id="donationAmount" />
        <div className='w-1/2 flex justify-evenly'>
            <button type="button" onClick={()=>setAmount(5)} className='bg-gray-100  dark:bg-[#272727] p-5 rounded-full'>5</button>
            <button type="button" onClick={()=>setAmount(10)} className='bg-gray-100 dark:bg-[#272727]  p-5 rounded-full'>10</button>
            <button type="button" onClick={()=>setAmount(20)} className='bg-gray-100 dark:bg-[#272727]  p-5 rounded-full'>20</button>
            <button type="button" onClick={()=>setAmount(50)} className='bg-gray-100 dark:bg-[#272727]  p-5 rounded-full'>50</button>
            <button type="button" onClick={()=>setAmount(100)} className='bg-gray-100 dark:bg-[#272727] p-5 rounded-full'>100</button>
        </div>
        <button className='bg-green-500 w-1/4 rounded-2xl px-5 py-2'>Pay</button>
    </form>
  )
}

export default AddDonation