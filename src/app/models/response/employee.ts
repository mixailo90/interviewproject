import { Shift } from './shift';

export interface IEmployeeResponse {
  id: string;
  name: string;
  email: string;
  hourlyRate: number;
  hourlyRateOvertime: number;
}
export class Employee implements IEmployeeResponse {
  id: string;
  name: string;
  email: string;
  hourlyRate: number;
  hourlyRateOvertime: number;

  constructor(data: IEmployeeResponse) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.hourlyRate = data.hourlyRate;
    this.hourlyRateOvertime = data.hourlyRateOvertime;
  }
}

export class EmployeeFormatted extends Employee {
  shifts: Shift[];
  totalClockedInTime: number;
  totalRegularHours: number;
  totalOvertimeHours: number;
  totalPaidRegularHours: number;
  totalOvertimePaidHours: number;
  constructor(employee: Employee, shifts: Shift[]) {
    super(employee);
    this.shifts = shifts || [];
    this.totalClockedInTime = 0;
    this.totalRegularHours = 0;
    this.totalOvertimeHours = 0;
    this.totalPaidRegularHours = 0;
    this.totalOvertimePaidHours = 0;
  }
}
