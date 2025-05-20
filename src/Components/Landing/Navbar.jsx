import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css'
import { Link } from 'react-router-dom';

const CustomNavbar = () => (
  <Navbar expand="lg" className="custom-navbar" variant="dark" sticky="top">
  <Container>
    <Navbar.Brand href="#home">
      <img src="/logo.jpg" alt="logo" height="50" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto mx-auto custom-nav-links">
        <Link to={'/'} className='fs-1' style={{textDecoration:'none',color: '#ff00cc'}}>CLIP IT lads!</Link>
      </Nav>                                                                                                                                                                                           
    </Navbar.Collapse>
  </Container>
</Navbar>

);

export default CustomNavbar;
