import { createContext } from "react";

export type TrashContainerType = {
	type: string;
	organization: string;
	location: {
		latitude: number;
		longitude: number;
	};
	id: string;
	capacity : number;
	frequency ?: number;
};

export const TrashbinContext = createContext(Array<TrashContainerType>)