import ClientComponent from './ClientComponent';
import AdminComponent from './AdminComponent';
import { UserLoader } from '../Loader/Loader';
import { useState, useEffect } from 'react';
import { IsAdmin } from '../Firebase/Admin';
import { useAuth } from '../Firebase/Auth';

const MainUserComponent = () => {
    const { User, UID } = useAuth();

    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchIsAdmin = async () => {
            try {
                const data = await IsAdmin(UID);
                setAdmin(data);
            } catch (e) {
                console.error("Error IsAdmin: ", e);
                setAdmin(null);
            }
        };

        fetchIsAdmin();
    }, [UID]);

    if (User === null || User === undefined) return(
        <div className="container font-bold mt-[20%]">
            <div className="flex flex-col items-center my-auto">
                <UserLoader/>
                <h1 className="text-rose-300 border-b-indigo-300 text-4xl">Please Login to continue</h1>
            </div>
        </div>
    ); 

    return (
        <div>
            {admin ? <AdminComponent/> : <ClientComponent/>}
        </div>
    );
};

export default MainUserComponent;