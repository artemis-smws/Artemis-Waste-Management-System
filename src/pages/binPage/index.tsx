import "./bin.scss";
import AdminChartCard from "../dashboardPage/components/adminChartCard";
import BinFrequencyChart from "../dashboardPage/components/binFrequencyChart";
import DropdownSelectDate from "../../components/dropdownDate";
import Sidebar from "../../components/layout/sidebar";
import { GeoAlt, InfoCircle, Trash3Fill, X } from "react-bootstrap-icons";
import React, { useState, useEffect, useRef, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	TrashContainerType,
	TrashbinContext,
} from "../../context/trashbinContext";

function setTrashbinStatus(trashPercentage: number) {
	if (trashPercentage >= 80) {
		return {
			badge: "danger",
			display: "Full",
		};
	}
	if (trashPercentage >= 50) {
		return {
			badge: "warning",
			display: "Almost",
		};
	} else {
		return {
			badge: "success",
			display: "Not full",
		};
	}
}

export default function Bin() {
	return (
		<div>
			<div className="d-flex">
				<Sidebar />
				<div className="vw-100 vh-100 overflow-hidden">
					<Header />
					<div
						className="h-100 w-100 d-flex flex-column align-items-center px-4 py-4 border"
						style={{ overflowY: "scroll" }}
					>
						<div className="w-100">
							<BinTable />
						</div>
						<div className="w-100 d-flex justify-content-between mt-3"></div>
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

	function addBinPopup(): void {
		setShowPopup(!showPopup);
	}

	function AddBinPopup() {
		if (!showPopup) {
			return null;
		}

		function handleFormSubmit() {
			toast.success("Adding bin done!!");
			setShowPopup(false); // Close the popup after clicking submit
		}

		return (
			<div className="popup">
				<div
					className="d-flex align-items-center justify-content-between"
					id="popup-title"
				>
					<h1>Add Trash Bin</h1>
					<button
						type="button"
						className="btn btn-close"
						onClick={togglePopup}
					></button>
				</div>
				<div
					className="d-flex flex-column align-items-center"
					id="tb-name"
				>
					<h1 className="mb-3">Trash bin name</h1>
					<select id="tb-select">
						<option value="1">Trash bin 1</option>
						<option value="2">Trash bin 2</option>
						<option value="3">Trash bin 3</option>
					</select>
				</div>
				<div
					className="d-flex flex-column align-items-center"
					id="tb-type"
				>
					<h1 className="mb-3">Trash bin type</h1>
					<select id="tb-type-select">
						<option value="1">Residual</option>
						<option value="2">Recycle</option>
						<option value="3">Food Waste</option>
					</select>
				</div>
				<div
					className="d-flex justify-content-center align-items-center"
					id="tb-submit"
				>
					<button
						type="button"
						className="btn"
						id="tb-submit-btn"
						onClick={handleFormSubmit}
					>
						SUBMIT
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="d-flex border-bottom border-2 shadow align-items-center justify-content-between ps-4 py-3 pe-4">
			<div>
				<ToastContainer />
				<p className="m-0 fw-bold fs-4">Trashbin dashboard</p>
				<div className="m-0 fs-6 d-flex align-items-center justify-content-evenly">
					<InfoCircle />
					<p className="m-0 ms-2 text-secondary">
						This is to be used for monitoring trash bin status and
						other data related to the IOT trash bins deployed
						through ArteMIS{" "}
					</p>
				</div>
			</div>
			<div className="d-flex justify-content-end align-items-center">
				<button
					type="button"
					className="w-auto btn btn-secondary d-flex justify-content-around align-items-center gap-2"
					id="add-bin"
					onClick={addBinPopup}
				>
					<Trash3Fill />
					Add Bin
				</button>
				<AddBinPopup />
			</div>
		</div>
	);
}

function ReportsArea() {
	return (
		<AdminChartCard width="40%" header="Reports">
			<div className="w-100 h-100 p-3">
				<div className="bg-tertiary-red border border-0 rounded px-4 py-2 mb-3">
					<div className="d-flex justify-content-between align-items-start">
						<p className="m-0 fw-semibold">Damaged Trash bin</p>
						<div
							style={{ fontSize: "13px" }}
							className="d-flex align-items-center m-0 "
						>
							<GeoAlt className="me-1" />
							<p className="m-0">CICS Building</p>
						</div>
					</div>
					<p className="m-0 mt-1">
						Cracks on the sides. Near the SSC office, first floor
					</p>
				</div>
				<div className="bg-tertiary-red border border-0 rounded px-4 py-2 mb-3">
					<div className="d-flex justify-content-between align-items-start">
						<p className="m-0 fw-semibold">Foul smell </p>
						<div
							style={{ fontSize: "13px" }}
							className="d-flex align-items-center m-0 "
						>
							<GeoAlt className="me-1" />
							Residual
							<p className="m-0">CEAFA Building</p>
						</div>
					</div>
					<p className="m-0 mt-1">
						Smells like rotten food. Near the canteen
					</p>
				</div>
			</div>
		</AdminChartCard>
	);
}

function BinTable() {
	const trashbinData: any = useContext(TrashbinContext);
	const [tableData, setTableData]: any = useState(Array<TrashContainerType>);
	useEffect(() => {
		console.log("Running...");
		if (trashbinData) {
			trashbinData.forEach((data: TrashContainerType) => {
				setTableData((prev: any) => {
					return [...prev, data];
				});
			});
		}
	}, [trashbinData]);
	return (
		<table className="table stable-striped table-bordered">
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Location</th>
					<th scope="col">Capacity (%)</th>
					<th scope="col">Type</th>
					<th scope="col">Frequency</th>
				</tr>
			</thead>
			<tbody className="table-group-divider">
				{tableData.map((data: TrashContainerType) => {
					return (
						<tr>
							<td>{data.id}</td>
							<td>{data.organization}</td>
							<td className="d-flex justify-content-between">
								{data.capacity}
								{
									<span
										className={
											"badge text-bg-" +
											setTrashbinStatus(data.capacity)
												.badge
										}
									>
										{
											setTrashbinStatus(data.capacity)
												.display
										}
									</span>
								}
							</td>
							<td>{data.type}</td>
							<td>{data.frequency}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
