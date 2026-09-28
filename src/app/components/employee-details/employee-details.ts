import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  imports: [RouterLink],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css'
})
export class EmployeeDetails {

  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);

  employee;

  constructor() {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.employee =
      this.employeeService.getEmployeeById(id);
  }
}