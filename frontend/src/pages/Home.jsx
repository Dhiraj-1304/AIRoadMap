import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';  
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import RoadmapPreview from '../components/RoadmapPreview';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const home = () => {
  return (
  
       <div className="min-h-screen bg-[#030014] text-white selection:bg-purple-500/30 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <RoadmapPreview />
        <CTA />
      </main>
      <Footer />
    </div>

  );
}

export default home