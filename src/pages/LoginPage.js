import Layout from "../components/Layout/Layout";
import LoginComponent from "../components/LoginPageComponents/LoginComponent";

const LoginPage = ({auth}) => {
    return (
        <Layout>
            <LoginComponent auth={auth}/>
        </Layout>
    );
};

export default LoginPage;