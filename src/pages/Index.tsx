import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Method from "@/components/Method";
import HowItWorks from "@/components/HowItWorks";
import Results from "@/components/Results";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <SplashScreen isVisible={showSplash} />
      <CustomCursor />
      <Hero />
      <main>
        <Experience />
        <Method />
        <HowItWorks />
        <Results />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
