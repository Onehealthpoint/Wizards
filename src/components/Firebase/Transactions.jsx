import { db } from './Init';
import { collection, doc, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";

export const AddTransaction = async (UID, ISBN, amount, quantity, paymentMethod, name, address, phone) => {
    try{
        await addDoc(collection(db, "Transactions"), {
            UID: UID,
            ISBN: ISBN,
            amount: amount,
            quantity: quantity,
            paymentMethod: paymentMethod,
            name: name,
            address: address,
            phone: phone,
        });
    }catch(e){
        console.error("Error CRUD:AddTransaction ==> ", e);
    }
}