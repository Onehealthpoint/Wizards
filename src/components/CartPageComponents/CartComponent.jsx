import { useState, useEffect } from "react";
import { FetchCart } from "../Firebase/CRUD";
import CartItemCard from "./CartItemCard";
import Loader from "../Loader/Loader";

const CartComponent = () => {
    const [cartedBooks, setCartedBooks] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const data = await FetchCart();
                setCartedBooks(data || []);
            } catch (e) {
                setError("Failed to fetch cart data");
                console.error("Error FetchCart: ", e);
            }
        };
        fetchCartData();
    }, []);

    useEffect(() => {
        if(cartedBooks.length > 0) setLoading(false);
    }, [cartedBooks]);

    if (loading) return <div className="h-svh flex justify-center items-center"><Loader/></div>;

    if (error) return <p>Error: {error}</p>;

    return(
        <>
        {cartedBooks.length > 0 ? (
            <div className="container w-screen mx-auto">
                <div className="w-full mx-auto">
                    {cartedBooks.map((bookObj) => (
                        <CartItemCard key={bookObj[0].id} book={bookObj} />
                    ))}
                </div>
            </div>
        ) : (
            <div className="container">
                <div className="row">
                    <h2>Cart is Empty</h2>
                </div>
            </div>
        )}
        </>
    );
};

export default CartComponent;