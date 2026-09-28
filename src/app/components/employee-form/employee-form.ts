import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm {

  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  editingId: number | null = null;

  employeeForm = this.fb.nonNullable.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    designation: ['', Validators.required]
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editingId = Number(id);

      const employee =
        this.employeeService.getEmployeeById(this.editingId);

      if (employee) {
        this.employeeForm.patchValue(employee);
      }
    }
  }

  submit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const employee = this.employeeForm.getRawValue();

    if (this.editingId !== null) {
      this.employeeService.updateEmployee(employee);
    } else {
      this.employeeService.addEmployee(employee);
    }

    this.router.navigate(['/employees']);
  }
}