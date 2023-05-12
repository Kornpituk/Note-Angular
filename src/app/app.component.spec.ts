import { TestBed, fakeAsync, ComponentFixture, inject, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NotesService } from './notes.service';
import { Note } from './note';

import { PageObject } from './page-object';
import { mockNotes } from './mock.notes';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule
      ],
      providers: [
        NotesService
      ]
    }).compileComponents();
  }));

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let notes: Note[] = [];
  let page: PageObject;

  beforeEach(waitForAsync(inject([NotesService], (mockService) => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;

    notes = mockNotes;
    mockService['notes'] = notes;

    page = new PageObject(fixture);
  })));

  it('should show empty form when new note is created', fakeAsync(() => {
    page.createNewNote();
    expect(page.getNoteForm()).toBeTruthy('Expected to find form when new note is created');
  }));

  it('should list all notes', waitForAsync(inject([NotesService], (mockService) => {
    expect(component.notes.length).toEqual(page.getListNotes().length, '.note elements displayed does not match notes list');
  })));

  it('should select note when clicked (add `active` class)', fakeAsync(inject([NotesService], (mockService) => {
    const note = page.selectListNote();
    expect(note.nativeElement.classList).toContain('active', 'Selected note element should have class `active`');
  })));

  it('should populate inputs with selected note`s title and text', fakeAsync(() => {
    const index = 1;
    page.selectListNote(index);
    const formData = page.getFormData(['title', 'body', 'color']);
    const note = notes[index];
    expect(formData['title']).toEqual(note['title'], 'Title field doesn`t reflect selected note');
    expect(formData['body']).toEqual(note['body'], 'Body field doesn`t reflect selected note');
    expect(formData['color']).toEqual(note['color'], 'Color field doesn`t reflect selected note');
  }));

  it('should save note when Save button is clicked', fakeAsync(() => {
    page.createNewNote();
    page.fillNoteForm({ title: 'Lorem ipsum' });
    spyOn(component, 'saveNote');
    page.saveNoteForm();
    expect(component.saveNote).toHaveBeenCalled();
  }));

  it('should save note using NoteService when form is submitted', fakeAsync(inject([NotesService], (mockService) => {
    spyOn(mockService, 'saveNote');
    component.saveNote(notes[1]);
    expect(mockService.saveNote).toHaveBeenCalledWith(notes[1]);
  })));

  it('should disable save button when required fields are empty', fakeAsync(() => {
    page.selectListNote();
    const titleField = page.getFormField('title');
    expect(titleField.nativeElement.attributes['required']).toBeDefined(' missing `required` attribute on title input');
    page.fillNoteForm({ title: '' });
    expect(page.getSaveBtn().nativeElement.disabled).toBeTruthy('Save button should be disabled on form errors');
  }));

  it('should remove field`s error message when field has no errors', fakeAsync(() => {
    page.selectListNote();
    const titleField = page.getFormField('title');
    expect(titleField.nativeElement.attributes['required']).toBeDefined(' missing `required` attribute on title input');

    let formError = titleField.nativeElement.parentElement.querySelector('.form-error');
    expect(formError && formError.offsetParent).toBeFalsy('There should be no error when field is valid');

    page.fillNoteForm({ title: '' });

    formError = titleField.nativeElement.parentElement.querySelector('.form-error');
    expect(formError && formError.offsetParent).toBeTruthy('There should be error when field is isvalid');
  }));

  // Saving copy
  it('should not change note on list until its saved', fakeAsync(inject([NotesService], (mockService) => {
    const index = 1;
    page.selectListNote(index);
    const changedValue = 'Lorem ipsum';

    page.fillNoteForm({
      title: changedValue
    });

    const formData = page.getFormData(['title', 'body']);
    expect(formData['title']).toEqual(changedValue);

    const list = page.getListNotes();
    expect(list[index].nativeElement.textContent).not.toContain(changedValue, 'List should not be updated before save button is pressed');
  })));

  it('should keep note selected after its saved', fakeAsync(() => {
    page.selectListNote(2);

    const formData = {
      title: 'Lorem ipsum',
      body: 'dolor sit amet',
    };

    page.fillNoteForm(formData);
    page.saveNoteForm();

    const note = page.selectListNote(2);
    expect(note.nativeElement.classList).toContain('active', 'After note is saved it should be selected on the list');
    expect(note.nativeElement.textContent).toContain(formData.title, 'After note is saved it should be selected on the list');
  }));

  // Favourite Notes
  it('should make note list item font 16px when note is favourite', fakeAsync(() => {
    let note = page.selectListNote(1);
    page.fillNoteForm({
      favourite: true
    });
    page.saveNoteForm();
    note = page.selectListNote(1);
    expect(window.getComputedStyle(note.nativeElement).fontSize).toBe('16px', 'When note is marked favourite its font size should be 16px');
  }));

  // Notes Colors
  it('should set font color on the list item note`s color', fakeAsync(() => {
    let note = page.selectListNote(1);
    page.fillNoteForm({
      color: '#00ff00'
    });
    page.saveNoteForm();
    note = page.selectListNote(1);
    expect(note.nativeElement.style.color).toBe('rgb(0, 255, 0)', 'Note font color should match note.color value');
  }));

});
