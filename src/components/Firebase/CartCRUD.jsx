import { db } from './Init';
import { collection, doc, query, where, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";


export const FetchCart = async (UID) => {
    try{
        const books = [];
        const q = query(collection(db, "Carts"), where("UID", "==", UID));
        const cartQuerySnapshot = await getDocs(q);
        for(const doc of cartQuerySnapshot.docs){
            let bookQuery = query(collection(db, "Books"), where("ISBN", "==", doc.data().ISBN));
            const querySnapshot = await getDocs(bookQuery);
            if(querySnapshot.size !== 0) {
                books.push([querySnapshot.docs[0].data(), doc.data().quantity]);
            }
        }
        return books || [];
    }catch(e){
        console.error("Error CRUD:FetchCart ==> ", e);
    }
    return [];
};

export const AddToCart = async (UID, ISBN, qty) => {
    try{
        const q = query(collection(db, "Carts"), where("UID", "==", UID), where("ISBN", "==", ISBN));
        const cartQuerySnapshot = await getDocs(q);
        if(cartQuerySnapshot.size !== 0){
            console.log("Book already in cart");
            return;
        }
        await addDoc(collection(db, "Carts"), {
            UID: UID,
            ISBN: ISBN,
            quantity: qty
        });
    }catch(e){
        console.error("Error CRUD:AddToCart ==> ", e);
    }
};

export const RemoveFromCart = async (UID, ISBN) => {
    try{
        const q = query(collection(db, "Carts"), where("UID", "==", UID), where("ISBN", "==", ISBN));
        const cartQuerySnapshot = await getDocs(q);
        if(cartQuerySnapshot.size === 0){
            console.log("Book not in cart");
            return;
        }
        for(const docObj of cartQuerySnapshot.docs){
            await deleteDoc(doc(db, "Carts", docObj.id));
        }
    }catch(e){
        console.error("Error CRUD:RemoveFromCart ==> ", e);
    }
};

export const UpdateCart = async (UID, ISBN, qty) => {
    try{
        const q = query(collection(db, "Carts"), where("UID", "==", UID), where("ISBN", "==", ISBN));
        const cartQuerySnapshot = await getDocs(q);
        if(cartQuerySnapshot.size === 0){
            console.log("Book not in cart");
            return;
        }
        for(const docObj of cartQuerySnapshot.docs){
            await updateDoc(doc(db, "Carts", docObj.id), {
                quantity: qty
            });
        }
    }catch(e){
        console.error("Error CRUD:UpdateCart ==> ", e);
    }
};