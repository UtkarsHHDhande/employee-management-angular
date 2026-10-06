import {
  Component,
  inject,
  input
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-card',
  imports: [RouterLink],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.css'
})
export class EmployeeCard {

  employee =
    input.required<Employee>();

  private employeeService =
    inject(EmployeeService);


  deleteEmployee(): void {

    const employee =
      this.employee();

    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${employee.name}?`
      );

    if (!confirmed) {
      return;
    }

    this.employeeService
      .deleteEmployee(employee.id);

  }

}