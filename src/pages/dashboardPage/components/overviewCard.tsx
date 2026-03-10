import { useContext, useEffect, useState } from "react";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import calculateAverage from "../utils/calculateAverage";
import { WasteDataContext } from "../../../context/wasteDataContext";
import TimestampToString from "../utils/timestampToString";
import useFetch from "../../../hooks/useFetch";
import findHighest from "../utils/findHighest";
import findLowest from "../utils/findLowest";
import calculateOverallAverage from "../utils/calculateOverallAverge";

export default function OverviewCard() {
	const [highest_weight, setHighest] = useState({ weight: 0, day: "" });
	const [lowest_weight, setLowest] = useState({ weight: 0, day: "" });
	const [average, setAverage] = useState(0);

	const contextData = useContext(WasteDataContext);
	useEffect(() => {
		if(Array.isArray(contextData)) {
      const temp_highest : any = findHighest(contextData);
      const temp_lowest : any = findLowest(contextData);
      const temp_average : number = calculateOverallAverage(contextData)
      setHighest({
        weight: temp_highest.overall_weight,
        day: TimestampToString(temp_highest.createdAt)
      });
      setLowest({
        weight: temp_lowest.overall_weight,
        day: TimestampToString(temp_lowest.createdAt)
      });
		  setAverage(temp_average)
		}
	}, [contextData]);

	return (
		<div
			className="bg-white flex justify-center items-center border border-gray-200 rounded-lg mb-6 shadow-sm py-8 gap-24"
			style={{ width: "80%" }}
		>
			{/* Lowest Highest Average UI */}
			<div
				className="flex flex-col justify-center items-center text-red-600"
				id="highest"
			>
				<h5 className="flex items-center text-lg font-medium mb-2">
					<BsGraphUpArrow className="mr-2" />
					Highest
				</h5>
				<h3 className="text-3xl font-bold mb-1">
					{highest_weight.weight <= 0 && highest_weight.day == ""
						? "N/A"
						: highest_weight.weight + " kg"}
				</h3>
				<h5 className="text-sm font-medium text-gray-500">
					{highest_weight.day.length <= 0 ? "" : highest_weight.day}
				</h5>
			</div>
			<div
				className="flex flex-col justify-center items-center text-emerald-600"
				id="lowest"
			>
				<h5 className="flex items-center text-lg font-medium mb-2">
					<BsGraphDownArrow className="mr-2" />
					Lowest
				</h5>
				<h3 className="text-3xl font-bold mb-1">
					{lowest_weight.weight <= 0 && highest_weight.day == ""
						? "N/A"
						: lowest_weight.weight + " kg"}
				</h3>
				<h5 className="text-sm font-medium text-gray-500">
					{lowest_weight.day.length <= 0 ? "" : lowest_weight.day}
				</h5>
			</div>
			<div
				className="flex flex-col justify-center items-center text-gray-500"
				id="average"
			>
				<h5 className="flex items-center text-lg font-medium mb-2">Average</h5>
				<h3 className="text-3xl font-bold text-gray-700">
					{average <= 0 ? "N/A" : average.toPrecision(4) + " kg"}
				</h3>
			</div>
		</div>
	);
}
