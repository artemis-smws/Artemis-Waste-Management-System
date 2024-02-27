import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { TrashData } from './TableData';
import { Dropdown } from 'react-bootstrap';

interface DataRow {
    Number: number;
    Building: string;
    Description: string;
    WasteType: string;
    Weight: string;
}

interface Table1Props {
    setIsDeleteButtonVisible: (isVisible: boolean) => void;
}

interface CustomDropdownProps {
    row: DataRow;
}

const TrashTable: React.FC<Table1Props> = ({ setIsDeleteButtonVisible }) => {

    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const handleChange = (state: { selectedRows: any[] }) => {
        setSelectedRows(state.selectedRows);
        setIsDeleteButtonVisible(state.selectedRows.length > 0);
    };

    const handleDeleteRow = (row: DataRow) => {
        
    };

    const handleUpdateRow = (row: DataRow) => {
    
    };

    const CustomDropdown: React.FC<CustomDropdownProps> = ({ row }) => (
        <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
                
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleDeleteRow(row)}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={() => handleUpdateRow(row)}>Update</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );

    const columns = [
        {
            name: 'Number',
            selector: (row: DataRow) => row.Number,
            sortable: true
        },
        {
            name: 'Building',
            selector: (row: DataRow) => row.Building,
            sortable: true
        },
        {
            name: 'Description',
            selector: (row: DataRow) => row.Description,
            sortable: true
        },
        {
            name: 'Waste Type',
            selector: (row: DataRow) => row.WasteType,
            sortable: true
        },
        {
            name: 'Weight',
            selector: (row: DataRow) => row.Weight,
            sortable: true
        },
        {
            name: 'Actions',
            cell: (row: DataRow) => (
                <CustomDropdown row={row} />
            ),
            button: true,
            ignoreRowClick: true,
            allowOverflow: true,
            buttonStyle: {
                padding: '0.25rem 0.5rem',
                minWidth: 'unset',
            }
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={TrashData}
            selectableRows
            selectableRowsHighlight
            onSelectedRowsChange={handleChange}
            fixedHeader
            fixedHeaderScrollHeight='100%'
            pagination
            paginationPerPage={20}
        />
    );
}

export default TrashTable;
