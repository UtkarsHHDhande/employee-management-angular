import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesSignal = signal<Employee[]>([]);

  readonly employees = this.employeesSignal.asReadonly();

  private initialized = false;

  constructor(private http: HttpClient) {}

  loadEmployees(): void {

    if (this.initialized) {
      return;
    }

    this.initialized = true;

    const savedEmployees = localStorage.getItem('employees');

    if (savedEmployees) {

      this.employeesSignal.set(
        JSON.parse(savedEmployees)
      );

      return;
    }

    this.http
      .get<Employee[]>('/employees.json')
      .subscribe({
        next: (employees) => {
          this.employeesSignal.set(employees);
          this.saveToLocalStorage(employees);
        },
        error: (error) => {
          console.error(
            'Failed to load employees:',
            error
          );
        }
      });
  }

  getEmployeeById(id: number): Employee | undefined {

    return this.employeesSignal()
      .find(employee => employee.id === id);
  }

  addEmployee(employee: Employee): void {

    const currentEmployees = this.employeesSignal();

    this.employeesSignal.set([
      ...currentEmployees,
      employee
    ]);

    this.saveToLocalStorage(
      this.employeesSignal()
    );
  }

  updateEmployee(updatedEmployee: Employee): void {

    const updatedEmployees =
      this.employeesSignal().map(employee =>
        employee.id === updatedEmployee.id
          ? updatedEmployee
          : employee
      );

    this.employeesSignal.set(updatedEmployees);

    this.saveToLocalStorage(updatedEmployees);
  }

  deleteEmployee(id: number): void {

    const remainingEmployees =
      this.employeesSignal().filter(
        employee => employee.id !== id
      );

    this.employeesSignal.set(remainingEmployees);

    this.saveToLocalStorage(remainingEmployees);
  }

  private saveToLocalStorage(
    employees: Employee[]
  ): void {

    localStorage.setItem(
      'employees',
      JSON.stringify(employees)
    );
  }
}