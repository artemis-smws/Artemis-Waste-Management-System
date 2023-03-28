import * as React from 'react';
import { Component } from 'react';

interface NavbarProps {
    
}
 
interface NavbarState {
    
}
 
class Navbar extends React.Component<NavbarProps, NavbarState> {
    // state = { :  }
    render() { 
        return(
            <nav className='navbar navbar-expand-lg'>
                {/* navbar brand - replace with logo */}
                <a href='#' className='navbar-brand mx-3' >
                    <i className="bi bi-bootstrap-fill text-white"></i>
                </a>

                <div></div>

                {/* navbar buttons */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="bi bi-three-dots-vertical text-white"></i>
                </button>
                <div className='container d-flex justify-content-center'>
                    <div className='collapse navbar-collapse' id='navbarText'>
                        <ul className='navbar-nav me-auto'>
                            <li className='nav-item'>
                                <a href="#" className='nav-link text-white'>About</a>
                            </li>
                            <li className='nav-item'>
                                <a href="#" className='nav-link text-white'>Contacts</a>
                            </li>
                            <li className='nav-item'>
                                <a href="#" className='nav-link text-white'>Features</a>
                            </li>
                            <li className='nav-item'>
                                <a href="#" className='nav-link text-white'>Maps</a>
                            </li>
                            <li className='nav-item'>
                                <a href="#" className='nav-link text-white'>Analytics</a>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </nav>
        )
    }
}
 
export default Navbar;