import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyDatePicker from "./DatePicker";
import "../styles/AddWaste.scss";
import { Form, Button } from "react-bootstrap";
import { LuCalendarDays } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFetch from "../../../hooks/useFetch";
import getBuidlingNames from "../../dashboardPage/utils/getBuildingNames";

const AddWaste = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [weight, setWeight] = useState(0);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [building, setBuilding] = useState("CEAFA");
	const [wasteType, setWasteType] = useState("biodegradable");
	const [buildingList, setBuildingList] = useState(["CEAFA", "SSC", " CIT"]);
	useEffect(() => {
		useFetch('waste/latest', "buildingNames")
			.then((res) => {
				const buildingNames = getBuidlingNames(res)
				setBuildingList(buildingNames)
			})
			.catch((e : any) => {
				console.log(e.message)
			})
	}, [])
	const handleSubmit = () => {
		setIsOpen(false);
		if (weight === 0 || selectedDate === null) {
			toast.error("Please fill out the form. ", {
				position: "bottom-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			return;
		}
		const newDate = selectedDate
			?.toLocaleString("en-US", {
				timeZone: "Asia/Manila",
				year: "2-digit",
				month: "2-digit",
				day: "numeric",
			})
			.split("/");
		useFetch(`waste/${newDate[0]}-${newDate[1]}-${newDate[2]}`, "latest")
			.then((data) => {
				const latestData = data[0][building];
				const biodegradable = latestData.weight.biodegradable
					? latestData.weight.biodegradable
					: weight;
				const recyclable = latestData.weight.recyclable.total
					? latestData.weight.recyclable.total
					: weight;
				const residual = latestData.weight.residual
					? latestData.weight.residual
					: weight;
				const infectious = latestData.weight.infectious
					? latestData.weight.infectious
					: weight;
				fetch(
					`${import.meta.env.VITE_API_URL}waste/${newDate[0]}-${
						newDate[1]
					}-${newDate[2]}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							building_name: building,
							campus: latestData.campus,
							weight: {
								biodegradable: biodegradable,
								recyclable: {
									total: recyclable,
								},
								residual: residual,
								infectious: infectious,
								total:
									biodegradable +
									recyclable +
									residual +
									infectious,
							},
							date: `${newDate[0]}-${newDate[1]}-${newDate[2]}`,
						}),
					}
				);
			})
			.then(() => {
				toast.success("Data added successfully. ", {
					position: "bottom-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			})
			.catch((error) => {
				error instanceof Error &&
					console.error("Error:", error.message);
				console.log("Error: ", error);
				toast.error("Error adding data. ", {
					position: "bottom-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			});
	};

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWeight(Number(event.target.value));
	};
	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
	};

	return (
		<>
			<button
				type="button"
				className="btn btn-success"
				onClick={handleOpen}
			>
				Add Waste
			</button>
			{isOpen && (
				<div className="add-card">
					<div className="add-card-content d-flex flex-column justify-content-between align-items-center">
						<div className="header w-100 p-3 d-flex justify-content-start align-items-center">
							<h1 className="m-0">Add Waste</h1>
						</div>
						<Form className="input-section w-100 h-100 d-flex flex-column justify-content-around px-3">
							<div>
								<div className="d-flex justify-content-center align-items-center gap-3">
									<div>
										<Form.Label>Building</Form.Label>
										<Form.Select
											onChange={(e: any) => {
												setBuilding(e.target.value);
											}}
											className="add-waste-input d-flex justify-content-between align-items-center"
										>
											{buildingList.map(
												(building: string) => {
													return (
														<option value={building}>
															{building}
														</option>
													);
												}
											)}
										</Form.Select>
									</div>
									<div>
										<Form.Label>Date</Form.Label>
										<div className="row">
											<div className="col">
												<div className="date-picker-wrapper">
													<div className="row">
														<div className="col">
															<div className="date-picker-wrapper">
																<DatePicker
																	selected={
																		selectedDate
																	}
																	onChange={
																		handleDateChange
																	}
																	className="form-control"
																/>
																<span className="date-picker-icon">
																	<LuCalendarDays />
																</span>
															</div>
														</div>
													</div>
													<span className="date-picker-icon">
														<LuCalendarDays />
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex justify-content-start flex-column mt-3">
									<Form.Label>Type of Waste</Form.Label>
									<Form.Select
										onChange={(e: any) => {
											setWasteType(e.target.value);
										}}
										className="add-waste-input d-flex justify-content-between align-items-center"
									>
										<option value="biodegradable">
											Biodegredable
										</option>
										<option value="recyclable">
											Recyclable
										</option>
										<option value="residual">
											Residual
										</option>
										<option value="infectious">
											Infectious
										</option>
									</Form.Select>
									<div className="mt-3">
										<Form.Label>Weight</Form.Label>
										<Form.Control
											min={0}
											type="number"
											className="weight-input"
											value={weight}
											onChange={handleWeightChange}
										></Form.Control>
									</div>
								</div>
							</div>
							<div className="d-flex justify-content-end align-items-center w-100">
								<Button
									type="button"
									className="btn btn-secondary m-1"
									onClick={handleClose}
								>
									Close
								</Button>
								<Button
									type="submit"
									className="btn btn-success m-1"
									onClick={handleSubmit}
								>
									Confirm
								</Button>
							</div>
						</Form>
					</div>
				</div>
			)}

			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</>
	);
};

export default AddWaste;
