import { useState, useEffect } from "react";
import { MinusIcon, PlusIcon, ShoppingCartIcon, HeartIcon, TrashIcon, CreditCardIcon, BanknoteIcon, SaveIcon } from "lucide-react";
import { FetchCart, RemoveFromCart, UpdateCart } from "../Firebase/CartCRUD";
import { AddToWishlist } from "../Firebase/WishlistCRUD";
import { useAuth } from "../Firebase/Auth";

const CartComponent = () => {
    const {UID} = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(UID);
  
    useEffect(() => {
      const loadCartItems = async () => {
        if (!UID) {
          return;
        }
        try {
          setLoading(true);
          const books = await FetchCart(UID);
          setCartItems(books);
          console.log(books);
        } catch (error) {
          console.error("Error loading cart items:", error);
        } finally {
          setLoading(false);
        }
      };
  
      loadCartItems();
    }, [UID]);
  
    const updateQuantity = (ISBN, newQuantity) => {
        setCartItems(
            cartItems.map((book) => (book.ISBN === ISBN ? { ...book, quantity: Math.max(1, Math.min(10, newQuantity)) } : book)),
        );
    };

    const saveQuantity = async(ISBN, newQuantity) => {
        await UpdateCart(UID, ISBN, newQuantity);
        alert("Quantity saved successfully");
    };
  
    const buyItem = (ISBN) => {
      console.log(`Buying item with id: ${ISBN}`);
      // Implement buy logic here
      removeFromCart(ISBN);
    };
  
    const buyCart = (paymentMethod) => {
      console.log(`Buying entire cart with ${paymentMethod} payment`);
      // Implement buy cart logic here
    };
  
    const calculateTotal = () => {
      return cartItems.reduce((total, book) => total + book.price * book.quantity, 0);
    };
  
    const moveToWishlist = async(ISBN) => {
      await AddToWishlist(UID, ISBN);
      removeFromCart(ISBN);
    };
  
    const removeFromCart = async(ISBN) => {
        await RemoveFromCart(UID, ISBN);
        setCartItems(cartItems.filter((book) => book.ISBN !== ISBN));
    };
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-purple-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-purple-300 mb-6">Your Cart</h1>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/3 pr-8">
                {cartItems.map((book) => (
                  <div key={book.ISBN} className="mb-6 p-4 border border-purple-700 rounded-lg flex items-center">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded-md mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-purple-300">{book.title}</h3>
                      <p className="text-purple-400">{book.author}</p>
                      <p className="text-purple-700 font-bold mt-2">${book.price}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(book.ISBN, book.quantity - 1)}
                          className="bg-purple-900 text-purple-300 px-2 py-1"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="bg-purple-900 text-purple-300 px-4 py-1">{book.quantity}</span>
                        <button
                          onClick={() => updateQuantity(book.ISBN, book.quantity + 1)}
                          className="bg-purple-900 text-purple-300 px-2 py-1"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => saveQuantity(book.ISBN, book.quantity)}
                          className="bg-green-900 text-green-300 ml-5 px-2 py-1"
                        >
                          <SaveIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={() => buyItem(book.ISBN)}
                        className="bg-purple-700 text-white px-4 py-1 rounded hover:bg-purple-800 transition-colors flex items-center justify-center"
                      >
                        <ShoppingCartIcon className="w-4 h-4 mr-1" /> Buy Now
                      </button>
                      <button
                        onClick={() => moveToWishlist(book.ISBN)}
                        className="bg-purple-900 text-purple-300 px-4 py-1 rounded hover:bg-purple-800 transition-colors flex items-center justify-center"
                      >
                        <HeartIcon className="w-4 h-4 mr-1" /> Wishlist
                      </button>
                      <button
                        onClick={() => removeFromCart(book.ISBN)}
                        className="bg-red-900 text-red-300 px-4 py-1 rounded hover:bg-red-800 transition-colors flex items-center justify-center"
                      >
                        <TrashIcon className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:w-1/3 mt-8 lg:mt-0">
                <div className="bg-purple-900 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-purple-300 mb-4">Cart Summary</h2>
                  <p className="text-xl text-purple-700 mb-4">Total: ${calculateTotal()}</p>
                  <div className="space-y-4">
                    <button
                      onClick={() => buyCart("online")}
                      className="w-full bg-purple-700 text-white py-2 px-4 rounded-lg hover:bg-purple-800 transition-colors flex items-center justify-center"
                    >
                      <CreditCardIcon className="w-5 h-5 mr-2" />
                      Pay Now (Online)
                    </button>
                    <button
                      onClick={() => buyCart("cash")}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                    >
                      <BanknoteIcon className="w-5 h-5 mr-2" />
                      Cash on Delivery
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default CartComponent;

