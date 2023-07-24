import { Link, Outlet } from "react-router-dom";

import "./layout.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Layout() {
  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary navbar-container">
      <Container>
        <Navbar.Brand href="homePage">React-Bootstrap</Navbar.Brand>
        <div>darkmode</div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link ><Link className="nav-link" to={'/homePage'}>Home</Link></Nav.Link>
            <Nav.Link ><Link className="nav-link" to={'/addParking'}>Add Parking</Link></Nav.Link>
            <Nav.Link ><Link className="nav-link" to={'/profile'}>Profile</Link></Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
       
      </Container>
    </Navbar>

      <Outlet />
      <div className="footer">footer</div>
    </div>
  );
}

export default Layout;
