/* eslint-disable react/prop-types */
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({children}) => {
    return (
        <div>
            <Navbar/>
            <div className="min-h-[85vh]">
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export default Layout;