import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departmentsSignal =
    signal<Department[]>([]);

  readonly departments =
    this.departmentsSignal.asReadonly();

  private loaded = false;

  constructor(private http: HttpClient) {}

  loadDepartments(): void {

    if (this.loaded) {
      return;
    }

    this.loaded = true;

    this.http
      .get<Department[]>('/departments.json')
      .subscribe({
        next: (departments) => {
          this.departmentsSignal.set(departments);
        },
        error: (error) => {
          console.error(
            'Failed to load departments:',
            error
          );
        }
      });
  }
}