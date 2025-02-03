import { db } from './Init';
import { collection, query, where, getDocs} from "firebase/firestore";
import { UID } from './Auth';


export const IsAdmin = async () => {
    try{
        if(UID === null) return false;
        const q = query(collection(db, "Users"), where("UID", "==", UID));
        const adminQuerySnapshot = await getDocs(q);
        return adminQuerySnapshot.docs[0].data().role === "admin";
    }catch(e){
        console.error("Error CRUD:IsAdmin ==> ", e);
    }
    return false;
};