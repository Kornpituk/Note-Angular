import { Component, Inject, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../notes.service';

import { mockNotes } from '../mock.notes';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  // notes: Note[] = [
  //   {
  //     id: 1,
  //     title: 'Mock Title',
  //     body: 'mock body',
  //     color: '#ff0000',
  //     favourite: true
  //   }
  // ];

  notes = mockNotes;
  selected: Partial<Note>;

  private service: NotesService;
  selectedHero: Note;

  constructor() {

  }

  selectedNote?: Note;
  onSelect(note: Note): void {
    this.selectedHero = note;
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
