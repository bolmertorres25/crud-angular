import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';


export const routes: Routes = [
    {
        path: '',
        component: TaskListComponent,

    },
    {
        path:"task-list",
        component: TaskListComponent,

    },
    {
        path: 'create-task',
    component: TaskFormComponent,

    },
    {
        path: 'task/:id',
        component: TaskFormComponent,
    },

];
