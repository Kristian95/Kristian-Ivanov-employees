import { getDatesDaysDiff } from "./getDatesDaysDiff";

export const checkDatesCrossing = (
	startDateX: number,
	startDateY: number,
	endDateX: number,
	endDateY: number
) => {
	const startDate = Math.max(startDateX, startDateY);
	const endDate = Math.min(endDateX, endDateY);

	return getDatesDaysDiff(startDate, endDate);
};
