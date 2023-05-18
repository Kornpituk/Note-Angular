import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { CreatenoteComponent } from './createnote/createnote.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: NoteDetailsComponent },
  { path: 'create', component: CreatenoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
