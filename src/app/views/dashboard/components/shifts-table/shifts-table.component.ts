import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Shift } from '../../../../models/response/shift';

@Component({
  selector: 'app-shifts-table',
  templateUrl: './shifts-table.component.html',
  styleUrl: './shifts-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShiftsTableComponent implements OnInit, AfterViewInit {
  @Input() shiftsData: Shift[] = [];
  @Output() shiftChanged = new EventEmitter<Shift[]>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  dataSource: MatTableDataSource<Shift>;
  displayedColumns: string[] = ['clockIn', 'clockOut', 'totalClockedInTime'];
  changedShifts: Shift[] = [];

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Shift>(this.shiftsData);
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  convertToHHMM(unixTimestampMs: number): string {
    const date = new Date(unixTimestampMs);
    return `${date.getUTCHours().toString().padStart(2, '0')}:${date
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  onTimeChange(updatedTime: string, element: Shift, isClockIn: boolean) {
    const newTimestamp = this.convertToUnixTimestamp(
      updatedTime,
      isClockIn ? element.clockIn : element.clockOut
    );
    let isValidChange = true;

    if (isClockIn) {
      if (element.clockOut && newTimestamp > element.clockOut) {
        console.error('Clock in time cannot be later than clock out time');
        isValidChange = false;
      } else {
        element.clockIn = newTimestamp;
      }
    } else {
      if (element.clockIn && newTimestamp < element.clockIn) {
        console.error('Clock out time cannot be earlier than clock in time');
        isValidChange = false;
      } else {
        element.clockOut = newTimestamp;
      }
    }
    if (isValidChange) {
      this.dataSource.data = [...this.dataSource.data];
      const index = this.changedShifts.findIndex(
        (shift) => shift.id === element.id
      );
      if (index !== -1) {
        this.changedShifts.splice(index, 1);
      }
      this.changedShifts.push(element);
      this.shiftChanged.emit(this.changedShifts);
    }
  }

  convertToUnixTimestamp(timeStr: string, currentTimestamp: number): number {
    const date = new Date(currentTimestamp);
    const timeParts = timeStr.split(':');
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
  }

  calculateTotalClockedInTime(shift: Shift) {
    return this.convertToHHMM(shift.clockOut - shift.clockIn);
  }
}
