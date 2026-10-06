import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Layout } from './components/layout/layout';

import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeForm } from './components/employee-form/employee-form';
import { EmployeeDetails } from './components/employee-details/employee-details';

import { authGuard } from './auth.guard';

export const routes: Routes = [

  // Login
  {
    path: 'login',
    component: Login
  },

  // Protected application
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],

    children: [

      // / → /employees
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full'
      },

      // Employee list
      {
        path: 'employees',
        component: EmployeeList
      },

      // ADD — MUST COME BEFORE :id
      {
        path: 'employees/add',
        component: EmployeeForm
      },

      // EDIT — MUST COME BEFORE :id
      {
        path: 'employees/edit/:id',
        component: EmployeeForm
      },

      // DETAILS — LAST
      {
        path: 'employees/:id',
        component: EmployeeDetails
      }

    ]
  },

  // Unknown URL
  {
    path: '**',
    redirectTo: 'employees'
  }

];