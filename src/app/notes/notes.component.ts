import { Component, Inject, OnInit } from "@angular/core";
import { Note } from "../note";
import { NotesService } from "../notes.service";
import { MessageService } from "../message.service";

import { NOTES } from "../mock.notes";
@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"],
})
export class NotesComponent implements OnInit {
  selected: Partial<Note>;

  private service: NotesService;

  constructor(
    private notesService: NotesService,
    private messageService: MessageService
  ) {
    this.service = notesService;
  }

  notes: Note[] = [];
  selectedNote: Note | undefined;

  ngOnInit(): void {
    this.loadNotes();
  }

  getNotes() {
    return this.notes;
  }

  // private loadNotes(): void {
  //   // TODO: Retrieve a list of notes from the service and store them locally
  //   this.notes = this.service.getNotes();
  // }
  private loadNotes(): void {
    // TODO: Retrieve a list of notes from the service and store them locally
    // this.notes = this.service.getNotes();
    this.notesService.getNotes()
    .subscribe((notes) => (this.notes = notes));
  }


  delete(note: Note): void {
    this.notes = this.notes.filter(h => h !== note);
    this.notesService.deleteNote(note.id).subscribe();
  }

  // selectNote(note: Note):void  {
  //   // TODO: prevent changing original object
  //   this.selectedNote  = note;
  //   this.messageService.add(`NotesComponent: Selected note id=${note.id}`);

  // }

  // newNote() {
  //   // this.selected = {};
  //   this.selectedNote = {} as Note;
  // }

  // saveNote(note) {
  //   // TODO: save note
  // }
}
