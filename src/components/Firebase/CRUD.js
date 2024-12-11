import app from './Init';
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc, where } from "firebase/firestore";

const db = getFirestore(app);

export const readData = async (collectionName) => {
    try{
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return data;
    }catch(error){
        console.error("CRUD.js ==> Read Data Error: ", error);
    }
};

export const setData = async (collectionName, data, id) => {
    try{
        await setDoc(doc(db, collectionName, id), data);
    }catch(error){
        console.error("CRUD.js ==> Set Data Error: ", error);
    }
}

export const updateData = async (collectionName, id, data) => {
    try{
        await updateDoc(doc(db, collectionName, id), data);
    }catch(error){
        console.error("CRUD.js ==> Update Data Error: ", error);
    }
};

export const deleteData = async (collectionName, id) => {
    try{
        await deleteDoc(doc(db, collectionName, id));
    }catch(error){
        console.error("CRUD.js ==> Delete Data Error: ", error);
    }
};

export const GetCartList = async () => {
    const collectionName = "Carts";
    try{
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return data;
    }catch(error){
        console.error("CRUD.js ==> Read Data Error: ", error);
    }
};



