import "./admin/admin.scss";


export default function Admin() {
    return(
        <div>

            <div className="d-flex justify-content-evenly align-items-center" id="admin-login">
                <div className="d-flex justify-content-center" id="login-logo">
                    <img src="./assets/img/placeholder-icon.png" />
                </div>
                <div className="d-flex justify-content-center" id="login-card">
                    <div className ="d-flex flex-column align-items-center justify-content-center">
                        <input type="text" placeholder="Email" name="email"/>
                        <input type="password" placeholder="Password" name="password"/>
                        <button type="button" className="btn" id="lgn-btn">LOGIN</button>
                    </div>
                </div>
            </div>
            
            <footer>
                <ul className="d-flex justify-content-evenly"id="f-lists">
                    <li className="d-flex">
                        <img src="./assets/img/bsu-logo.png"/><h1>Batangas State University</h1>
                    </li>
                    <li className="d-flex">
                        <h1>BatState-U General Service Office</h1>
                    </li>
                    <li className="d-flex">
                        <img src="./assets/img/emu_logo.png"/><h1>BatState-U Environmental Management Unit</h1>
                    </li>
                </ul>
            </footer>

        </div>
    )
}