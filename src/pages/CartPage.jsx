import Layout from "../components/Layout/Layout";
import CartComponent from "../components/CartPageComponents/CartComponent";
import ClientProfile from "../components/UserProfileComponents/ClientProfile";

const CartPage = () => {
    return (
        <Layout>
            <CartComponent />
            <ClientProfile/>
        </Layout>
    );
};

export default CartPage;