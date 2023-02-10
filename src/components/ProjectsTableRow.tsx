import { compareEmployeesInProject } from "../utils/compareEmployeesInProject";
import { EmployeeData } from "../utils/types";

interface ProjectsTableRowProps {
	employees: EmployeeData[];
}

const ProjectsTableRow = ({ employees }: ProjectsTableRowProps) => {
	const { employeeOne, employeeTwo, max, projectId } = compareEmployeesInProject(
		Object.values(employees)
	);

	return (
		<tr>
			<td>{employeeOne}</td>
			<td>{employeeTwo}</td>
			<td>{projectId}</td>
			<td>{max > 0 ? max : "No collaboration"}</td>
		</tr>
	);
};

export default ProjectsTableRow;
