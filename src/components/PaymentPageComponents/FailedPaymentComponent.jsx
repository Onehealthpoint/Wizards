import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { FetchTransactions, UpdateTransaction } from '../Firebase/Transactions'
import { useAuth } from '../Firebase/Auth'
import { BadgeAlert } from 'lucide-react'

const FailedPaymentComponent = () => {
  const { UID } = useAuth();
  const [search] = useSearchParams();
  const dataQuery = search.get("data");
  const [data, setData] = useState({});

  useEffect(() => {
    const resData = atob(dataQuery);
    const resObject = JSON.parse(resData);

    setData(resObject);
  }, [search, dataQuery]);

  useEffect(() => {
    if (Object.keys(data).length === 0 || !UID) return;
    
    const update = async() => {
      try{
        const transaction = await FetchTransactions(UID, data.transaction_uuid);
        if(transaction.length !== 1) return;
        await UpdateTransaction(UID, transaction[0].transaction_uuid, data.status, data.transaction_code);
      }
      catch(e){
        console.error("Error SuccessPaymentComponent:Update ==> ", e);
      }
    };

    update();
  }, [data, UID]);

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