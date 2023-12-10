export interface IEmployeeRequest {
  name: string;
  hourlyRate: number;
  hourlyRateOvertime: number;
}

export class EmployeeRequest implements IEmployeeRequest {
  name: string;
  hourlyRate: number;
  hourlyRateOvertime: number;
  constructor(data: IEmployeeRequest) {
    this.name = data.name;
    this.hourlyRate = data.hourlyRate;
    this.hourlyRateOvertime = data.hourlyRateOvertime;
  }
}
