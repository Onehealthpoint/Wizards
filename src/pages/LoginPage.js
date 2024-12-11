import LoginComponent from "../components/LoginPageComponents/LoginComponent";

const LoginPage = ({auth}) => {
    return (
         <LoginComponent auth={auth}/>
    );
};

export default LoginPage;