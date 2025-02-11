import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile, updatePassword, validatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { app } from "./Init";

export const auth = getAuth(app);
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ User: user, UID: user?.uid }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const ChangeProfile = async (name, photoURL) => {
    try {
        name = name.trim() === "" ? auth.currentUser.displayName : name;
        photoURL = photoURL.trim() === "" ? auth.currentUser.photoURL : photoURL;
        
        await updateProfile(auth.currentUser, { displayName: name, photoURL });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const HandleReauthentication = async (oldPassword) => {
    try{
        const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
        return reauthenticateWithCredential(auth.currentUser, credential);
    }catch(error){
        console.log(error);
        return false;  
    }
};

export const ChangePassword = async (oldPassword, newPassword) => {
    try {
        if (!oldPassword|| !newPassword) return false;

        const reAuthentication = await HandleReauthentication(oldPassword);
        if (!reAuthentication) return false;

        const validPassword = await validatePassword(newPassword);
        if (!validPassword) return false;

        await updatePassword(auth.currentUser, newPassword);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
