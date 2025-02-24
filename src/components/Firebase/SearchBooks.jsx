import { db } from './Init';
import { collection, query, where, getDocs} from "firebase/firestore";


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
export const SearchBooksByTitlev2 = async (title) => {
    try {
        const books = [];
        const q = query(
            collection(db, "Books"),
            where("title", ">=", title),
            where("title", "<", title + '\uf8ff')
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            books.push(doc.data());
        });
        return books;
    } catch (e) {
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

export const SearchBooksByPrice = async (min, max) => {
    try{
        const books = [];
        const q = query(collection(db, "Books"), where("price", ">=", min), where("price", "<=", max));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            books.push(doc.data());
        });
        return books;
    }catch(e){
        console.error("Error CRUD:SearchBooksByPrice ==> ", e);
    }
};

