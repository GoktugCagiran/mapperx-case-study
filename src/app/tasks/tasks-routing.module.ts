import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskThreeComponent } from './task-three/task-three.component';
import { TaskOneComponent } from './task-one/task-one.component';
import { TaskTwoComponent } from './task-two/task-two.component';

const routes: Routes = [
  {
    path: 'one',
    component: TaskOneComponent,
  },
  {
    path: 'two',
    component: TaskTwoComponent,
  },
  {
    path: 'three',
    component: TaskThreeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
