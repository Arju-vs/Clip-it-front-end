
import { Container, Row, Col, } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section d-flex align-items-center text-white position-relative overflow-hidden">

      <Container className="z-2">
        <Row>
          <Col md={7} className="text-start">
            <h1 className="display-3 fw-bold">
              CLIP IT
            </h1>
            <p className="lead">
              CREATING THE FUTURE OF <span className="text-pink">GAMING!</span>
            </p>
            <div className="mt-4">
              <Link to={'/register'}  className="btn-up me-3">Sign Up</Link>
              <Link to={'/login'} className='btn-in'>Sign In</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
