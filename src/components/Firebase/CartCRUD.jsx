import { db } from './Init';
import { collection, doc, query, where, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
// import { UID } from './Auth';


// ============================================
// Remove testUID on production code
let UID = "sadik123456";
// Add UID import
// ============================================


export const FetchCart = async () => {
    try{
        const books = [];
        const q = query(collection(db, "Carts"), where("UID", "==", UID));
        const cartQuerySnapshot = await getDocs(q);
        for(const doc of cartQuerySnapshot.docs){
            let bookQuery = query(collection(db, "Books"), where("id", "==", doc.data().bookId));
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

export const AddToCart = async (bookId, qty) => {
    try{
        const q = query(collection(db, "Carts"), where("UID", "==", UID), where("bookId", "==", bookId));
        const cartQuerySnapshot = await getDocs(q);
        if(cartQuerySnapshot.size !== 0){
            console.log("Book already in cart");
            return;
        }
        await addDoc(collection(db, "Carts"), {
            UID: UID,
            bookId: bookId,
            quantity: qty
        });
    }catch(e){
        console.error("Error CRUD:AddToCart ==> ", e);
    }
};

export const RemoveFromCart = async (bookId) => {
    try{
        const q = query(collection(db, "Carts"), where("UID", "==", UID), where("bookId", "==", bookId));
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

export const UpdateCart = async (bookId, qty) => {
    try{
        const q = query(collection(db, "Carts"), where("UID", "==", UID), where("bookId", "==", bookId));
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