import React, { useState } from "react"
import { db } from "../Firebase/Init"
import { doc, updateDoc } from "firebase/firestore"
import { UpdateTransactionStatus } from "../Firebase/Transactions"

const EditDeliveryModal = ({ delivery, onClose, onSave }) => {
    const [updatedDelivery, setUpdatedDelivery] = useState(delivery)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleFieldChange = (field, value) => {
        setUpdatedDelivery({ ...updatedDelivery, [field]: value })
    }

    const handleSaveChanges = async () => {
        setLoading(true)
        setError(null)
        try {
            const deliveryRef = doc(db, "DeliveryStatus", updatedDelivery.id)
            await updateDoc(deliveryRef, {
                status: updatedDelivery.status,
                currentlocation: updatedDelivery.currentlocation,
                deliveryman: updatedDelivery.deliveryman,
                remarks: updatedDelivery.remarks,
            })
            await UpdateTransactionStatus(updatedDelivery.transaction_uuid, updatedDelivery.status);
            console.log("Changes saved successfully") 
                
            onSave(updatedDelivery)
        } catch (error) {
            console.error("Error saving changes: ", error)
            setError("Failed to save changes. Please try again.")
        }
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 className="text-2xl font-bold mb-4">Edit Delivery</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        {error}
                    </div>
                )}
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        placeholder="Transaction UUID"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={updatedDelivery.transaction_uuid}
                        readOnly
                    />
                    <input
                        type="text"
                        placeholder="Customer Name"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={updatedDelivery.name}
                        readOnly
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={updatedDelivery.phone}
                        readOnly
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={updatedDelivery.amount}
                        readOnly
                    />
                    <select
                        value={updatedDelivery.status}
                        onChange={(e) => handleFieldChange('status', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Current Location"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={updatedDelivery.currentlocation}
                        onChange={(e) => handleFieldChange('currentlocation', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Delivery Person"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={updatedDelivery.deliveryman}
                        onChange={(e) => handleFieldChange('deliveryman', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Remarks"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={updatedDelivery.remarks}
                        onChange={(e) => handleFieldChange('remarks', e.target.value)}
                    />
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleSaveChanges}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditDeliveryModal
