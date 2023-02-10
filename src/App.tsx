import { useState } from "react";
import "./App.css";
import ProjectsTable from "./components/ProjectsTable";
import FileUpload from "./components/FileUpload";
import { Projects } from "./utils/types";
import { getMostCombinedPair } from "./utils/getMostCombinedPair";

function App() {
	const [projects, setProjects] = useState<Projects | null>(null);
	const [colleaguesPair, setColleaguesPair] = useState<{
		employee: string;
		colleague: {
			employeeId: string;
			projects: string[];
			workedTogether: number;
		};
	} | null>(null);

	const setProjectsHandler = (
		projectsData: Projects,
		employees: string[]
	) => {
		setProjects(projectsData);
		setColleaguesPair(getMostCombinedPair(projectsData, employees));
	};

	return (
		<div className="App">
			<section className="section-details">
				<div className="section__head">
					<h1>
						Upload a valid csv file
					</h1>

					<FileUpload employeesHandler={setProjectsHandler} />
				</div>

				<div className="section__body">
					{colleaguesPair && (
						<>
							<h4>Pair that worked together the most:</h4>

							<ul>
								<li>{`Pair: ${colleaguesPair.employee} - ${colleaguesPair.colleague.employeeId}`}</li>

								<li>{`Projects: ${colleaguesPair.colleague.projects.join(
									", "
								)}`}</li>

								<li>{`Total number of days: ${colleaguesPair.colleague.workedTogether}`}</li>
							</ul>
						</>
					)}

					{projects && (
						<h2>
							Pair of employees who have worked together on single
							project for the longest time
						</h2>
					)}

					{projects && <ProjectsTable projects={projects} />}
				</div>
			</section>
		</div>
	);
}

export default App;
