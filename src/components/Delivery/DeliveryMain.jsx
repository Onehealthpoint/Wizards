import React, { useEffect, useState } from "react"
import { readAllDeliveryStatuses } from "../Firebase/DeliveryCRUD"
import { GetBookNameByISBN } from "../Firebase/BookCRUD"
import { Loader } from "../Loader/Loader"
import { db } from "../Firebase/Init"
import { doc, updateDoc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore"
import { TrashIcon, PencilIcon } from "lucide-react"
import EditDeliveryModal from "./EditDeliveryModal"
import DeleteConfirmationModal from "./DeleteConfirmationModal" // Import the new modal

const DeliveryMain = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [editableDelivery, setEditableDelivery] = useState(null)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [deliveryToDelete, setDeliveryToDelete] = useState(null)
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const deliveryData = await readAllDeliveryStatuses()
                const transactionData = await Promise.all(
                    deliveryData.map(async (delivery) => {
                        // Fetch transaction data
                        const transactionQuery = query(
                            collection(db, "Transactions"),
                            where("transaction_uuid", "==", delivery.transaction_uuid)
                        )
                        const transactionSnapshot = await getDocs(transactionQuery)
                        let transactionInfo = {}
                        if (!transactionSnapshot.empty) {
                            transactionInfo = transactionSnapshot.docs[0].data()
                        }

                        // Fetch book data
                        let bookNames = 'N/A';
                        if (transactionInfo.ISBN && Array.isArray(transactionInfo.ISBN)) {
                            const bookNamePromises = transactionInfo.ISBN.map(async (ISBN) => {
                                return await GetBookNameByISBN(ISBN);
                            });
                            const bookNameResults = await Promise.all(bookNamePromises);
                            bookNames = bookNameResults.filter(name => name).join(', ');
                        }

                        return {
                            ...delivery,
                            name: transactionInfo.name || 'N/A',
                            phone: transactionInfo.phone || 'N/A',
                            amount: transactionInfo.amount || 'N/A',
                            bookNames: bookNames || 'N/A',
                            currentlocation: delivery.currentlocation || 'N/A',
                            deliveryman: delivery.deliveryman || 'N/A',
                            remarks: delivery.remarks || 'N/A',
                            status: delivery.status || 'Pending'
                        }
                    }),
                )
                setData(transactionData)
            } catch (error) {
                console.error("Error fetching delivery data: ", error)
                setError("Failed to fetch delivery data. Please try again.")
            }
            setLoading(false)
        }

        fetchData()
    }, [])

    const handleDelete = async (transaction_uuid) => {
        setData(data.filter((delivery) => delivery.transaction_uuid !== transaction_uuid))

        try {
            const deliveryDoc = data.find((delivery) => delivery.transaction_uuid === transaction_uuid)
            if (deliveryDoc) {
                await deleteDoc(doc(db, "DeliveryStatus", deliveryDoc.id))
                console.log("Delivery deleted successfully")
            }
        } catch (error) {
            console.error("Error deleting delivery: ", error)
            setError("Failed to delete delivery. Please try again.")
        }
    }

    const confirmDelete = (delivery) => {
        setDeliveryToDelete(delivery)
        setShowDeleteConfirmation(true)
    }

    const handleConfirmDelete = () => {
        if (deliveryToDelete) {
            handleDelete(deliveryToDelete.transaction_uuid)
            setShowDeleteConfirmation(false)
            setDeliveryToDelete(null)
        }
    }

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false)
        setDeliveryToDelete(null)
    }

    const handleSort = (key) => {
        setSortConfig({ key, direction: 'asc' });
        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        });
        setData(sortedData);
    };

    if (loading) {
        return <Loader />
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Delivery Tracker</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    {error}
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">Transaction UUID</th>
                            <th className="px-4 py-2">
                                <button
                                    onClick={() => handleSort("name")}
                                    className="font-semibold hover:text-purple-600 transition-colors focus:outline-none flex items-center"
                                >
                                    Customer Name
                                </button>
                            </th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">
                                <button
                                    onClick={() => handleSort("status")}
                                    className="font-semibold hover:text-purple-600 transition-colors focus:outline-none flex items-center"
                                >
                                    Status
                                </button>
                            </th>
                            <th className="px-4 py-2">Current Location</th>
                            <th className="px-4 py-2">Delivery Person</th>
                            <th className="px-4 py-2">Remarks</th>
                            <th className="px-4 py-2">Book Name</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="px-4 py-2">{item.transaction_uuid || "N/A"}</td>
                                <td className="px-4 py-2">{item.name}</td>
                                <td className="px-4 py-2">{item.phone}</td>
                                <td className="px-4 py-2">{item.amount}</td>
                                <td className="px-4 py-2">{item.status}</td>
                                <td className="px-4 py-2">{item.currentlocation}</td>
                                <td className="px-4 py-2">{item.deliveryman}</td>
                                <td className="px-4 py-2">{item.remarks}</td>
                                <td className="px-4 py-2">{item.bookNames}</td>
                                <td className="px-4 py-2 flex space-x-2">
                                    <button
                                        onClick={() => setEditableDelivery(item)}
                                        className="text-blue-500 hover:text-blue-600 mr-2"
                                    >
                                        <PencilIcon size={24} />
                                    </button>
                                    <button
                                        onClick={() => confirmDelete(item)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <TrashIcon size={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editableDelivery && (
                <EditDeliveryModal
                    delivery={editableDelivery}
                    onClose={() => setEditableDelivery(null)}
                    onSave={(updatedDelivery) => {
                        setData(data.map((d) => (d.transaction_uuid === updatedDelivery.transaction_uuid ? updatedDelivery : d)))
                        setEditableDelivery(null)
                    }}
                />
            )}
            {showDeleteConfirmation && (
                <DeleteConfirmationModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    )
}

export default DeliveryMain