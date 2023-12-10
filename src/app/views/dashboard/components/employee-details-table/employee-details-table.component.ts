import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { EmployeeTableItem } from './models/employee-table';
import { Shift } from '../../../../models/response/shift';

@Component({
  selector: 'app-employee-details-table',
  templateUrl: './employee-details-table.component.html',
  styleUrls: ['./employee-details-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsTableComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() employeeData: any;
  @Input() shiftsData: Shift[] = [];
  @Output() selectionChanged = new EventEmitter<string[]>();

  displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'totalClockedInTime',
    'totalPaidRegularHours',
    'totalOvertimePaidHours',
  ];
  selection = new SelectionModel<string>(true, []);
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.employeeData);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['employeeData'] && changes['employeeData'].currentValue) {
      this.dataSource = new MatTableDataSource<any>(
        changes['employeeData'].currentValue
      );
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  onRowToggle(row: EmployeeTableItem): void {
    this.selection.toggle(row.id);
    this.emitSelectedRows();
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((row) => this.selection.select(row));
    }
    this.emitSelectedRows();
  }

  private emitSelectedRows() {
    this.selectionChanged.emit(this.selection.selected);
  }
}
