import { checkDatesCrossing } from "./checkDatesCrossing";
import { EmployeeData } from "./types";

export const compareEmployeesInProject = (employees: EmployeeData[]) => {
	let max: number = 0,
		employeeOne: string = "",
		employeeTwo: string = "",
		projectId: string = "";

	employees.forEach((firstEmployee, i) => {
		for (let k = i + 1; k < employees.length; k++) {
			const secondEmployee = employees[k];

			if (firstEmployee.projectId !== secondEmployee.projectId) break;

			const startDayX = firstEmployee.dateFrom.getTime();
			const endDayX = firstEmployee.dateTo.getTime();
			const startDayY = secondEmployee.dateFrom.getTime();
			const endDayY = secondEmployee.dateTo.getTime();
			const compareDatesResult = checkDatesCrossing(
				startDayX,
				startDayY,
				endDayX,
				endDayY
			);

			if (max < compareDatesResult) {
				max = compareDatesResult;
				employeeOne = firstEmployee.employeeId;
				employeeTwo = secondEmployee.employeeId;
				projectId = firstEmployee.projectId;
			} else if (employees.length === k + 1 && max <= 0) {
				employeeOne = firstEmployee.employeeId;
				employeeTwo = secondEmployee.employeeId;
				projectId = firstEmployee.projectId;
			}
		}
	});

	return { max, employeeOne, employeeTwo, projectId };
};
