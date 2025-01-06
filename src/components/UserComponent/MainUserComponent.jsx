import ClientComponent from './ClientComponent';
import AdminComponent from './AdminComponent';
import { UserLoader } from '../Loader/Loader';
import { useState, useEffect } from 'react';
import { IsAdmin } from '../Firebase/CRUD';

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
            }
        };
        fetchIsAdmin();
    }, []);

    useEffect(() => {
        if(admin !== null) setLoading(false);
    }, [admin]);

    if (loading) return <UserLoader/>;

    return (
        <div>
            {admin ? <AdminComponent/> : <ClientComponent/>}
        </div>
    );
};

export default MainUserComponent;