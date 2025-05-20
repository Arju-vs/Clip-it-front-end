import Navbar from '../Components/Landing/Navbar'
import HeroSection from '../Components/Landing/HeroSection'
import WorksSection from '../Components/Landing/WorkSection'
import Footer from '../Components/Landing/Footer'
import './landing.css'

const Landing = () => {
  return (
    <div>
        <Navbar />
        <HeroSection />
        <WorksSection />
        <Footer />
    </div>
  )
}

export default Landing