import Layout from "../components/Layout/Layout";
import HomeComponent from "../components/HomePageComponents/HomeComponent";
import HeroSection from "../components/HomePageComponents/HeroSection";
import GenreComponent from "../components/Genre/GenreComponent";
import Adbanner from "../components/AdvertComponent/AdvertComponent";
import TrendingComponent from "../components/HomePageComponents/TrendingComponent";

const HomePage = () => {
    return (
        <Layout>
            <HeroSection />
            <Adbanner />
            <GenreComponent />
            <TrendingComponent />
            <HomeComponent />
        </Layout>

    );
};

export default HomePage;
