import { Injectable } from '@angular/core';
import { Note } from './note';

@Injectable()
export class NotesService {
  private notes: Note[] = [];
  private currentId = 1234;

  constructor() { }

  getNotes(): Note[] {
    return this.notes;
  }

  getNote(id: number): Note {
    return this.notes[this.getNoteIndex(id)];
  }

  saveNote(note: Note): Note {
    if (note.id) {
      const index = this.getNoteIndex(note.id);
      this.notes.splice(index, 1, note);
    } else {
      note.id = this.generateId();
      this.notes.push(note);
    }
    return note;
  }

  private getNoteIndex(id: number) {
    return this.notes.findIndex((note) => id === note.id);
  }

  private generateId() {
    return this.currentId++;
  }
}
