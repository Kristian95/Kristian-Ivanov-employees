import { checkDatesCrossing } from "./checkDatesCrossing";
import { Projects } from "./types";

export const getMostCombinedPair = (
	projects: Projects,
	employees: string[]
) => {
	let employeesMap: {
		[key: string]: {
			[key: string]: {
				employeeId: string;
				projects: string[];
				workedTogether: number;
			};
		};
	} = {};

	employees.forEach((id) => {
		Object.entries(projects).forEach((project) => {
			if (!Object.keys(project[1]).includes(id)) return;

			const currEmployee = Object.values(project[1]).find(
				(employee) => id === employee.employeeId
			);

			if (!currEmployee) return;

			Object.values(project[1]).forEach((empData) => {
				if (empData.employeeId === id) return;

				const { dateFrom, dateTo, employeeId, projectId } = empData;
				const startDayX = currEmployee.dateFrom.getTime();
				const endDayX = currEmployee.dateTo.getTime();
				const startDayY = dateFrom.getTime();
				const endDayY = dateTo.getTime();
				const compareDatesResult = checkDatesCrossing(
					startDayX,
					startDayY,
					endDayX,
					endDayY
				);

				if (
					!employeesMap[employeeId] ||
					!employeesMap[employeeId][employeeId]
				) {
					employeesMap[employeeId] = {
						...employeesMap[employeeId],
						[employeeId]: {
							employeeId,
							projects: [projectId],
							workedTogether:
								compareDatesResult > 0 ? compareDatesResult : 0,
						},
					};
				} else {
					employeesMap[employeeId][employeeId].projects.push(projectId);
					employeesMap[employeeId][employeeId].workedTogether +=
						compareDatesResult > 0 ? compareDatesResult : 0;
				}
			});
		});
	});

	const sortedEmployees = Object.entries(employeesMap).map((employeeData) => {
		return {
			employee: employeeData[0],
			colleague: Object.entries(employeeData[1]).sort((a, b) => {
				return b[1].workedTogether - a[1].workedTogether;
			})[0][1],
		};
	});

	return Object.entries(sortedEmployees).sort((a, b) => {
		return b[1].colleague.workedTogether - a[1].colleague.workedTogether;
	})[0][1];
};
