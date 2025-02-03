import { db } from './Init';
import { collection, doc, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";
// import { UID } from './Auth';


// ============================================
// Remove testUID on production code
let UID = "sadik123456";
// Add UID import
// ============================================


export const AddToWishlist = async (bookId) => {
    try{
        const q = query(collection(db, "Wishlists"), where("UID", "==", UID), where("bookId", "==", bookId));
        const wishlistQuerySnapshot = await getDocs(q);
        if(wishlistQuerySnapshot.size !== 0){
            console.log("Book already in wishlist");
            return;
        }
        await addDoc(collection(db, "Wishlists"), {
            UID: UID,
            bookId: bookId
        });
    }catch(e){
        console.error("Error CRUD:AddToWishlist ==> ", e);
    }
}

export const RemoveFromWishlist = async (bookId) => {
    try{
        const q = query(collection(db, "Wishlists"), where("UID", "==", UID), where("bookId", "==", bookId));
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

export const FetchWishlist = async () => {
    try{
        const books = [];
        const q = query(collection(db, "Wishlists"), where("UID", "==", UID));
        const wishlistQuerySnapshot = await getDocs(q);
        for(const doc of wishlistQuerySnapshot.docs){
            console.log(doc.data());
            let bookQuery = query(collection(db, "Books"), where("id", "==", doc.data().id));
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