import "./index.scss";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { BoxArrowInRight, DoorOpen } from "react-bootstrap-icons";

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
      <Navbar.Brand href="/">Artemis</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-flex justify-content-end gap-3 w-100">
          <Nav.Link href="/login" className="bg-success px-3 rounded d-flex align-items-center gap-3">
            <BoxArrowInRight />
            Login
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
