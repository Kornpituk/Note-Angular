import { Component, Inject, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  notes: Note[] = [];
  title:"nOTE sERVICE"

  saveNote(note) {
    // TODO: save note
  }
}
