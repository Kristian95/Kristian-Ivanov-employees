import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { IEmployees } from "./interfaces/IEmployees";

(() => {
  const csvFilePath: string = path.resolve(__dirname, 'files/employees.csv');
  
  const headers: string[] = ['EmpID', 'ProjectID', 'DateFrom', 'DateTo'];
  
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  
  parse(fileContent, {
    delimiter: ',',
    columns: headers,
  }, (error, result: IEmployees[]) => {
    if (error) {
      console.error(error);
    }
    console.log("Result", result);
  });
})();