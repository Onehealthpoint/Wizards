import React from 'react'
import { BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const CodPaymentComponent = () => {
    const dateTime = new Date();
    const days = 7;
    dateTime.setDate(dateTime.getDate() + days);
    const date = dateTime.toDateString();
    return (
        <div className="min-h-screen p-8 bg-gradient-to-r from-pink-100 via-purple-300 to-violet-200">
          <div className='flex flex-col justify-center items-center mt-60'>
            <BadgeCheck size={100} className='text-green-500' />
            <h1 className="text-2xl font-semibold text-gray-800 text-center">Order Successfully Placed</h1>
            <div className='flex flex-col justify-center items-center mt-2'>
              <p className="text-gray-500">Thank you for your purchase. Your order has been successfully processed. </p>
              <p className="text-gray-500">Estimated arrival day is within <span className='text-green-500'>{date}</span>.</p>
            </div>
            <Link to="/" className="text-stone-700 text-lg mt-10">-- Find More books -- Continue Shopping --</Link>
          </div>
          
        </div>
      )
}

export default CodPaymentComponent