import {
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

import { EmployeeCard } from '../employee-card/employee-card';

@Component({
  selector: 'app-employee-list',
  imports: [
    EmployeeCard,
    RouterLink
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  private employeeService =
    inject(EmployeeService);

  private departmentService =
    inject(DepartmentService);


  employees =
    this.employeeService.employees;

  departments =
    this.departmentService.departments;


  searchText = signal('');

  selectedDepartment =
    signal('All');


  filteredEmployees = computed(() => {

    const search =
      this.searchText()
        .trim()
        .toLowerCase();

    const department =
      this.selectedDepartment();


    return this.employees().filter(employee => {

      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(search);


      const matchesDepartment =
        department === 'All' ||
        employee.department === department;


      return (
        matchesSearch &&
        matchesDepartment
      );

    });

  });


  ngOnInit(): void {

    this.employeeService.loadEmployees();

    this.departmentService.loadDepartments();

  }


  onSearch(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.searchText.set(input.value);

  }


  onDepartmentChange(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.selectedDepartment.set(
      select.value
    );

  }

}