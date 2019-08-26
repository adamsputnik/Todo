import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo/todo.component';
import { EditComponent } from './todo/edit/edit.component';

const routes: Routes = [
  { path: '', component: TodoComponent},
  { path: 'create', component: EditComponent},
  { path: 'edit/:id', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
