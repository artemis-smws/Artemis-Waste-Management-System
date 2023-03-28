import * as React from 'react';
import { Component } from 'react';

interface LoginCardProps {
    
}
 
interface LoginCardState {
    
}
 
class LoginCard extends React.Component<LoginCardProps, LoginCardState> {
    // state = { :  }
    render() { 
        return <div>
            <form className='container-fluid' method='submit' role="login">
                    <div className='input-group flex-wrap'>
                        <input type="text" className='form-control' 
                        placeholder='Email / Username' name='email'/>
                    </div>
                    <div className='input-group flex-wrap'>
                        <input type="text" className='form-control' 
                        placeholder='Password' name='password'/>
                    </div>
                    <button className='btn btn-dark' type="submit">Login</button>
                </form>
        </div>
    }
}
 
export default LoginCard;