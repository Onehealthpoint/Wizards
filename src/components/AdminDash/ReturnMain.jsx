import React, { useState, useEffect } from 'react';
import { FetchAllReturn, UpdateReturntatus, UpdateReturnRemark } from '../Firebase/ReturnCRUD';
import { AlertCircle, CheckCircle, XCircle, Edit3, Check, X } from "lucide-react";

const ReturnMain = () => {
    const [Return, setReturn] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReturn = async () => {
            try {
                const returnData = await FetchAllReturn();
                setReturn(returnData);
            } catch (err) {
                setError("Failed to load return items. Please try again later.");
                console.error("Error fetching return items:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReturn();
    }, []);

    const handleUpdateStatus = async (ISBN, UID, newStatus) => {
        try {
            await UpdateReturntatus(ISBN, UID, newStatus);
            const updatedReturn = Return.map(ret =>
                ret.ISBN === ISBN && ret.UID === UID ? { ...ret, Status: newStatus } : ret
            );
            setReturn(updatedReturn);
        } catch (err) {
            setError("Failed to update status. Please try again.");
            console.error("Error updating status:", err);
        }
    };

    const handleUpdateRemark = async (ISBN, UID, newRemark) => {
        try {
            await UpdateReturnRemark(ISBN, UID, newRemark);
            const updatedReturn = Return.map(ret =>
                ret.ISBN === ISBN && ret.UID === UID ? { ...ret, Remark: newRemark } : ret
            );
            setReturn(updatedReturn);
        } catch (err) {
            setError("Failed to update remark. Please try again.");
            console.error("Error updating remark:", err);
        }
    };

    const getStatusBadge = (status) => {
        if (!status) return null;
        switch (status.toLowerCase()) {
            case "valid":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Valid
                    </span>
                );
            case "invalid":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3 mr-1" />
                        Invalid
                    </span>
                );
            case "pending":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pending
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {status}
                    </span>
                );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <p className="text-2xl text-gray-600">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md w-full">
                    <div className="flex">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-red-700">{error}</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Return Items</h1>

            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
            )}

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    ISBN
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    UID
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Remark
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Return.map((ret) => (
                                <tr key={`${ret.ISBN}-${ret.UID}`} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ret.ISBN}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ret.UID}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(ret.Status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ret.Remark || "-"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button
                                            onClick={() => handleUpdateStatus(ret.ISBN, ret.UID, 'Valid')}
                                            className="mr-2 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            <Check className="w-4 h-4 mr-1" />
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(ret.ISBN, ret.UID, 'Invalid')}
                                            className="mr-2 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            <X className="w-4 h-4 mr-1" />
                                        </button>
                                        <button
                                            onClick={() => handleUpdateRemark(ret.ISBN, ret.UID, prompt('Enter new remark:'))}
                                            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <Edit3 className="w-4 h-4 mr-1" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReturnMain;