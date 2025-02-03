import ClientComponent from './ClientComponent';
import AdminComponent from './AdminComponent';
import { UserLoader } from '../Loader/Loader';
import { useState, useEffect } from 'react';
import { IsAdmin } from '../Firebase/Admin';
import { User } from '../Firebase/Auth';

const MainUserComponent = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIsAdmin = async () => {
            try {
                const data = await IsAdmin();
                setAdmin(data);
            } catch (e) {
                console.error("Error IsAdmin: ", e);
                setAdmin(null);
            } finally {
                setLoading(false);
            }
        };

        fetchIsAdmin();
    }, []);

    if (loading) return <UserLoader/>;

    if (User === null) return(
        <div className="container text-center text-5xl font-bold mt-[20%]">
            <div className="row">
                <h1 className="text-rose-300 border-b-indigo-300">Please Login to continue</h1>
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