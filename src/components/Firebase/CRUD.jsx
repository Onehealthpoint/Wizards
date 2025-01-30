import app from './Init';
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { IsBookValid } from '../Helper/HelperFunctions';
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
        const q = query(collection(db, "Books"), where("genres", "array-contains", genre));
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
        await addDoc(collection(db, "Carts"), {
            UID: UID,
            bookId: bookId,
            quantity: 1
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
        for(const doc of cartQuerySnapshot.docs){
            await deleteDoc(collection(db, "Carts"), doc.id);
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
        for(const doc of cartQuerySnapshot.docs){
            await updateDoc(collection(db, "Carts"), doc.id, {
                quantity: qty
            });
        }
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
        for(const doc of wishlistQuerySnapshot.docs){
            await deleteDoc(collection(db, "Wishlists"), doc.id);
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

export const IsAdmin = async () => {
    try{
        const q = query(collection(db, "Users"), where("UID", "==", UID));
        const adminQuerySnapshot = await getDocs(q);
        return adminQuerySnapshot.docs[0].data().role === "admin";
    }catch(e){
        console.error("Error CRUD:IsAdmin ==> ", e);
    }
    return false;
};

export const FetchAllBooks = async () => {
    try{
        const books = [];
        const querySnapshot = await getDocs(collection(db, "Books"));
        querySnapshot.forEach((doc) => {
            books.push(doc.data());
        });
        return books;
    }catch(e){
        console.error("Error CRUD:FetchAllBooks ==> ", e);
    }
    return [];
};

export const AddBook = async (book) => {
    // Check if book fields are empty
    if(!IsBookValid(book)){
        console.log("Book fields cannot be empty");
        return;
    }
    try{
        const q = query(collection(db, "Books"), where("id", "==", book.id));
        const querySnapshot = await getDocs(q);
        // Check if book already exists
        if(querySnapshot.size !== 0){
            console.log("Book already exists");
            return;
        }
        await addDoc(collection(db, "Books"), book);
        console.log("Book added successfully [", book.title, "]");
    }catch(e){
        console.error("Error CRUD:AddBook ==> ", e);
    }
};

export const UpdateBook = async (book) => {
    // Check if book fields are empty
    if(!IsBookValid(book)){
        console.log("Book fields cannot be empty");
        return;
    }
    try{
        const q = query(collection(db, "Books"), where("id", "==", book.id));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.size === 0){
            console.log("Book not found");
            return;
        }
        for (const doc of querySnapshot.docs) {
            await updateDoc(collection(db, "Books"), doc.id, book);
        }
    }catch(e){
        console.error("Error CRUD:UpdateBook ==> ", e);
    }
};

export const RemoveBook = async (bookId) => {
    try{
        const q = query(collection(db, "Books"), where("id", "==", bookId));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.size === 0){
            console.log("Book not found");
            return;
        }
        for (const doc of querySnapshot.docs) {
            await deleteDoc(collection(db, "Books"), doc.id);
        }
    }catch(e){
        console.error("Error CRUD:RemoveBook ==> ", e);
    }
};




