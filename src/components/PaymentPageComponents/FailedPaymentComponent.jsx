import React from 'react'
import { Link } from 'react-router-dom'
import { BadgeAlert } from 'lucide-react'

const FailedPaymentComponent = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-pink-100 via-purple-300 to-violet-200">
      <div className='flex flex-col justify-center items-center mt-60'>
        <BadgeAlert size={100} className='text-red-600' />
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Payment Unsuccessful</h1>
        <div className='flex flex-col justify-center items-center mt-2'>
          <p className="text-gray-500">Thank you for your efforts. Your payment was unsuccessfully processed. </p>
          <p className="text-red-600">Please try Again.</p>
        </div>
        <Link to="/" className="text-stone-700 text-lg mt-10">-- Find More books -- Continue Shopping --</Link>
      </div>
    </div>
  )
}

export default FailedPaymentComponent