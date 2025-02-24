import { db } from './Init';
import { collection, query, where, getDocs} from "firebase/firestore";


export const IsAdmin = async (UID) => {
    try{
        const q = query(collection(db, "Users"), where("UID", "==", UID));
        const adminQuerySnapshot = await getDocs(q);
        if(adminQuerySnapshot.docs.length === 0){
            console.log("User not found");
            return false;
        }
        return adminQuerySnapshot.docs[0].data().role === "admin";
    }catch(e){
        console.error("Error CRUD:IsAdmin ==> ", e);
    }
    return false;
};