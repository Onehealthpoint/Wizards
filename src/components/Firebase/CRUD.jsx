import app from './Init';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
// import { UID } from './Auth';


// ============================================
// Remove testUID on production code
let UID = "sadik123456";
// Add UID import
// ============================================


const db = getFirestore(app);

export const SearchBooksByTitle = async (title) => {
    try{
        const books = [];
        const q = query(collection(db, "Books"), where("title", "==", title));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            books.push(doc.data());
        });
        return books;
    }catch(e){
        console.error("Error CRUD:SearchBooksByTitle ==> ", e);
    }
};

export const SearchBooksByAuthor = async (author) => {
    try{
        const books = [];
        const q = query(collection(db, "Books"), where("author", "==", author));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            books.push(doc.data());
        });
        return books;
    }catch(e){
        console.error("Error CRUD:SearchBooksByAuthor ==> ", e);
    }
};

export const SearchBooksByGenre = async (genre) => {
    try{
        const books = [];
        const q = query(collection(db, "Books"), where("genre", "array-contains", genre));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            books.push(doc.data());
        });
        return books;
    }catch(e){
        console.error("Error CRUD:SearchBooksByGenre ==> ", e);
    }
};

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
            console.log(books);
            console.log(doc.data());
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
        await db.collection("Carts").add({
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
        cartQuerySnapshot.forEach((doc) => {
            db.collection("Carts").doc(doc.id).delete();
        });
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
        cartQuerySnapshot.forEach((doc) => {
            db.collection("Carts").doc(doc.id).update({
                quantity: qty
            });
        });
    }catch(e){
        console.error("Error CRUD:UpdateCart ==> ", e);
    }
};

export const AddToWishlist = async (bookId) => {
    try{
        const q = query(collection(db, "Wishlists"), where("UID", "==", UID), where("bookId", "==", bookId));
        const wishlistQuerySnapshot = await getDocs(q);
        if(wishlistQuerySnapshot.size !== 0){
            console.log("Book already in wishlist");
            return;
        }
        await db.collection("Wishlists").add({
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
        wishlistQuerySnapshot.forEach((doc) => {
            db.collection("Wishlists").doc(doc.id).delete();
        });
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
            let bookQuery = query(collection(db, "Books"), where("id", "==", doc.data().bookId));
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





