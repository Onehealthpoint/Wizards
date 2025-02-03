import { db } from './Init';
import { collection, doc, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";


export const AddToWishlist = async (UID, ISBN) => {
    try{
        const q = query(collection(db, "Wishlists"), where("UID", "==", UID), where("ISBN", "==", ISBN));
        const wishlistQuerySnapshot = await getDocs(q);
        if(wishlistQuerySnapshot.size !== 0){
            console.log("Book already in wishlist");
            return;
        }
        await addDoc(collection(db, "Wishlists"), {
            UID: UID,
            ISBN: ISBN
        });
    }catch(e){
        console.error("Error CRUD:AddToWishlist ==> ", e);
    }
}

export const RemoveFromWishlist = async (UID, ISBN) => {
    try{
        const q = query(collection(db, "Wishlists"), where("UID", "==", UID), where("ISBN", "==", ISBN));
        const wishlistQuerySnapshot = await getDocs(q);
        if(wishlistQuerySnapshot.size === 0){
            console.log("Book not in wishlist");
            return;
        }
        for(const docObj of wishlistQuerySnapshot.docs){
            await deleteDoc(doc(db, "Wishlists", docObj.id));
        }
    }catch(e){
        console.error("Error CRUD:RemoveFromWishlist ==> ", e);
    }
};

export const FetchWishlist = async (UID) => {
    console.log(UID);
    try{
        const books = [];
        const q = query(collection(db, "Wishlists"), where("UID", "==", UID));
        const wishlistQuerySnapshot = await getDocs(q);
        for(const doc of wishlistQuerySnapshot.docs){
            console.log(doc.data());
            let bookQuery = query(collection(db, "Books"), where("ISBN", "==", doc.data().ISBN));
            const querySnapshot = await getDocs(bookQuery);
            if(querySnapshot.size !== 0) {
                books.push(querySnapshot.docs[0].data());
            }
        }
        return books || [];
    }catch(e){
        console.error("Error CRUD:FetchWishlist ==> ", e);
    }
    return [];
};