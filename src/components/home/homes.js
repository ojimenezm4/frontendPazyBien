import React from 'react';
import Navbar from './frame/navbar';
import Header from './frame/header';
import AboutUs from './frame/aboutus';
import MissionVision from './frame/misionvision';
import Gallery from './frame/gallery';
import Footer from './frame/footer'
import BestFeatures from './frame/bestfeatures'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Homes() {
  return (
    <div>
      <Navbar />
      <Header />
      <BestFeatures />
      <AboutUs />
      <MissionVision />
      <Gallery />
      <Footer />
    </div>
  );
}

export default Homes;
