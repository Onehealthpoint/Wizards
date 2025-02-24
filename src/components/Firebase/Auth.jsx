import app from './Init';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const auth = getAuth(app);

const getUser = () => {
    const user = auth.currentUser;
    if (user) {
        console.info("UID: ", user.uid)
        return user;
    } else {
        console.error("GetUser ==> Null User.");
        return null;
    }
};

export const User = onAuthStateChanged(auth, getUser);

export const UID = User? User.uid : null;







