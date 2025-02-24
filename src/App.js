// Imports for Routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Imports for Web-Pages
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FailedPaymentPage from "./pages/FailedPaymentPage";
import SuccessPaymentPage from "./pages/SuccessPaymentPage";
import CodPaymentPage from "./pages/CodPaymentPage";
import UserPage from "./pages/UserPage";
import CategoryDetailPage from "./components/CategoryPageComponents/CategoryDetailPage";
import SearchByAuthor from "./components/HomePageComponents/SearchByAuthor";
import GenreMain from "./components/Genre/GenreMain";
import DeliveryPage from "./pages/DeliveryPage";
import UserOrderPage from "./pages/UserOrderPage";
import AboutUsComponent from "./components/AboutUsComponent";



function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:categoryId" element={<CategoryDetailPage />} />
          <Route path="/User" element={<UserPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/paymentsuccess" element={<SuccessPaymentPage />} />      
          <Route path="/paymentfailure" element={<FailedPaymentPage />} />    
          <Route path="/CodPayment" element={<CodPaymentPage />} />   
          <Route path="/author/:author" element={<SearchByAuthor />} />   
          <Route path="/searchbygenre/:genre" element={<GenreMain />} />
          <Route path="/Delivery" element={<DeliveryPage />} />
          <Route path="/UserOrdersPage" element={<UserOrderPage/>} />
          <Route path="/about" element={<AboutUsComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
