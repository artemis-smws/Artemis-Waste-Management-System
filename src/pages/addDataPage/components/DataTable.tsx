import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { TrashData } from "./TableData";
import DeleteButton from "./DeleteButton";
import CalendarButton from "./Calendar";
import AddWaste from "./AddWaste";
import useFetch from "../../../hooks/useFetch";
import LoadingPage from "../../../components/loadingPage";
import getBuidlingNames from "../../dashboardPage/utils/getBuildingNames";
import getWeight from "../utils/getWeight";
import { toast } from "react-toastify";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsThreeDotsVertical, BsFilterLeft } from "react-icons/bs";

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

	const handleDeleteRow = (row: DataRow) => {
		console.log(row);
		const latestDataString = localStorage.getItem("7days");
		const latestData = latestDataString ? JSON.parse(latestDataString)[0] : null;
		if (!latestData) return;
		const biodegradable =
			row.WasteType === "biodegradable"
				? 0
				: latestData[row.Building].weight.biodegradable;
		const recyclable =
			row.WasteType === "recyclable"
				? { total: 0 }
				: latestData[row.Building].weight.recyclable.total;
		const residual =
			row.WasteType === "residual"
				? 0
				: latestData[row.Building].weight.residual;
		const infectious =
			row.WasteType === "infectious"
				? 0
				: latestData[row.Building].weight.infectious;
		fetch(
			`${import.meta.env.VITE_API_URL}waste/reset-current/${row.Date}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					building_name: row.Building,
					campus: latestData[row.Building].campus,
					waste_type: {
						biodegradable: row.WasteType === biodegradable,
						recyclable: row.WasteType === recyclable,
						residual: row.WasteType === residual,
						infectious: row.WasteType === infectious,
						total:
							biodegradable + recyclable + residual + infectious,
					},
				}),
			}
		)
			.then((res: any) => {
				if (res.status !== 200) {
					throw new Error("Data not deleted successfully. ");
				}
				toast.success("Data deleted successfully. ", {
					position: "bottom-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
				console.log(res);
			})
			.catch((e: any) => {
				toast.error("Data not deleted successfully. ", {
					position: "bottom-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
				console.log(e.message);
			});
	};

	const handleUpdateRow = (row: DataRow) => {
		console.log(row);
	};

	const CustomDropdown: React.FC<CustomDropdownProps> = ({ row }) => (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-tertiary">
					<BsThreeDotsVertical />
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content className="min-w-[120px] bg-white rounded-md shadow-lg border border-gray-200 p-1 flex flex-col z-50">
					<DropdownMenu.Item
						className="px-3 py-2 text-sm cursor-pointer hover:bg-red-50 hover:text-red-700 text-red-600 rounded outline-none"
						onClick={() => handleDeleteRow(row)}
					>
						Delete
					</DropdownMenu.Item>
					<DropdownMenu.Item
						className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded outline-none"
						onClick={() => handleUpdateRow(row)}
					>
						Update
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
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
					"total",
				];
				const staged: DataRow[] = [];
				res.forEach((response: any) => {
					const buildingList = Object.keys(response).filter((key) => {
						return (
							key != "createdAt" &&
							key != "overall_biodegradable" &&
							key != "overall_recyclable" &&
							key != "overall_residual" &&
							key != "overall_infectious" &&
							key != "overall_weight" &&
							key != "id" &&
							key
						);
					});
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
		<div className="flex flex-col relative h-full min-h-screen overflow-hidden">
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
			<div className="flex-1 overflow-auto w-full">
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

	return (
		<div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
			<div className="flex justify-between items-center p-4 w-full">
				<div className="flex gap-4 justify-between items-center w-full">
					<div className="w-1/2 flex items-center gap-4">
						<CalendarButton />
						{isDeleteButtonVisible && (
							<DeleteButton onClick={handleDelete} />
						)}
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild>
								<button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-tertiary text-sm font-medium">
									<BsFilterLeft className="text-lg" />
									Toggle Columns
								</button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Portal>
								<DropdownMenu.Content className="min-w-[150px] bg-white rounded-md shadow-lg border border-gray-200 p-2 flex flex-col gap-1 z-50">
									{Object.keys(TrashData[0] || {})
										.filter((column) => column !== "Number")
										.map((column: string) => (
											<label
												key={column}
												className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-50 rounded"
											>
												<input
													type="checkbox"
													checked={!hiddenColumns.includes(column)}
													onChange={() => toggleColumn(column)}
													className="rounded border-gray-300 text-tertiary focus:ring-tertiary"
												/>
												{column}
											</label>
										))}
								</DropdownMenu.Content>
							</DropdownMenu.Portal>
						</DropdownMenu.Root>
						<form className="flex w-1/2" onSubmit={(e) => e.preventDefault()}>
							<input
								type="text"
								placeholder="Search"
								onChange={handleSearchChange}
								className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
							/>
						</form>
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
