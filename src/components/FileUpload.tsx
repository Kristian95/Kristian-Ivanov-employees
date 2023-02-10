import { Projects } from "../utils/types";

interface FileUploadProps {
	employeesHandler: (emp: Projects, employees: string[]) => void;
}

const FileUpload = ({ employeesHandler }: FileUploadProps) => {
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const reader = new FileReader();

		if (!e.target.files) return;

		reader.onload = async (e) => {
			const res = e.target?.result;

			if (!res) return;

			const fileLine = res.toString().split(/[\n\r]/);
			let employeeMapper: Projects = {};
			let employees: string[] = [];

			fileLine.forEach((fl) => {
				if (!fl) return;

				const employee = fl.split(",");
				const employeeId = employee[0];
				const projectId = employee[1].trim();
				const dateFrom = new Date(employee[2].trim());
				const dateTo =
					employee[3].trim() !== "NULL"
						? new Date(employee[3].trim())
						: new Date();

				employeeMapper[projectId] = {
					...employeeMapper[projectId],
					[employeeId]: {
						employeeId,
						projectId,
						dateFrom,
						dateTo,
					},
				};

				!employees.includes(employeeId) && employees.push(employeeId);
			});

			employeesHandler(employeeMapper, employees);
		};

		reader.readAsText(e.target.files[0]);
	};

	return (
		<button>
			Upload File
			<input type="file" onChange={changeHandler} />
		</button>
	);
};

export default FileUpload;
