import { Shift } from '../../../../../models/response/shift';
import { Employee } from '../../../../../models/response/employee';

interface IEmployeeTableItem {
  id: string;
  name: string;
  email: string;
  totalClockedInTime: number;
  totalPaidRegularHours: number;
  totalOvertimePaidHours: number;
}

export class EmployeeTableItem {
  id: string;
  name: string;
  email: string;
  totalClockedInTime: number;
  totalPaidRegularHours: number;
  totalOvertimePaidHours: number;

  constructor(data: IEmployeeTableItem) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.totalClockedInTime = data.totalClockedInTime;
    this.totalPaidRegularHours = data.totalPaidRegularHours;
    this.totalOvertimePaidHours = data.totalOvertimePaidHours;
  }
}

export interface IEmployeeExportTable {
  employeeData?: Employee;
  shiftsData: Shift[];
}

export class EmployeeExportTable {
  employeeData?: Employee;
  shiftsData: Shift[];

  constructor(data: IEmployeeExportTable) {
    this.employeeData = data.employeeData;
    this.shiftsData = data.shiftsData;
  }
}
