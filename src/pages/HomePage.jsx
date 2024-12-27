import Layout from "../components/Layout/Layout";
import HomeComponent from "../components/HomePageComponents/HomeComponent";
import BookGrid from "../components/HomePageComponents/MainComponent";


const HomePage = () => {
    return (
        <Layout>
            <HomeComponent />
            <BookGrid />
        </Layout>
    );
};

export default HomePage;
