import { Routes } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { ClientComponent } from './components/client/client.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ClientProjectsComponent } from './components/client-projects/client-projects.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'master',
        pathMatch: 'full'
    }, {
        path: 'master',
        component: MasterComponent
    },
    {
        path: 'client',
        component: ClientComponent
    },
    {
        path: 'client-projects',
        component: ClientProjectsComponent
    },
    {
        path: 'employee',
        component: EmployeeComponent
    }
];
