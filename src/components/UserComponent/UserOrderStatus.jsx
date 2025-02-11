import React, { useEffect, useState } from 'react';
import { FetchTransactions } from '../Firebase/Transactions';
import { useAuth } from '../Firebase/Auth';
import { Loader } from '../Loader/Loader';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserOrderStatus = () => {
    const { UID } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                if (UID) {
                    const transactions = await FetchTransactions(UID);
                    setOrders(transactions);
                } else {
                    setOrders([]);
                }
            } catch (e) {
                console.error("Error fetching orders: ", e);
                setError("Failed to fetch orders. Please try again.");
            }
            setLoading(false);
        };

        fetchOrders();
    }, [UID]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            <div className="flex justify-between items-center mb-4">
                <div></div> {/* Empty div to push the link to the right */}
                <Link to="/User" className="font-italic hover:text-blue-500">
                    My WishList
                </Link>
            </div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    {error}
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">Order ID</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Code</th>
                            {/* <th className="px-4 py-2">Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-2">{order.transaction_uuid || "N/A"}</td>
                                <td className="px-4 py-2">{order.status || "Pending"}</td>
                                <td className="px-4 py-2">{order.amount || "N/A"}</td>
                                <td className="px-4 py-2 ">{order.transaction_code || "N/A"}</td>
                                {/* <td className="px-4 py-2">
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <Eye className="inline-block w-5 h-5" />
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserOrderStatus;
