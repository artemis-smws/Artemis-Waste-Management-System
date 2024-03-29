import "../styles/Dropdown.scss"


const DropdownComponent = () => {
    return(
        <div className="input-group">
            <div className="input-group-prepend">

                <button className="btn btn-outline-secondary dropdown-toggle dropdown-btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All</button>

                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">ALL</a>
                        <a className="dropdown-item" href="#">TYPES OF WASTE</a>
                        <a className="dropdown-item" href="#">DESCRIPTION</a>
                        <a className="dropdown-item" href="#">BUILDING</a>
                        <a className="dropdown-item" href="#">WEIGHT</a>
                    </div>
            </div>
            <input type="text" className="form-control" aria-label="Text input with dropdown button"/>
        </div>
    )
}

export default DropdownComponent