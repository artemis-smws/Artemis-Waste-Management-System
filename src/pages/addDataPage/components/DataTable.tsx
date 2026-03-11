import React, { useState, useEffect } from "react";
import DataTable, { TableStyles } from "react-data-table-component";
import { TrashData } from "./TableData";
import DeleteButton from "./DeleteButton";
import CalendarButton from "./Calendar";
import AddWaste from "./AddWaste";
import useFetch from "../../../hooks/useFetch";
import getBuidlingNames from "../../dashboardPage/utils/getBuildingNames";
import getWeight from "../utils/getWeight";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsFilterLeft, BsSearch, BsPencil, BsTrash, BsCheck, BsX } from "react-icons/bs";

interface DataRow {
	Date: string;
	Building: string;
	WasteType: string;
	Weight: number;
}

interface Table1Props {
	setIsDeleteButtonVisible: (isVisible: boolean) => void;
}

const TrashTable: React.FC<Table1Props> = ({ setIsDeleteButtonVisible }) => {
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
	const [isDeleteButtonVisible, setIsDeleteButtonVisibleLocal] =
		useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [wasteData, setWasteData] = useState<DataRow[]>([]);
	const [loading, setLoading] = useState(false);
	const [updateRowId, setUpdateRowId] = useState<string | null>(null);
	const [updateWeightValue, setUpdateWeightValue] = useState<number>(0);

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

	const handleUpdateClick = (row: DataRow) => {
		setUpdateRowId(`${row.Date}-${row.Building}-${row.WasteType}`);
		setUpdateWeightValue(row.Weight);
	};

	const handleSaveUpdate = (row: DataRow) => {
		const newData = wasteData.map((r) => {
			if (`${r.Date}-${r.Building}-${r.WasteType}` === `${row.Date}-${row.Building}-${row.WasteType}`) {
				return { ...r, Weight: updateWeightValue };
			}
			return r;
		});
		setWasteData(newData);
		setUpdateRowId(null);
		toast.success("Data updated successfully.", {
			position: "bottom-right",
			autoClose: 3000,
			theme: "dark",
		});
		console.log(`Updated row:`, row, `New Weight:`, updateWeightValue);
	};

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
			cell: (row: DataRow) => {
				const rowId = `${row.Date}-${row.Building}-${row.WasteType}`;
				if (updateRowId === rowId) {
					return (
						<div className="flex items-center w-[100px]">
							<Input
								type="number"
								min="0"
								step="0.5"
								value={updateWeightValue}
								onChange={(e) => setUpdateWeightValue(parseFloat(e.target.value) || 0)}
								className="h-8 text-center font-mono hide-arrow"
							/>
						</div>
					);
				}
				return <span className="font-mono">{row.Weight}</span>;
			},
		},
		{
			name: "Actions",
			cell: (row: DataRow) => {
				const rowId = `${row.Date}-${row.Building}-${row.WasteType}`;
				const isUpdating = updateRowId === rowId;

				if (isUpdating) {
					return (
						<div className="flex gap-2">
							<button
								onClick={() => handleSaveUpdate(row)}
								className="p-1.5 text-green-600 hover:bg-green-50 rounded"
								title="Save"
							>
								<BsCheck className="w-5 h-5" />
							</button>
							<button
								onClick={() => setUpdateRowId(null)}
								className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"
								title="Cancel"
							>
								<BsX className="w-5 h-5" />
							</button>
						</div>
					);
				}

				return (
					<div className="flex gap-2">
						<button
							onClick={() => handleUpdateClick(row)}
							className="p-1.5 text-[#3b82f6] hover:bg-blue-50 rounded"
							title="Update"
						>
							<BsPencil className="w-4 h-4" />
						</button>
						<button
							onClick={() => handleDeleteRow(row)}
							className="p-1.5 text-[#ef4444] hover:bg-red-50 rounded"
							title="Delete"
						>
							<BsTrash className="w-4 h-4" />
						</button>
					</div>
				);
			},
			button: true,
			ignoreRowClick: true,
			allowOverflow: true,
			buttonStyle: {
				padding: "0.25rem 0.5rem",
				minWidth: "unset",
			},
		},
	];

	const customTableStyles: TableStyles = {
		headRow: {
			style: {
				backgroundColor: "var(--color-light)",
				color: "var(--color-text-muted)",
				fontSize: "0.75rem",
				fontWeight: 600,
				textTransform: "uppercase",
				letterSpacing: "0.05em",
				borderBottomWidth: "1px",
				borderBottomColor: "var(--color-border)",
				minHeight: "48px",
			},
		},
		rows: {
			style: {
				fontSize: "0.875rem",
				color: "var(--color-text-base)",
				backgroundColor: "#ffffff",
				minHeight: "56px",
				'&:hover': {
					backgroundColor: "#f9fafb",
				},
				borderBottomColor: "var(--color-border)",
			},
		},
		pagination: {
			style: {
				borderTopWidth: "1px",
				borderTopColor: "var(--color-border)",
				backgroundColor: "#ffffff",
				color: "var(--color-text-base)",
			},
		},
	};

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

	return (
		<div className="flex flex-col relative h-full w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
					customStyles={customTableStyles}
					progressPending={loading}
					progressComponent={
						<div className="w-full h-96 flex flex-col justify-center gap-4 p-8">
							{[...Array(5)].map((_, i) => (
								<div key={i} className="flex gap-4">
									<div className="h-8 bg-gray-200 rounded animate-pulse w-1/4"></div>
									<div className="h-8 bg-gray-200 rounded animate-pulse w-1/4"></div>
									<div className="h-8 bg-gray-200 rounded animate-pulse w-1/4"></div>
									<div className="h-8 bg-gray-200 rounded animate-pulse w-1/4"></div>
								</div>
							))}
						</div>
					}
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
		<div className="z-10 bg-white border-b border-gray-200 p-4">
			<div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center w-full">
				<div className="flex items-center gap-3 w-full md:w-auto">
					<form className="relative flex-1 md:w-64" onSubmit={(e) => e.preventDefault()}>
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<BsSearch className="text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Search entries..."
							onChange={handleSearchChange}
							className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#216604] focus:border-[#216604] sm:text-sm transition-colors"
						/>
					</form>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#216604] text-sm font-medium text-gray-700 transition-colors shrink-0">
								<BsFilterLeft className="text-lg text-gray-500" />
								<span>Columns</span>
							</button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Portal>
							<DropdownMenu.Content className="min-w-[180px] bg-white rounded-md shadow-panel border border-gray-200 p-2 flex flex-col gap-1 z-50 animate-in fade-in-80 slide-in-from-top-1">
								{Object.keys(TrashData[0] || {})
									.filter((column) => column !== "Number")
									.map((column: string) => (
										<label
											key={column}
											className="flex items-center gap-3 px-2 py-2 text-sm cursor-pointer hover:bg-gray-50 rounded select-none text-gray-700"
										>
											<input
												type="checkbox"
												checked={!hiddenColumns.includes(column)}
												onChange={() => toggleColumn(column)}
												className="rounded border-gray-300 text-[#216604] focus:ring-[#216604] h-4 w-4"
											/>
											{column}
										</label>
									))}
							</DropdownMenu.Content>
						</DropdownMenu.Portal>
					</DropdownMenu.Root>
					<CalendarButton />
					{isDeleteButtonVisible && (
						<DeleteButton onClick={handleDelete} />
					)}
				</div>
				<div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 flex justify-end">
					<AddWaste />
				</div>
			</div>
		</div>
	);
};

export default TrashTable;
