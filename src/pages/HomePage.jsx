import Layout from "../components/Layout/Layout";
import HomeComponent from "../components/HomePageComponents/HomeComponent";
import HeroSection from "../components/HomePageComponents/HeroSection";
import GenreComponent from "../components/Genre/GenreComponent";


const HomePage = () => {
    return (
        <Layout>
            <HeroSection />
            <GenreComponent />
            <HomeComponent />
        </Layout>
    );
};

export default HomePage;
