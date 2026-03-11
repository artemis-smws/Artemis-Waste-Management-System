import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Dialog from "@radix-ui/react-dialog";
import { BsInfoCircle, BsTrash3Fill, BsX, BsChevronRight, BsChevronLeft } from "react-icons/bs";
import {
	TrashContainerType,
	TrashbinContext,
} from "../../../context/trashbinContext";

interface BinSidebarProps {
	isOpen: boolean;
	onToggle: () => void;
}

function setTrashbinStatus(trashPercentage: number) {
	if (trashPercentage >= 75) {
		return {
			badge: "bg-red-500/10 text-red-600 border border-red-500/30",
			display: "Critical",
		};
	}
	if (trashPercentage >= 40) {
		return {
			badge: "bg-amber-500/10 text-amber-600 border border-amber-500/30",
			display: "Moderate",
		};
	} else {
		return {
			badge: "bg-[#00cb6a]/10 text-[#00cb6a] border border-[#00cb6a]/30",
			display: "Normal",
		};
	}
}

export default function BinSidebar({ isOpen, onToggle }: BinSidebarProps) {
	return (
		<>
			{/* Toggle Button */}
			<button
				onClick={onToggle}
				className={`absolute top-1/2 -translate-y-1/2 z-[1000] bg-white border border-gray-200 shadow-md p-2 rounded-l-md hover:bg-gray-50 transition-all duration-300 ${
					isOpen ? "right-[400px]" : "right-0"
				}`}
				aria-label={isOpen ? "Close Bins Sidebar" : "Open Bins Sidebar"}
			>
				{isOpen ? <BsChevronRight size={20} className="text-gray-600" /> : <BsChevronLeft size={20} className="text-gray-600" />}
			</button>

			{/* Sidebar Panel */}
			<div
				className={`absolute top-0 right-0 h-full bg-white shadow-[-4px_0_20px_rgba(0,0,0,0.1)] z-[999] transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-200 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
				style={{ width: "400px" }}
			>
				<Header />
				<div className="flex-1 overflow-y-auto bg-gray-50 p-4">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
						<BinTable />
					</div>
				</div>
			</div>
		</>
	);
}

function Header() {
	const [showPopup, setShowPopup] = useState(false);

	function handleFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		toast.success("Bin added successfully.");
		setShowPopup(false);
	}

	return (
		<div className="border-b border-gray-200 bg-white p-4 shrink-0 flex flex-col gap-3">
			<ToastContainer />
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold tracking-tight text-[#171717] m-0">Trash Bins</h2>
				<Dialog.Root open={showPopup} onOpenChange={setShowPopup}>
					<Dialog.Trigger asChild>
						<button
							type="button"
							className="flex items-center gap-1.5 bg-[#216604] hover:bg-[#62A944] text-white rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
						>
							<BsTrash3Fill size={14} />
							Add Bin
						</button>
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay className="fixed inset-0 bg-black/45 z-[200] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
						<Dialog.Content className="fixed left-[50%] top-[50%] z-[201] grid w-full max-w-[400px] translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white shadow-lg sm:rounded-lg overflow-hidden p-6 duration-200">
							<div className="flex items-center justify-between mb-2">
								<Dialog.Title className="text-lg font-semibold tracking-tight text-[#171717] m-0 flex-1">
									Add Trash Bin
								</Dialog.Title>
								<Dialog.Close asChild>
									<button
										type="button"
										className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
									>
										<BsX size={20} />
									</button>
								</Dialog.Close>
							</div>
							<form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
								<div className="flex flex-col gap-1.5">
									<label className="text-sm font-medium text-gray-700">Trash bin name</label>
									<select className="w-full h-10 border border-gray-300 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#62A944]/45 bg-white text-gray-800">
										<option value="1">Trash bin 1</option>
										<option value="2">Trash bin 2</option>
										<option value="3">Trash bin 3</option>
									</select>
								</div>
								<div className="flex flex-col gap-1.5">
									<label className="text-sm font-medium text-gray-700">Trash bin type</label>
									<select className="w-full h-10 border border-gray-300 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#62A944]/45 bg-white text-gray-800">
										<option value="1">Residual</option>
										<option value="2">Recycle</option>
										<option value="3">Food Waste</option>
									</select>
								</div>
								<div className="flex justify-end mt-2">
									<button
										type="submit"
										className="bg-[#216604] hover:bg-[#62A944] text-white font-medium rounded-md px-4 py-2 transition-colors text-sm"
									>
										Submit
									</button>
								</div>
							</form>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			</div>
			<div className="flex items-start gap-2 text-xs text-gray-500">
				<BsInfoCircle className="mt-0.5 shrink-0" size={14} />
				<p className="m-0 leading-relaxed">
					Monitor status and IoT data of deployed ArteMIS trash bins.
				</p>
			</div>
		</div>
	);
}

function BinTable() {
	const trashbinData: any = useContext(TrashbinContext);
	const [tableData, setTableData] = useState<TrashContainerType[]>([]);
	
	useEffect(() => {
		if (trashbinData) {
			setTableData(trashbinData);
		}
	}, [trashbinData]);

	return (
		<div className="overflow-x-auto">
			<table className="w-full divide-y divide-gray-200 text-left">
				<thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">
					<tr>
						<th scope="col" className="px-4 py-3">ID</th>
						<th scope="col" className="px-4 py-3">Loc</th>
						<th scope="col" className="px-4 py-3">Fill</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{tableData.length === 0 ? (
						<tr>
							<td colSpan={3} className="px-4 py-8 text-center text-sm text-gray-500">
								No bins found.
							</td>
						</tr>
					) : (
						tableData.map((data: TrashContainerType, idx: number) => {
							const status = setTrashbinStatus(data.capacity);
							return (
								<tr key={idx} className="hover:bg-gray-50 transition-colors group">
									<td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-[#216604] transition-colors">
										{data.id}
									</td>
									<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 truncate max-w-[120px]" title={data.organization}>
										{data.organization}
									</td>
									<td className="px-4 py-3 whitespace-nowrap flex items-center gap-2">
										<span className="font-mono text-sm font-medium text-gray-700 w-8">{data.capacity}%</span>
										<span className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${status.badge}`}>
											{status.display}
										</span>
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
}
