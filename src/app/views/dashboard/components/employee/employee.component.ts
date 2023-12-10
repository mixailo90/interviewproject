import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { EmployeeFormatted } from '../../../../models/response/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
  @Input() set employeeData(value: EmployeeFormatted) {
    this.localEmployeeData = { ...value };
  }
  @Output() employeeDataChange = new EventEmitter<EmployeeFormatted>();
  localEmployeeData: EmployeeFormatted;

  constructor() {}

  onValueChange() {
    this.employeeDataChange.emit(this.localEmployeeData);
  }
}
