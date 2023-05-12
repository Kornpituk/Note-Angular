import { Component, Inject, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notes: Note[] = [
    {
      id: 1,
      title: 'Mock Title',
      body: 'mock body',
      color: '#ff0000',
      favourite: true
    }
  ];
  selected: Partial<Note>;

  private service: NotesService;

  constructor() {

  }

  ngOnInit() {
    this.loadNotes();
  }

  getNotes() {
    return this.notes;
  }

  private loadNotes(): void {
    // TODO: Retrieve a list of notes from the service and store them locally
  }

  selectNote(note) {
    // TODO: prevent changing original object
    this.selected = note;
  }

  newNote() {
    this.selected = {};
  }

  saveNote(note) {
    // TODO: save note
  }
}
