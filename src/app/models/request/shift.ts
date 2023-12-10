export interface IShiftRequest {
  clockIn: number;
  clockOut: number;
}

export class ShiftRequest implements IShiftRequest {
  clockIn: number;
  clockOut: number;
  constructor(data: IShiftRequest) {
    this.clockIn = data.clockIn;
    this.clockOut = data.clockOut;
  }
}
