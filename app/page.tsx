import React from 'react'
import Header from "./components/layout/header";
import Footer from './components/layout/footer';
import HeroSection from './components/sections/heroSection';
import FeaturesSection from './components/sections/featuresSection';


/**Home page of the website, functions as a Landing page */
export default function Home() {
  return (
    <div className="">
      <main>
        <HeroSection />
        <FeaturesSection/>
      </main>
      <Footer/>
    </div>
  );
}
