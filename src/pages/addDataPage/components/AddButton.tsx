import { useState } from "react"
import AddWaste from "./AddWaste"

const AddWasteButton = () => {
    
    const [addWaste, setAddWaste] = useState(false)

    const showCard = () => {
        setAddWaste(true)
    }
    const closeCard = () => {
        setAddWaste(false)
    }

    return(
        <div>
            <button type="button" className="btn btn-success" onClick={showCard}>Add Waste</button>
            <div>
                {addWaste && <AddWaste onClose={closeCard}/>}
            </div>
        </div>
    )
}


export default AddWasteButton