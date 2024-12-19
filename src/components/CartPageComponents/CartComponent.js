import { useState, useEffect } from "react";
import { FetchCart } from "../Firebase/CRUD";
import CartItemCard from "./CartItemCard";

const CartComponent = () => {
    const [cartedBooks, setCartedBooks] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    const TestUID = "sadik123456"

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const data = await FetchCart(TestUID);
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
        console.log("Carted Books: ", cartedBooks);
    }, [cartedBooks]);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error}</p>;

    return(
        <>
        {cartedBooks.length > 0 ? (
            <div className="container">
                <div className="row">
                    {cartedBooks.map((bookObj) => (
                        <CartItemCard key={bookObj.id} book={bookObj} />
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