import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-card',
  imports: [RouterLink],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.css'
})
export class EmployeeCard {
  employee = input.required<Employee>();

  delete = output<number>();
}