import { db } from './Init';
import { collection, doc, query, where, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";

export const FetchTransactions = async (UID, transaction_uuid) => {
    try{
        const q = query(collection(db, "Transactions"), where("UID", "==", UID), where("transaction_uuid", "==", transaction_uuid));
        const querySnapshot = await getDocs(q);
        const transactions = [];
        querySnapshot.forEach((doc) => {
            transactions.push(doc.data());
        });
        return transactions;
    }catch(e){
        console.error("Error CRUD:FetchTransactions ==> ", e);
    }
}

export const AddTransaction = async (order) => {
    try{
        await addDoc(collection(db, "Transactions"), order);
    }catch(e){
        console.error("Error CRUD:AddTransaction ==> ", e);
    }
}

export const UpdateTransaction = async (UID, transaction_uuid, status, transaction_code) => {
    try{
        const q = query(collection(db, "Transactions"), where("UID", "==", UID), where("transaction_uuid", "==", transaction_uuid));
        const querySnapshot = await getDocs(q);
        for( const docObj of querySnapshot.docs){
            await updateDoc(doc(db, "Transactions", docObj.id), {
                status: status,
                transaction_code: transaction_code,
            });
        }
    }catch(e){
        console.error("Error CRUD:UpdateTransaction ==> ", e);
    }
}

export const DeleteTransaction = async (UID, transaction_uuid) => {
    try{
        const q = query(collection(db, "Transactions"), where("UID", "==", UID), where("transaction_uuid", "==", transaction_uuid));
        const querySnapshot = await getDocs(q);
        for( const docObj of querySnapshot.docs){
            await deleteDoc(doc(db, "Transactions", docObj.id));
        }
    }catch(e){
        console.error("Error CRUD:DeleteTransaction ==> ", e);
    }
}