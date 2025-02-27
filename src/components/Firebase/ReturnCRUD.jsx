import { db } from './Init';
import { collection, doc, query, where, getDocs, updateDoc, addDoc } from "firebase/firestore";

// Fetch all return data
export const FetchAllReturn = async () => {
    try {
        const Return = [];
        const querySnapshot = await getDocs(collection(db, "Return"));
        querySnapshot.forEach((doc) => {
            Return.push(doc.data());
        });
        return Return;
    } catch (e) {
        console.error("Error CRUD:FetchAllReturn ==> ", e);
    }
    return [];
};
// Fetch all return data for a specific UID
export const FetchAllReturnv2 = async (UID) => {
    try {
        const Return = [];
        const q = query(collection(db, "Return"), where("UID", "==", UID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            Return.push(doc.data());
        });
        return Return;
    } catch (e) {
        console.error("Error CRUD:FetchAllReturn ==> ", e);
    }
    return [];
};

// Update return status
export const UpdateReturntatus = async (ISBN, UID, newStatus) => {
    try {
        const q = query(collection(db, "Return"), where("ISBN", "==", ISBN), where("UID", "==", UID));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size === 0) {
            console.log("Return not found");
            return;
        }
        for (const docObj of querySnapshot.docs) {
            await updateDoc(doc(db, "Return", docObj.id), { Status: newStatus });
        }
        console.log("Return status updated successfully [ISBN: ", ISBN, ", UID: ", UID, "]");
    } catch (e) {
        console.error("Error CRUD:UpdateReturntatus ==> ", e);
    }
};

// Update return remark
export const UpdateReturnRemark = async (ISBN, UID, newRemark) => {
    try {
        const q = query(collection(db, "Return"), where("ISBN", "==", ISBN), where("UID", "==", UID));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size === 0) {
            console.log("Return not found");
            return;
        }
        for (const docObj of querySnapshot.docs) {
            await updateDoc(doc(db, "Return", docObj.id), { Remark: newRemark });
        }
        console.log("Return remark updated successfully [ISBN: ", ISBN, ", UID: ", UID, "]");
    } catch (e) {
        console.error("Error CRUD:UpdateReturnRemark ==> ", e);
    }
};

// Add or update return to database
export const AddOrUpdateReturn = async (returnData) => {
    // Check if return fields are empty
    try {
        const q = query(collection(db, "Return"), where("ISBN", "==", returnData.ISBN), where("UID", "==", returnData.UID));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size === 0) {
            await addDoc(collection(db, "Return"), returnData);
            console.log("Return added successfully [ISBN: ", returnData.ISBN, ", UID: ", returnData.UID, "]");
        } else {
            for (const docObj of querySnapshot.docs) {
                await updateDoc(doc(db, "Return", docObj.id), returnData);
            }
            console.log("Return updated successfully [ISBN: ", returnData.ISBN, ", UID: ", returnData.UID, "]");
        }
    } catch (e) {
        console.error("Error CRUD:AddOrUpdateReturn ==> ", e);
    }
};