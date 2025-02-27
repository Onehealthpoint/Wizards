import Cards from "./CartComponent";
import Delivery from "../AdminDash/AdminDashboard";
import { useState, useEffect } from 'react';
import { IsAdmin } from '../Firebase/Admin';
import { useAuth } from '../Firebase/Auth';

const MainUserComponent = () => {
    const { UID } = useAuth();
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchIsAdmin = async () => {
            try {
                if (UID){
                    const user = await IsAdmin(UID);
                    setAdmin(user);
                } 
                else{
                    setAdmin(null);
                } 
            } catch (e) {
                setAdmin(null);
                console.error("Error IsAdmin: ", e);
            }
        };

        fetchIsAdmin();
    }, [UID]);

    return (
        <div>
            {admin ? <Delivery/> : <Cards/>}
        </div>
    );
};

export default MainUserComponent;