import { useState } from "react"
import DeleteMessage from "./DeleteNotice"

const DeleteButton = () => {

    const [notice, setNotice] = useState(false)

    const showNotice = () => {
        setNotice(true)
    }
    const closeNotice = () => {
        setNotice(false)
    }

    return(
        <div>
            <button type="button" className="btn btn-danger" onClick={showNotice}>Delete</button>
            <div>
                {notice && <DeleteMessage submit={closeNotice}/>}
            </div>
        </div>
    )
}

export default DeleteButton