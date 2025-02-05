import { db } from './Init';
import { collection, query, where, getDocs} from "firebase/firestore";


export const IsAdmin = async (UID) => {
    console.log("UID: ", UID);
    try{
        if(UID === null || UID === undefined) return false;
        const q = query(collection(db, "Users"), where("UID", "==", UID));
        const adminQuerySnapshot = await getDocs(q);
        return adminQuerySnapshot.docs[0].data().role === "admin";
    }catch(e){
        console.error("Error CRUD:IsAdmin ==> ", e);
    }
    return false;
};