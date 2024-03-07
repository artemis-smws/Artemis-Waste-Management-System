import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { TrashData } from "./TableData";
import { Dropdown, Form, Button, Card } from "react-bootstrap";
import DeleteButton from "./DeleteButton";
import CalendarButton from "./Calendar";
import AddWaste from "./AddWaste";
import "../styles/AddWaste.scss";
import useFetch from "../../../hooks/useFetch";
import LoadingPage from "../../../components/loadingPage";
import getBuidlingNames from "../../dashboardPage/utils/getBuildingNames";
import getWeight from "../utils/getWeight";

interface DataRow {
	Date: string;
	Building: string;
	WasteType: string;
	Weight: number;
}

interface Table1Props {
	setIsDeleteButtonVisible: (isVisible: boolean) => void;
}

interface CustomDropdownProps {
	row: DataRow;
}

const TrashTable: React.FC<Table1Props> = ({ setIsDeleteButtonVisible }) => {
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
	const [isDeleteButtonVisible, setIsDeleteButtonVisibleLocal] =
		useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const handleChange = (state: { selectedRows: any[] }) => {
		setSelectedRows(state.selectedRows);
		setIsDeleteButtonVisibleLocal(state.selectedRows.length > 0);
		setIsDeleteButtonVisible(state.selectedRows.length > 0);
	};

	const toggleColumn = (columnName: string) => {
		if (hiddenColumns.includes(columnName)) {
			setHiddenColumns(hiddenColumns.filter((col) => col !== columnName));
		} else {
			setHiddenColumns([...hiddenColumns, columnName]);
		}
	};

	const handleDeleteRow = (row: DataRow) => {};

	const handleUpdateRow = (row: DataRow) => {};

	const CustomDropdown: React.FC<CustomDropdownProps> = ({ row }) => (
		<Dropdown>
			<Dropdown.Toggle
				variant="light"
				id="dropdown-basic"
			></Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item onClick={() => handleDeleteRow(row)}>
					Delete
				</Dropdown.Item>
				<Dropdown.Item onClick={() => handleUpdateRow(row)}>
					Update
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);

	const columns = [
		{
			name: "Date",
			selector: (row: DataRow) => row.Date,
			sortable: true,
			omit: hiddenColumns.includes("Date"),
		},
		{
			name: "Building",
			selector: (row: DataRow) => row.Building,
			sortable: true,
			omit: hiddenColumns.includes("Building"),
		},
		{
			name: "Waste Type",
			selector: (row: DataRow) => row.WasteType,
			sortable: true,
			omit: hiddenColumns.includes("WasteType"),
		},
		{
			name: "Weight (kg)",
			selector: (row: DataRow) => row.Weight,
			sortable: true,
			omit: hiddenColumns.includes("Weight"),
		},
		{
			name: "Actions",
			cell: (row: DataRow) => <CustomDropdown row={row} />,
			button: true,
			ignoreRowClick: true,
			allowOverflow: true,
			buttonStyle: {
				padding: "0.25rem 0.5rem",
				minWidth: "unset",
			},
		},
	];

	const [wasteData, setWasteData] = useState(Array<DataRow>);
	const [loading, setLoading] = useState(false);

	// Filter rows based on search query
	const filteredRows = wasteData.filter((row) =>
		Object.values(row).some((value) =>
			value.toString().toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	useEffect(() => {
		setLoading(true);
		useFetch("waste", "all waste")
			.then((res: any) => {
				const wasteType = [
					"infectious",
					"biodegradable",
					"recyclable",
					"residual",
					"total"
				];
				const staged: DataRow[] = [];
				res.forEach((response: any) => {
					const buildingList = Object.keys(response).filter((key) => {
						return (key != "createdAt" && key != "overall_biodegradable" && key != "overall_recyclable" && key != "overall_residual" && key != "overall_infectious" && key != "overall_weight" && key != "id") && key
					})
					buildingList.forEach((building: string) => {
						wasteType.forEach((type: string) => {
							if (response[building] === undefined) {
								console.log(
									"No data for this building: ",
									building
								);
								return;
							}
							staged.push({
								Date: response.id,
								Building: building,
								WasteType: type,
								Weight: getWeight(
									response[building].weight,
									type
								),
							});
						});
					});
				});
				setWasteData(staged);
			})
			.catch((e: any) => {
				e instanceof Error && console.log(e.message);
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return loading ? (
		<LoadingPage />
	) : (
		<div
			className="d-flex flex-column"
			style={{
				position: "relative",
				height: "100vh",
				overflow: "hidden",
			}}
		>
			<Header
				isDeleteButtonVisible={isDeleteButtonVisible}
				handleDelete={() => {
					// Handle delete action here
				}}
				toggleColumn={toggleColumn}
				hiddenColumns={hiddenColumns}
				setSearchQuery={setSearchQuery}
				TrashData={TrashData}
			/>
			<DataTable
				columns={columns}
				data={filteredRows.reverse()} // Use filtered rows
				selectableRows
				selectableRowsHighlight
				onSelectedRowsChange={handleChange}
				pagination
				paginationPerPage={20}
				fixedHeader
			/>
		</div>
	);
};

interface HeaderProps {
	isDeleteButtonVisible: boolean;
	handleDelete: () => void;
	toggleColumn: (columnName: string) => void;
	hiddenColumns: string[];
	setSearchQuery: (query: string) => void;
	TrashData: DataRow[];
}

const Header: React.FC<HeaderProps> = ({
	isDeleteButtonVisible,
	handleDelete,
	toggleColumn,
	hiddenColumns,
	setSearchQuery,
	TrashData,
}) => {
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const [columns, setColumns] = useState(false);

	const showColumnsList = () => {
		setColumns(true);
	};

	return (
		<div
			style={{
				position: "sticky",
				top: "0",
				zIndex: 1000,
				backgroundColor: "#fff",
			}}
		>
			<div className="d-flex justify-content-between align-items-center border-bottom border-2 shadow p-3 w-100">
				<div className="d-flex gap-3 justify-content-between align-items-center w-100">
					<div className="w-50 d-flex gap-3">
						<CalendarButton />
						{isDeleteButtonVisible && (
							<DeleteButton onClick={handleDelete} />
						)}
						<Dropdown className="d-flex">
							<Dropdown.Toggle
								variant="light"
								id="dropdown-basic"
								className="border-0"
							>
								Toggle Columns
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{Object.keys(TrashData[0])
									.filter((column) => column !== "Number")
									.map((column: string) => (
										<Form.Check
											type="checkbox"
											id={column}
											label={column}
											checked={
												!hiddenColumns.includes(column)
											}
											onChange={() =>
												toggleColumn(column)
											}
											className="d-flex gap-2"
											style={{ marginLeft: "7px" }}
										/>
									))}
							</Dropdown.Menu>
						</Dropdown>
						<Form className="d-flex w-50">
							<Form.Control
								type="text"
								placeholder="Search"
								onChange={handleSearchChange}
							></Form.Control>
						</Form>
					</div>
					<div>
						<AddWaste />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrashTable;
