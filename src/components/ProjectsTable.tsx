import { Fragment } from "react";
import { Projects } from "../utils/types";
import ProjectsTableRow from "./ProjectsTableRow";

interface ProjectsTableProps {
	projects: Projects;
}

const ProjectsTable = ({ projects }: ProjectsTableProps) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Employee ID #1</th>

					<th>Employee ID #2</th>

					<th>Project ID</th>

					<th>Days worked</th>
				</tr>
			</thead>

			<tbody>
				{Object.values(projects).map((project, index) =>
					Object.keys(project).length > 1 ? (
						<ProjectsTableRow
							employees={Object.values(project)}
							key={index}
						/>
					) : (
						<Fragment key={index}></Fragment>
					)
				)}
			</tbody>
		</table>
	);
};

export default ProjectsTable;
