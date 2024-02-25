// DataTable.tsx

import { TrashData } from './TableData';
import '../styles/Table.scss';
import { useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineUpdate } from "react-icons/md";
import React from 'react';

interface props {
    toggleDeleteButtonVisibility: (isVisible: boolean) => void;
}

const DataTable: React.FC<props> = ({ toggleDeleteButtonVisibility }) => {

    const [checkedItems, setCheckedItems] = useState(new Map<number, boolean>());
    const [selectAll, setSelectAll] = useState(false);
    const [trashData, setTrashData] = useState(TrashData);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        const newCheckedItems = new Map<number, boolean>();
        trashData.forEach((data) => {
            newCheckedItems.set(data.Number, isChecked);
        });
        setCheckedItems(newCheckedItems);
        toggleDeleteButtonVisibility(isChecked);
    };

    const handleCheckboxChange = (number: number) => {
        const newCheckedItems = new Map(checkedItems);
        newCheckedItems.set(number, !checkedItems.get(number));
        setCheckedItems(newCheckedItems);
        setSelectAll([...newCheckedItems.values()].every(Boolean));
        toggleDeleteButtonVisibility([...newCheckedItems.values()].some(Boolean));
    };

    const handleRowDelete = (number: number) => {
        // Filter out the selected row based on its Number
        const updatedTrashData = trashData.filter(data => data.Number !== number);
        // Update the state with the new data
        setTrashData(updatedTrashData);
    };

    const getRowClassName = (number: number) => {
        return checkedItems.get(number) ? 'table-row active' : 'table-row';
    };

    return (
        <div className='mt-1'>
            <table className='table table-borderless'>
                <thead>
                    <tr>
                        <th scope='col'><input type="checkbox" onChange={handleSelectAll} checked={selectAll} className='checkbox-input'/> #</th>
                        <th scope='col'>Building</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Types of Waste</th>
                        <th scope='col'>Weight</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {trashData.map((data, index) => (
                        <tr key={index} className={getRowClassName(data.Number)}>
                            <th scope='row'>
                                <input
                                    type="checkbox"
                                    checked={checkedItems.get(data.Number)}
                                    onChange={() => handleCheckboxChange(data.Number)}
                                    className='checkbox-input'
                                /> 
                                {data.Number}
                            </th>
                            <td>{data.Building}</td>
                            <td>{data.Description}</td>
                            <td>{data.WasteType}</td>
                            <td>{data.Weight}</td>
                            <td><TableDropdown onDelete={() => handleRowDelete(data.Number)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

function TableDropdown({ onDelete }: { onDelete: () => void }) {
    return (
        <div className="dropdown ms-auto">
            <BsThreeDotsVertical data-bs-toggle="dropdown" aria-expanded="false"/>
            <ul className="dropdown-menu">
                <li>
                    <span className="dropdown-item">
                        <MdOutlineUpdate/>
                        Update
                    </span>
                </li>
                <li>
                    <span className="dropdown-item" onClick={onDelete}>
                        <MdDeleteOutline/>
                        Delete
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default DataTable;
