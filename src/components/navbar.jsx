import React from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import queryString from "query-string";
import logoAteitis from "../images/logo-ateitis-centered.png";
import logoAcademy from "../images/logo-ateitis-academy-centered.png";

export default function NavbarMenu({ menu, section }) {
  const logo = section === "academy" ? logoAcademy : logoAteitis;
  return (
    // <Nav className="navbar justify-content-center" activeKey="/home">
    <Navbar collapseOnSelect expand="md">
      <Navbar.Brand href="#home">
        <img src={logo} alt="Ateitis Logo" height="120px" alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-center"
      >
        {menu.map(item => (
          <Nav.Item key={item.id}>
            <Nav.Link href={item.url} className="hvr-underline-from-center">
              {item.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
