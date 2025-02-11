import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { FetchTransactions, UpdateTransaction } from '../Firebase/Transactions'
import { useAuth } from '../Firebase/Auth'
import { BadgeCheck } from 'lucide-react'
import { createDeliveryStatus } from '../Firebase/DeliveryCRUD'

const SuccessPaymentComponent = () => {
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
        await createDeliveryStatus(transaction[0].transaction_uuid, { status: 'Pending', created_at: new Date() });
        console.log(transaction[0].transaction_uuid)
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
        <BadgeCheck size={100} className='text-green-500' />
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Payment Successful</h1>
        <div className='flex flex-col justify-center items-center mt-2'>
          <p className="text-gray-500">Thank you for your purchase. Your payment has been successfully processed. </p>
          <p className="text-green-500">${data.total_amount}</p>
        </div>
        <Link to="/" className="text-stone-700 text-lg mt-10">-- Find More books -- Continue Shopping --</Link>
      </div>
      
    </div>
  )
}

export default SuccessPaymentComponent