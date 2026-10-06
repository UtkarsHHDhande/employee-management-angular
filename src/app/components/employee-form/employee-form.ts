import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm implements OnInit {

  private fb = inject(FormBuilder);
  private employeeService =
    inject(EmployeeService);

  private departmentService =
    inject(DepartmentService);

  private route =
    inject(ActivatedRoute);

  private router =
    inject(Router);


  departments =
    this.departmentService.departments;


  isEditMode = false;

  employeeId: number | null = null;


  employeeForm =
    this.fb.nonNullable.group({

      id: [
        0,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      department: [
        '',
        Validators.required
      ],

      designation: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]
      ]

    });


  ngOnInit(): void {

    this.employeeService.loadEmployees();

    this.departmentService.loadDepartments();


    const id =
      this.route.snapshot.paramMap.get('id');


    if (id) {

      this.isEditMode = true;

      this.employeeId =
        Number(id);

      const employee =
        this.employeeService
          .getEmployeeById(this.employeeId);


      if (employee) {

        this.employeeForm.patchValue(
          employee
        );

      }

    }

  }


  get name() {
    return this.employeeForm.controls.name;
  }

  get id() {
    return this.employeeForm.controls.id;
  }

  get email() {
    return this.employeeForm.controls.email;
  }

  get department() {
    return this.employeeForm.controls.department;
  }

  get designation() {
    return this.employeeForm.controls.designation;
  }


  saveEmployee(): void {

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;
    }


    const employee =
      this.employeeForm.getRawValue();


    if (this.isEditMode) {

      this.employeeService
        .updateEmployee(employee);

    } else {

      this.employeeService
        .addEmployee(employee);

    }


    this.router.navigate([
      '/employees'
    ]);

  }


  cancel(): void {

    this.router.navigate([
      '/employees'
    ]);

  }

}