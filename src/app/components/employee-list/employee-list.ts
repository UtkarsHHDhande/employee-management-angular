import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeCard } from '../employee-card/employee-card';
import { EmployeeService } from '../../services/employee.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [FormsModule, EmployeeCard, RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList {

  private employeeService = inject(EmployeeService);

  employees = this.employeeService.getEmployees();

  searchTerm = signal('');
  department = signal('All');

  filteredEmployees = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const selectedDepartment = this.department();

    return this.employees().filter(employee => {
      const matchesSearch =
        employee.name.toLowerCase().includes(search);

      const matchesDepartment =
        selectedDepartment === 'All' ||
        employee.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  });

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
    }
  }
}