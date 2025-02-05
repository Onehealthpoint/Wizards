import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { signOut } from "firebase/auth";
import { useAuth, auth } from "../Firebase/Auth";
import { LogOut, CircleUserRound, User2, ShoppingBag, HomeIcon } from "lucide-react";


const Navbar = () => {
    const { User } = useAuth();

    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5 lg:gap-3">
            <li>
                <Link 
                    to={'/'}
                >
                    <HomeIcon size={30} />
                </Link>
            </li>
            {
                User? (
                    <li>
                        <Link 
                            to={'/'} 
                            onClick={()=>{
                                signOut(auth);
                            }}
                        >
                            <LogOut size={30} />
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Link 
                            to={'/login'}
                        >
                            <CircleUserRound size={30} />
                        </Link>
                    </li>
                )
            }

            {(User) && (
                <>
                    <li>
                        <Link 
                            to={'/User'}
                        >
                            <User2 size={30} />
                        </Link>
                    </li>

                    <li>
                        <Link 
                            to={'/cart'}
                        >
                            <ShoppingBag size={30} />
                        </Link>
                    </li>
                </>
            )}
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

                <div className="right flex justify-center items-center mb-4 lg:mb-0 lg:gap-4">
                    {navList}
                    <SearchBar />
                </div>

                
            </div>
        </nav>
    );
};

export default Navbar;