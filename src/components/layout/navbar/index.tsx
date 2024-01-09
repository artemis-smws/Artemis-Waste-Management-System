import "./index.scss";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { BoxArrowInRight, DoorOpen } from "react-bootstrap-icons";
import {nav} from './data'

// linked to single page references using useRef
interface Props {
  handleFeature?: () => void;
  handleAbout?: () => void;
  handleContact?: () => void;
}

export default function Navbar_({
  handleFeature,
  handleAbout,
  handleContact,
}: Props) {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary w-100 d-flex justify-content-between position-absolute"
    >
      <Navbar.Brand href="/">
        <img
          height="40px"
          width="auto"
          src="./assets/logo/artemis-brand.png"
          alt="artemis brand"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Offcanvas id="basic-navbar-nav" placement="end" >
        <Nav className="d-flex justify-content-end gap-5 w-100 fw-normal">
          {nav.nav_links.map(data => (
            <Nav.Link key={data.name} href={data.reference} className="text-uppercase fw-semibold text-white">
              {data.name}
            </Nav.Link>
          ))}
          <Nav.Link
            href="/login"
            className="px-3 rounded d-flex align-items-center gap-3 text-white"
          >
            <BoxArrowInRight />
            Login
          </Nav.Link>
        </Nav>
      </Navbar.Offcanvas>
    </Navbar>
  );
}
