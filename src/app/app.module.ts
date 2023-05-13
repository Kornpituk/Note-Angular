import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NotesService } from './notes.service';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { mockNotes } from './mock.notes';
import { ListnoteComponent } from './listnote/listnote.component';
import { CreatenoteComponent } from './createnote/createnote.component';
import { AppRoutingModule } from './app-routing.module';
import { NotesComponent } from './notes/notes.component';
import { NoteDetailsComponent } from './note-details/note-details.component';

export function notesFactory() {
  const service = new NotesService();
  service['notes'] = mockNotes;
  return service;
}

@NgModule({
  declarations: [
    AppComponent,
    ListnoteComponent,
    CreatenoteComponent,
    NotesComponent,
    NoteDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: NotesService,
      useFactory: notesFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
