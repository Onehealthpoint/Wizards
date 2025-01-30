import { app } from './Init';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const auth = getAuth(app);

export let User = auth.currentUser ? auth.currentUser : null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        User = user;
    } else {
        User = null;
    }
});

export const UID = User? User.uid : null;