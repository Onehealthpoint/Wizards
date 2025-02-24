import { db } from '../Firebase/Init';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// **CREATE: Create a new delivery status**
export const createDeliveryStatus = async (transactionUUID, statusData) => {
  try {
    const deliveryCollectionRef = collection(db, "DeliveryStatus");
    const docRef = await addDoc(deliveryCollectionRef, { transaction_uuid: transactionUUID, ...statusData });
    console.log("Delivery status created successfully with ID:", docRef.id);
  } catch (error) {
    console.error("Error creating delivery status:", error);
  }
};

// **READ: Fetch a single delivery status by transaction UUID**
export const readDeliveryStatus = async (transactionUUID) => {
  try {
    const deliveryRef = doc(db, "DeliveryStatus", transactionUUID);
    const deliverySnap = await getDoc(deliveryRef);

    if (deliverySnap.exists()) {
      console.log("Delivery status data:", deliverySnap.data());
      return deliverySnap.data();
    } else {
      console.log("No delivery status found for this transaction.");
      return null;
    }
  } catch (error) {
    console.error("Error reading delivery status:", error);
    return null;
  }
};

// **READ: Fetch all delivery statuses**
export const readAllDeliveryStatuses = async () => {
  try {
    const deliveryCollection = collection(db, "DeliveryStatus");
    const deliverySnapshot = await getDocs(deliveryCollection);

    const allStatuses = [];
    deliverySnapshot.forEach((doc) => {
      allStatuses.push({ id: doc.id, ...doc.data() });
    });

    console.log("All delivery statuses:", allStatuses);
    return allStatuses;
  } catch (error) {
    console.error("Error reading all delivery statuses:", error);
    return [];
  }
};

// **UPDATE: Update a delivery status by transaction UUID**
export const updateDeliveryStatus = async (transactionUUID, updates) => {
  try {
    const deliveryRef = doc(db, "DeliveryStatus", transactionUUID);
    await updateDoc(deliveryRef, updates);
    console.log("Delivery status updated successfully");
  } catch (error) {
    console.error("Error updating delivery status:", error);
  }
};

// **DELETE: Delete a delivery status by transaction UUID**
export const deleteDeliveryStatus = async (transactionUUID) => {
  try {
    const deliveryRef = doc(db, "DeliveryStatus", transactionUUID);
    await deleteDoc(deliveryRef);
    console.log("Delivery status deleted successfully");
  } catch (error) {
    console.error("Error deleting delivery status:", error);
  }
};