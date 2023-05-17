import {NavLink, Link} from 'react-router-dom'

// linked to single page references using useRef
interface Props {
  handleFeature ?: () => void,
  handleAbout ?: () => void,
  handleContact ?: () => void,
}



export default function Navbar({handleFeature, handleAbout, handleContact} : Props) {
  return (
    <nav className="d-flex fixed-top navbar navbar-expand-lg  justify-content-between px-5 pt-4">
      <Link to='/' reloadDocument className="navbar-brand align-text-center">
        ArteMIS
      </Link>
      <button className="navbar-toggler" type="button">
        Menu
      </button>
      <div className="collapse navbar-collapse justify-content-end">
        <div className="navbar-nav justify-content-between flex-wrap">
          <a onClick={handleAbout} className="nav-link mx-2">
            ABOUT
          </a>
          <a onClick={handleFeature} className="nav-link mx-2">
            FEATURES
          </a>
          <a onClick={handleContact} className="nav-link mx-2">
            CONTACTS
          </a>
          <NavLink  to='/admin' className="nav-link mx-2">
            MAP
          </NavLink>
          <NavLink to='/admin' className="nav-link mx-2">
            ANALYTICS
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
