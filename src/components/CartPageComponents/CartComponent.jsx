import { useState, useEffect } from "react";
import { FetchCart } from "../Firebase/CartCRUD";
import { useAuth } from "../Firebase/Auth";
import CartItemCard from "./CartItemCard";
import { CartLoader } from "../Loader/Loader";

const CartComponent = () => {
    const { User, UID } = useAuth();
    const [cartedBooks, setCartedBooks] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const data = await FetchCart(UID);
                setCartedBooks(data || []);
                setLoading(false);
            } catch (e) {
                setError("Failed to fetch cart data");
                console.error("Error FetchCart: ", e);
            }
        };
        fetchCartData();
    }, [UID]);

    if (User === null) {
        return(
            <div className="container text-center text-5xl font-bold mt-[20%] bg-burgundy-950">
                <div className="row">
                    <h1 className="text-rose-300 border-b-indigo-300">Please Login to continue</h1>
                </div>
            </div>
        );
    }

    if (loading) return <CartLoader/>;

    if (error) return <p>Error: {error}</p>;

    return(
        <>
        {cartedBooks.length > 0 ? (
            <div className="container w-screen mx-auto">
                <div className="w-full mx-auto">
                    {cartedBooks.map((book) => (
                        <CartItemCard key={book.ISBN} book={book} />
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