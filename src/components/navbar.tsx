import { useState } from 'react' 


export default function Navbar() {
  return (
    <nav className="d-flex position-absolute top-0 start-0 end-0 navbar navbar-expand-lg justify-content-between px-5 pt-4">
        <div className="navbar-brand align-text-center">
        <i className="bi bi-bootstrap-fill align-text-center me-2 fs-3"></i>
            ArteMIS
        </div>
        <button className="navbar-toggler" type="button">
            Menu
        </button>
        <div className="collapse navbar-collapse justify-content-end">
            <div className="navbar-nav justify-content-between flex-wrap">
                <a href="#" className="nav-link mx-2">ABOUT</a>
                <a href="#" className="nav-link mx-2">CONTACT</a>
                <a href="#" className="nav-link mx-2">FEATURES</a>
                <a href="#" className="nav-link mx-2">MAP</a>
                <a href="#" className="nav-link mx-2">ANALYTICS</a>
            </div>
        </div>
        
    </nav>
  )
}
