import { useState } from "react";
import DeleteMessage from "./DeleteNotice";

interface DeleteButtonProps {
    onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
    const [notice, setNotice] = useState(false);

    const showNotice = () => {
        setNotice(true);
    };

    const closeNotice = () => {
        setNotice(false);
    };

    return (
        <div>
            <button 
                type="button" 
                className="px-3 py-2 bg-[#a21111] hover:bg-red-800 text-white rounded-md shadow-sm transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500" 
                onClick={() => {onClick(); showNotice();}}
            >
                Delete
            </button>
            <div>
                {notice && <DeleteMessage submit={closeNotice} />}
            </div>
        </div>
    );
};

export default DeleteButton;
