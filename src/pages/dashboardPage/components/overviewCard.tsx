import { useContext, useEffect, useState } from "react";
import { GraphDownArrow, GraphUpArrow } from "react-bootstrap-icons";
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
			className="bg-light d-flex justify-content-center align-items-center border border-3 rounded mb-4"
			style={{ width: "80%" }}
		>
			{/* Lowest Highest Average UI */}
			<div
				style={{ color: "red" }}
				className="d-flex flex-column justify-content-center align-items-center"
				id="highest"
			>
				<h5 className="d-flex align-items-center">
					<GraphUpArrow className="me-2" />
					Highest
				</h5>
				<h3>
					{highest_weight.weight <= 0 && highest_weight.day == ""
						? "N/A"
						: highest_weight.weight + " kg"}
				</h3>
				<h5>
					{highest_weight.day.length <= 0 ? "" : highest_weight.day}
				</h5>
			</div>
			<div
				style={{ color: "green" }}
				className="d-flex flex-column justify-content-center align-items-center"
				id="lowest"
			>
				<h5 className="d-flex align-items-center">
					<GraphDownArrow className="me-2" />
					Lowest
				</h5>
				<h3>
					{lowest_weight.weight <= 0 && highest_weight.day == ""
						? "N/A"
						: lowest_weight.weight + " kg"}
				</h3>
				<h5>
					{lowest_weight.day.length <= 0 ? "" : lowest_weight.day}
				</h5>
			</div>
			<div
				style={{ color: "grey" }}
				className="d-flex flex-column justify-content-center align-items-center"
				id="average"
			>
				<h5 className="d-flex align-items-center">Average</h5>
				<h3>{average <= 0 ? "N/A" : average.toPrecision(4) + " kg"}</h3>
			</div>
		</div>
	);
}
