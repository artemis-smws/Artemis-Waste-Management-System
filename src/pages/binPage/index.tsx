import AdminChartCard from "../dashboardPage/components/adminChartCard";
import BinFrequencyChart from "../dashboardPage/components/binFrequencyChart";
import DropdownSelectDate from "../../components/dropdownDate";
import Sidebar from "../../components/layout/sidebar";
import { BsGeoAlt, BsInfoCircle, BsTrash3Fill, BsX } from "react-icons/bs";
import React, { useState, useEffect, useRef, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	TrashContainerType,
	TrashbinContext,
} from "../../context/trashbinContext";
import * as Dialog from "@radix-ui/react-dialog";

function setTrashbinStatus(trashPercentage: number) {
	if (trashPercentage >= 80) {
		return {
			badge: "bg-red-500 text-white",
			display: "Full",
		};
	}
	if (trashPercentage >= 50) {
		return {
			badge: "bg-yellow-500 text-white",
			display: "Almost",
		};
	} else {
		return {
			badge: "bg-green-500 text-white",
			display: "Not full",
		};
	}
}

export default function Bin() {
	return (
		<div>
			<div className="flex">
				<Sidebar />
				<div className="w-screen h-screen overflow-hidden">
					<Header />
					<div
						className="h-full w-full flex flex-col items-center px-6 py-6 border-l border-gray-200 overflow-y-auto bg-gray-50"
					>
						<div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
							<BinTable />
						</div>
						<div className="w-full flex justify-between mt-6"></div>
						{/* <ReportsArea />
						<AdminChartCard
							width="56%"
							header="Bin Frequency Chart"
						>
							<BinFrequencyChart />
						</AdminChartCard> */}
					</div>
				</div>
			</div>
		</div>
	);
}

function Header() {
	const [showPopup, setShowPopup] = useState(false);

	function togglePopup() {
		setShowPopup(!showPopup);
	}

	function handleFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		toast.success("Adding bin done!!");
		setShowPopup(false);
	}

	return (
		<div className="flex border-b-2 border-gray-200 shadow-sm items-center justify-between pl-6 py-4 pr-6 bg-white">
			<div>
				<ToastContainer />
				<p className="m-0 font-bold text-2xl">Trashbin dashboard</p>
				<div className="text-sm flex items-center mt-1">
					<BsInfoCircle className="text-gray-500" />
					<p className="m-0 ml-2 text-gray-500">
						This is to be used for monitoring trash bin status and
						other data related to the IOT trash bins deployed
						through ArteMIS{" "}
					</p>
				</div>
			</div>
			<div className="flex justify-end items-center">
				<Dialog.Root open={showPopup} onOpenChange={setShowPopup}>
					<Dialog.Trigger asChild>
						<button
							type="button"
							className="flex items-center gap-2 bg-tertiary text-white shadow-sm rounded-md px-4 py-2 font-medium hover:bg-green-800 transition-colors"
						>
							<BsTrash3Fill />
							Add Bin
						</button>
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
						<Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[400px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white shadow-lg duration-200 sm:rounded-lg overflow-hidden p-6">
							<div
								className="flex items-center justify-between mb-4"
							>
								<Dialog.Title className="text-xl font-bold m-0 border-b border-gray-200 pb-2 flex-1">
									Add Trash Bin
								</Dialog.Title>
								<Dialog.Close asChild>
									<button
										type="button"
										className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
									>
										<BsX size={24} />
									</button>
								</Dialog.Close>
							</div>
							<form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
								<div className="flex flex-col gap-2">
									<label className="font-semibold text-sm">Trash bin name</label>
									<select className="w-full h-10 border border-[#a21111] rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#a21111]">
										<option value="1">Trash bin 1</option>
										<option value="2">Trash bin 2</option>
										<option value="3">Trash bin 3</option>
									</select>
								</div>
								<div className="flex flex-col gap-2">
									<label className="font-semibold text-sm">Trash bin type</label>
									<select className="w-full h-10 border border-[#a21111] rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-[#a21111]">
										<option value="1">Residual</option>
										<option value="2">Recycle</option>
										<option value="3">Food Waste</option>
									</select>
								</div>
								<div className="flex justify-center mt-4">
									<button
										type="submit"
										className="w-[140px] h-[45px] bg-[#a21111] text-white font-semibold rounded-md hover:bg-red-800 transition"
									>
										SUBMIT
									</button>
								</div>
							</form>
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
			</div>
		</div>
	);
}

function ReportsArea() {
	return (
		<AdminChartCard width="40%" header="Reports">
			<div className="w-full h-full p-4">
				<div className="bg-red-50 border-0 rounded-md px-4 py-3 mb-4 text-emerald-900">
					<div className="flex justify-between items-start">
						<p className="m-0 font-semibold">Damaged Trash bin</p>
						<div
							className="flex items-center text-sm"
						>
							<BsGeoAlt className="mr-1" />
							<p className="m-0">CICS Building</p>
						</div>
					</div>
					<p className="m-0 mt-2 text-sm text-gray-700">
						Cracks on the sides. Near the SSC office, first floor
					</p>
				</div>
				<div className="bg-red-50 border-0 rounded-md px-4 py-3 mb-4 text-emerald-900">
					<div className="flex justify-between items-start">
						<p className="m-0 font-semibold">Foul smell </p>
						<div
							className="flex flex-col items-end text-sm"
						>
							<span className="flex items-center text-xs bg-red-200 px-2 py-0.5 rounded text-red-800 mb-1">
								Residual
							</span>
							<div className="flex items-center">
								<BsGeoAlt className="mr-1" />
								<p className="m-0">CEAFA Building</p>
							</div>
						</div>
					</div>
					<p className="m-0 mt-2 text-sm text-gray-700">
						Smells like rotten food. Near the canteen
					</p>
				</div>
			</div>
		</AdminChartCard>
	);
}

function BinTable() {
	const trashbinData: any = useContext(TrashbinContext);
	const [tableData, setTableData] = useState<TrashContainerType[]>([]);
	useEffect(() => {
		console.log("Running...");
		if (trashbinData) {
			setTableData(trashbinData);
		}
	}, [trashbinData]);
	return (
		<table className="min-w-full divide-y divide-gray-200">
			<thead className="bg-gray-50">
				<tr>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity (%)</th>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{tableData.map((data: TrashContainerType, idx: number) => {
					return (
						<tr key={idx} className="hover:bg-gray-50">
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.id}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.organization}</td>
							<td className="px-6 py-4 whitespace-nowrap flex items-center justify-between text-sm text-gray-500">
								<span>{data.capacity}%</span>
								<span
									className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${setTrashbinStatus(data.capacity).badge}`}
								>
									{setTrashbinStatus(data.capacity).display}
								</span>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.type}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.frequency}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
