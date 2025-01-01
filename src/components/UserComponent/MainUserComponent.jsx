import { useEffect, useState } from "react";
import ClientComponent from "./ClientComponent";
import AdminComponent from "./AdminComponent";
import { IsAdmin } from "../Firebase/CRUD";

const MainUserComponent = () => {
    const[Admin, setAdmin] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIsAdmin = async () => { 
            try{
                const isAdmin = await IsAdmin();
                console.log("isAdmin: ", isAdmin);
                setAdmin(isAdmin || null);
            }
            catch(e){
                console.error("Error FetchAdmin: ", e);
            }
        };
        fetchIsAdmin();
    },[]);

    useEffect(() => {
        if(Admin !== null){
            setLoading(false);
        }
        else{
            setLoading(true);
        }
    },[Admin]);

    if (loading) return <p>Loading...</p>;
    

    return (
        <div>
            {
                Admin ? <AdminComponent/> : <ClientComponent/>
            }
        </div>
    );
};

export default MainUserComponent;