export interface IShiftResponse {
  id: string;
  employeeId: string;
  clockIn: number;
  clockOut: number;
}
export class Shift implements IShiftResponse {
  id: string;
  employeeId: string;
  clockIn: number;
  clockOut: number;

  constructor(data: any) {
    this.id = data?.id;
    this.employeeId = data.employeeId;
    this.clockIn = data.clockIn;
    this.clockOut = data.clockOut;
  }
}
