import { Injectable, signal } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees = signal<Employee[]>([
    {
      id: 101,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      department: 'IT',
      designation: 'Software Developer'
    },
    {
      id: 102,
      name: 'Priya Patil',
      email: 'priya.patil@example.com',
      department: 'HR',
      designation: 'HR Executive'
    },
    {
      id: 103,
      name: 'Amit Verma',
      email: 'amit.verma@example.com',
      department: 'Finance',
      designation: 'Financial Analyst'
    }
  ]);

  getEmployees() {
    return this.employees.asReadonly();
  }

  getEmployeeById(id: number) {
    return this.employees().find(employee => employee.id === id);
  }

  addEmployee(employee: Employee) {
    this.employees.update(employees => [...employees, employee]);
  }

  updateEmployee(updatedEmployee: Employee) {
    this.employees.update(employees =>
      employees.map(employee =>
        employee.id === updatedEmployee.id
          ? updatedEmployee
          : employee
      )
    );
  }

  deleteEmployee(id: number) {
    this.employees.update(employees =>
      employees.filter(employee => employee.id !== id)
    );
  }
}