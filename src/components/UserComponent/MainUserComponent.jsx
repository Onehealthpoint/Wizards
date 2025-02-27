import ClientComponent from './ClientComponent';
import AdminComponent from './AdminComponent';
import { useState, useEffect } from 'react';
import { IsAdmin } from '../Firebase/Admin';
import { useAuth } from '../Firebase/Auth';
import UltimateUser from './UltimateUser';

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
            {admin ? <AdminComponent/> : <UltimateUser/>}
        </div>
    );
};

export default MainUserComponent;