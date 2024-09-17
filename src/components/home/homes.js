import React from 'react';
import Navbar from './frame/navbar';
import Header from './frame/header';
import AboutUs from './frame/aboutus';
import MissionVision from './frame/misionvision';
import Gallery from './frame/gallery';
import Footer from './frame/footer'
import BestFeatures from './frame/bestfeatures'
import Contact from './frame/contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Wave from 'react-wavify'
function Homes() {
  return (
    <div>
      <Navbar />
      <Header />
      <BestFeatures />
      <Wave fill='#f8f9fa' paused={false} style={{ display: 'flex' }} options={{ height: 20, amplitude: 20, speed: 0.25, points: 3 }}/>
      <MissionVision />
      <AboutUs />
      <Wave fill='#f8f9fa' paused={false} style={{ display: 'flex', transform: 'rotate(180deg)' }} options={{ height: 20, amplitude: 20, speed: 0.25, points: 3 }}/>
      <Gallery />
      <Contact />
      <Wave fill='#0d6efd' paused={false} style={{ display: 'flex' }} options={{ height: 4, amplitude: 20, speed: 0.25, points: 3 }}/>
      <Footer />
    </div>
  );
}

export default Homes;
