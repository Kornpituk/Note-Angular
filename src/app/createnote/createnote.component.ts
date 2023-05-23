import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { NotesService } from "../notes.service";
import { MessageService } from "../message.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.css']
})
export class CreatenoteComponent {
  private service: NotesService;
  constructor(
    private notesService: NotesService,
    private messageService: MessageService,
    private location: Location
  ) {
    this.service = notesService;
  }

  newNote: Note = {
    title: '',
    body: '',
    favourite: false,
    color: '',
    id: 0
  };



  notes: Note[] = [];

  addNote(): void {
    if (!this.newNote.title.trim()) { return; }
    this.notesService.addNote(this.newNote)
      .subscribe(note => {
        // Handle successful note addition if needed
      });
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.notesService.addNote({ title } as Note)
      .subscribe(note => {
        this.notes.push(note);
      });
  }

  goBack(): void {
    this.location.back();
  }
}
