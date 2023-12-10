import { Injectable } from '@angular/core';
import { Shift } from '../../../models/response/shift';
import { EmployeeFormatted } from '../../../models/response/employee';

@Injectable({
  providedIn: 'root',
})
export class ShiftProcessingService {
  constructor() {}

  processShifts(
    shifts: Shift[],
    employees: EmployeeFormatted[]
  ): { employees: EmployeeFormatted[]; dailyHours: Record<string, number> } {
    const dailyHours: Record<string, number> = {};

    shifts.forEach((shift) => {
      const employeeIndex = employees.findIndex(
        (emp) => emp.id === shift.employeeId
      );
      if (employeeIndex === -1) {
        return;
      }

      const dateClockIn = new Date(shift.clockIn);
      const dateClockOut = new Date(shift.clockOut);
      const dateClockInString = dateClockIn.toISOString().split('T')[0];
      const dateClockOutString = dateClockOut.toISOString().split('T')[0];

      if (dateClockInString === dateClockOutString) {
        this.addShiftHours(
          employees[employeeIndex],
          shift,
          dailyHours,
          dateClockInString
        );
      } else {
        // Create a new Date object for the end of the first day
        const endOfFirstDay = new Date(dateClockIn);
        endOfFirstDay.setHours(23, 59, 59, 999);

        // Create a new Date object for the start of the second day
        const startOfSecondDay = new Date(dateClockOut);
        startOfSecondDay.setHours(0, 0, 0, 0);

        // First part of the shift (Day 1)
        const firstPartShift = {
          ...shift,
          clockOut: endOfFirstDay.getTime(),
        };
        this.addShiftHours(
          employees[employeeIndex],
          firstPartShift,
          dailyHours,
          dateClockInString
        );

        // Second part of the shift (Day 2)
        const secondPartShift = {
          ...shift,
          clockIn: startOfSecondDay.getTime(),
        };
        this.addShiftHours(
          employees[employeeIndex],
          secondPartShift,
          dailyHours,
          dateClockOutString
        );
      }
    });

    return { employees, dailyHours };
  }

  private addShiftHours(
    employee: EmployeeFormatted,
    shift: Shift,
    dailyHours: Record<string, number>,
    dateString: string
  ): void {
    const shiftHours = (shift.clockOut - shift.clockIn) / 1000 / 60 / 60;
    employee.shifts.push(shift);
    if (!dailyHours[dateString]) {
      dailyHours[dateString] = 0;
    }
    dailyHours[dateString] += shiftHours;
  }
}
