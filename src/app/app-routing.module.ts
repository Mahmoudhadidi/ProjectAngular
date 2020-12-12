import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatiereComponent } from './matiere/matiere.component';
import { TasksComponent } from './tasks/tasks.component';


const routes: Routes = [
  {path:'task',component:TasksComponent},
  {path:'matiere',component:MatiereComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
