import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NotesService } from '../notes.service';
@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent {
  @Input() note?: Note;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private location: Location
  ) {}

  // selected: Partial<Note>;
  ngOnInit(): void {
    this.getNote();
  }

  getNote(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.notesService.getNote(id)
      .subscribe(note => this.note = note);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.note) {
      this.notesService.updateNote(this.note)
        .subscribe(() => this.goBack());
    }
  }
}
