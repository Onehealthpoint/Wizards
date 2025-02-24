import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/Auth";
import { useState, useEffect } from "react";


const Navbar = () => {
    const [LoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
        });
        return () => unsubscribe();
      }, []);

    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            <li>
                <Link to={'/category'}>Category</Link>
            </li>

            {
                LoggedIn? (
                    <li>
                        <Link to={'/'} onClick={()=>{signOut(auth)}}>Logout</Link>
                    </li>
                ) : (
                    <li>
                        <Link to={'/login'}>Signup</Link>
                    </li>
                )
            }

            <li>
                <Link to={'/'}>User</Link>
            </li>

            <li>
                <Link to={'/cart'}>
                    Cart(0)
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 sticky top-0 z-50">
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className="font-bold text-white text-2xl text-center">WIZARDS'</h2>
                    </Link>
                </div>

                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                <SearchBar />
            </div>
        </nav>
    );
};

export default Navbar;