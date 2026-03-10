import '../styles/Notice.scss'
import React from 'react'

interface props {
    submit: () => void
}

const DeleteMessage: React.FC<props> = ( {submit} ) => {
    return(
        <div>
            <div className="notice-card">
                <div className="notice-card-content flex flex-col justify-between p-5 space-y-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Delete Waste Data</h1>
                        <p className="text-gray-600 mt-2">Are you sure you want to delete Waste Data? It will be permanently removed.</p>
                    </div>
                    <div className='flex justify-end gap-3'>
                        <button type='button' className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition font-medium focus:outline-none focus:ring-2 focus:ring-gray-400' onClick={submit}>Cancel</button>
                        <button type='button' className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium focus:outline-none focus:ring-2 focus:ring-red-500' onClick={submit}>Delete</button>
                    </div> 
                </div>
            </div>
        </div>
    )
} 

export default DeleteMessage