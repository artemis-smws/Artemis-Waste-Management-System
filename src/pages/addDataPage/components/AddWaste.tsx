import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyDatePicker from "./DatePicker";
import { LuCalendarDays } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFetch from "../../../hooks/useFetch";
import getBuidlingNames from "../../dashboardPage/utils/getBuildingNames";
import * as Dialog from "@radix-ui/react-dialog";

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
	const handleSubmit = (e?: React.FormEvent) => {
		if (e) e.preventDefault();
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
    if(!newDate) return;
		useFetch(`waste/${newDate[0]}-${newDate[1]}-${newDate[2]}`, "latest")
			.then((data) => {
				const latestData = data[0][building];
				const biodegradable = latestData.weight.biodegradable + (wasteType === 'biodegradable')? weight : latestData.weight.biodegradable ;
				const recyclable = latestData.weight.recyclable.total + (wasteType === 'recyclable')? weight : latestData.weight.recyclable.total ;
				const residual = latestData.weight.residual + (wasteType === 'residual')? weight : latestData.weight.residual ;
				const infectious = latestData.weight.infectious + (wasteType === 'infectious')? weight : latestData.weight.infectious ;
				console.log(`weight: ${weight}`)
				console.log(`biodegredable: ${biodegradable}, recyclable: ${recyclable}, residual: ${residual}, infectious: ${infectious}`)
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

	const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWeight(Number(event.target.value));
	};
	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
	};

	return (
		<>
			<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
				<Dialog.Trigger asChild>
					<button className="bg-success text-white px-4 py-2 rounded shadow-sm hover:bg-green-700 transition font-medium">
						Add Waste
					</button>
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
					<Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[512px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white shadow-lg duration-200 sm:rounded-lg overflow-hidden">
						<div className="bg-[#216604] px-6 py-4 flex items-center">
							<Dialog.Title className="text-xl font-medium text-white m-0 tracking-wide font-inter">
								Add Waste
							</Dialog.Title>
						</div>
						<form className="bg-gray-100 flex flex-col p-6 space-y-6" onSubmit={handleSubmit}>
							
							<div className="flex gap-4 w-full">
								<div className="flex-1 space-y-2">
									<label className="text-sm font-medium text-gray-700">Building</label>
									<select
										onChange={(e) => setBuilding(e.target.value)}
										className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
									>
										{buildingList.map((bldg: string, idx: number) => (
											<option key={idx} value={bldg}>{bldg}</option>
										))}
									</select>
								</div>
								
								<div className="flex-1 space-y-2">
									<label className="text-sm font-medium text-gray-700">Date</label>
									<div className="relative w-full">
										<DatePicker
											selected={selectedDate}
											onChange={handleDateChange}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
										/>
										<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
											<LuCalendarDays />
										</span>
									</div>
								</div>
							</div>

							<div className="flex flex-col space-y-2">
								<label className="text-sm font-medium text-gray-700">Type of Waste</label>
								<select
									onChange={(e) => setWasteType(e.target.value)}
									className="w-[256px] px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
								>
									<option value="biodegradable">Biodegredable</option>
									<option value="recyclable">Recyclable</option>
									<option value="residual">Residual</option>
									<option value="infectious">Infectious</option>
								</select>
							</div>

							<div className="flex flex-col space-y-2">
								<label className="text-sm font-medium text-gray-700">Weight</label>
								<input
									min={0}
									type="number"
									className="w-[138px] px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent"
									value={weight}
									onChange={handleWeightChange}
								/>
							</div>

							<div className="flex justify-end gap-3 mt-4 w-full">
								<Dialog.Close asChild>
									<button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition font-medium min-w-[80px]">
										Close
									</button>
								</Dialog.Close>
								<button type="submit" className="px-4 py-2 bg-success text-white rounded-md hover:bg-green-700 transition font-medium min-w-[80px]">
									Confirm
								</button>
							</div>
						</form>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>

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
