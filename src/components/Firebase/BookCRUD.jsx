import { db } from './Init';
import { collection, doc, query, where, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { IsBookValid } from '../Helper/HelperFunctions';


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
        const q = query(collection(db, "Books"), where("ISBN", "==", book.ISBN));
        const querySnapshot = await getDocs(q);
        // Check if book already exists
        if(querySnapshot.size !== 0){
            console.log("Book already exists");
            return;
        }
        await addDoc(collection(db, "Books"), book);
        console.log("Book added successfully [", book.title, " ( ", book.ISBN, " )]");
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
        const q = query(collection(db, "Books"), where("ISBN", "==", book.ISBN));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.size === 0){
            console.log("Book not found");
            return;
        }
        for (const docObj of querySnapshot.docs) {
            await updateDoc(doc(db, "Books", docObj.id), book);
        }
    }catch(e){
        console.error("Error CRUD:UpdateBook ==> ", e);
    }
};

export const RemoveBook = async (bookId) => {
    try{
        const q = query(collection(db, "Books"), where("ISBN", "==", bookId));
        const q_cart = query(collection(db, "Carts"), where("ISBN", "==", bookId));
        const q_wish = query(collection(db, "Wishlist"), where("ISBN", "==", bookId));
        const querySnapshot = await getDocs(q);
        const querySnapshot_cart = await getDocs(q_cart);
        const querySnapshot_wish = await getDocs(q_wish);
        if(querySnapshot.size === 0){
            console.log("Book not found");
            return;
        }
        for (const docObj of querySnapshot.docs) {
            await deleteDoc(doc(db, "Books", docObj.id));
            
        }
        for (const docObj of querySnapshot_cart.docs) {
            await deleteDoc(doc(db, "Carts", docObj.id));
        }
        for (const docObj of querySnapshot_wish.docs) {
            await deleteDoc(doc(db, "Wishlist", docObj.id));
        }
    }catch(e){
        console.error("Error CRUD:RemoveBook ==> ", e);
    }
};