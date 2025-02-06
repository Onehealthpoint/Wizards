import { db } from './Init';
import { collection, doc, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";

export const AddTransaction = async (UID, ISBN, price, quantity, total, paymentMethod, purchaseType) => {
    try{
        await addDoc(collection(db, "Transactions"), {
            UID: UID,
            ISBN: ISBN,
            price: price,
            quantity: quantity,
            total: total,
            paymentMethod: paymentMethod,
            purchaseType: purchaseType
        });
    }catch(e){
        console.error("Error CRUD:AddTransaction ==> ", e);
    }
}