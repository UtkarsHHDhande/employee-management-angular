import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-details',
  imports: [RouterLink],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css'
})
export class EmployeeDetails implements OnInit {

  private route =
    inject(ActivatedRoute);

  private employeeService =
    inject(EmployeeService);

  employee?: Employee;

  ngOnInit(): void {

    this.employeeService.loadEmployees();

    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    this.employee =
      this.employeeService.getEmployeeById(id);

  }

}