import Layout from "../components/Layout/Layout";
import HomeComponent from "../components/HomePageComponents/HomeComponent";
import HomeGenre from "../components/HomePageComponents/HomeGenre";

const HomePage = () => {
    return (
        <Layout>
            <HomeComponent />
            <HomeGenre />
        </Layout>

    );
};

export default HomePage;
