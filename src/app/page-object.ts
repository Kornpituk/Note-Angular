import { tick, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';

export class PageObject {

  constructor(private fixture: ComponentFixture<AppComponent>) {
    this.fixture.detectChanges();
  }

  getListNotes() {
    return this.fixture.debugElement.queryAll(By.css('.note'));
  }

  selectListNote(index = 0) {
    const notes = this.getListNotes();
    const note = notes[index];
    note.triggerEventHandler('click', {});
    this.fixture.detectChanges();
    tick();
    return note;
  }

  getLastListNote() {
    const notes = this.getListNotes();
    return notes[notes.length - 1];
  }

  createNewNote() {
    const newBtn = this.fixture.debugElement.query(By.css('.note-new'));
    newBtn.triggerEventHandler('click', {});
    this.fixture.detectChanges();
  }

  getNoteForm() {
    return this.fixture.debugElement.query(By.css('form'));
  }

  getSaveBtn() {
    return this.fixture.debugElement.query(By.css('.note-save'));
  }

  saveNoteForm() {
    const saveBtn = this.getSaveBtn();
    saveBtn.nativeElement.click();
    this.fixture.detectChanges();
    tick();
  }

  getFormField(name): DebugElement {
    const selector = `form [name=${name}]`;
    const field = this.fixture.debugElement.query(By.css(selector));
    if (!(field && field.nativeElement)) {
      throw Error('Can`t find element matching CSS selector: ' + selector);
    }
    return field;
  }

  getFormData(fields: string[]) {
    const data = {};
    for (const name of fields) {
      const field = this.getFormField(name);
      if (['checkbox', 'radio'].indexOf(field.nativeElement.type) > -1 && field.nativeElement.checked) {
        data[name] = field.nativeElement.value;
      } else {
        data[name] = field.nativeElement.value;
      }
    }
    return data;
  }

  fillNoteForm(data) {
    this.fixture.detectChanges();
    tick();

    for (const name in data) {
      if (!data.hasOwnProperty(name)) {
        continue;
      }
      const field = this.getFormField(name);
      if (['checkbox', 'radio'].indexOf(field.nativeElement.type) > -1) {
        field.nativeElement.checked = data[name];
        field.triggerEventHandler('change', { target: field.nativeElement });
        continue;
      }

      if ('undefined' !== typeof data[name]) {
        field.nativeElement.value = data[name];
        field.triggerEventHandler('input', { target: field.nativeElement });
        continue;
      }
    }
    this.fixture.detectChanges();
    tick();
  }
}
