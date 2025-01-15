import { Routes } from '@angular/router';
import { StaffsComponent } from './staffs/staffs.component';
import { RolesComponent } from './roles/roles.component';
import { CustomersComponent } from './customers/customers.component';
import { AuthenticationGuard } from './auths/guards/authentication.guard';
import { LogComponent } from './auths/log/log.component';

export const routes: Routes = [
  { path: '', component: LogComponent, title: 'Log In'},
  { path: 'staffs', component: StaffsComponent, title: 'Staffs', canActivate: [AuthenticationGuard] },
  { path: 'roles', component: RolesComponent, title: 'Roles', canActivate: [AuthenticationGuard] },
  { path: 'customers', component: CustomersComponent, title: 'Customers', canActivate: [AuthenticationGuard] },
  {
    path: '**',
    redirectTo: '/staffs',
    pathMatch: 'full',
  },
];
