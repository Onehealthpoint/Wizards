import Layout from "../components/Layout/Layout";
import HomeComponent from "../components/HomePageComponents/HomeComponent";
import HeroSection from "../components/HomePageComponents/HeroSection";


const HomePage = () => {
    return (
        <Layout>
            <HeroSection />
            <HomeComponent />
        </Layout>
    );
};

export default HomePage;
