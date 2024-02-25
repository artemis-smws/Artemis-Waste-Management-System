import '../styles/Notice.scss'
import React from 'react'

interface props {
    submit: () => void
}

const DeleteMessage: React.FC<props> = ( {submit} ) => {
    return(
        <div>
            <div className="notice-card">
                <div className="notice-card-content d-flex flex-column justify-content-between p-3">
                    <div>
                        <h1>Delete Waste Data</h1>
                        <p>Are you sure you want to delete Waste Data? It will be permanently removed.</p>
                    </div>
                    <div className='d-flex justify-content-end gap-1'>
                        <button type='button' className='btn btn-secondary' onClick={submit}>Cancel</button>
                        <button type='button' className='btn btn-danger' onClick={submit}>Delete</button>
                    </div> 
                </div>
            </div>
        </div>
    )
} 

export default DeleteMessage