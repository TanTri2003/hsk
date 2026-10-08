import Header from "../../components/Home/Header";
import Hero from "../../components/Home/Hero";
import FeatureSection from "../../components/Home/FeatureSection";
import CourseSection from "../../components/Home/CourseSection";
import LevelSection from "../../components/Home/LevelSection";
import PracticeSection from "../../components/Home/PracticeSection";
import Footer from "../../components/Home/Footer";
import "./Home.scss";

const Home = () => {
    return (
        <div className="Home">
            <Header />

            <main>
                <Hero />
                <FeatureSection />
                <CourseSection />
                <LevelSection />
                <PracticeSection />
            </main>

            <Footer />
        </div>
    );
};

export default Home;