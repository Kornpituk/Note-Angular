import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    const notes = [
      { id: 123, title: 'Testing note 1', body: 'Testing Note Body 1', color: '#ff0000', favourite: false },
      { id: 456, title: 'Testing note 2', body: 'Testing Note Body 2', color: '#00ff00', favourite: true },
      { id: 789, title: 'Testing note 3', body: 'Testing Note Body 3', color: '#0000ff', favourite: false },
      { id: 987, title: 'Testing note 4', body: 'Testing Note Body 4', color: '#ff0000', favourite: false },
      { id: 654, title: 'Testing note 5', body: 'Testing Note Body 5', color: '#00ff00', favourite: true },
      { id: 321, title: 'Testing note 6', body: 'Testing Note Body 6', color: '#0000ff', favourite: false },
      { id: 147, title: 'Testing note 7', body: 'Testing Note Body 7', color: '#ff0000', favourite: false },
      { id: 258, title: 'Testing note 8', body: 'Testing Note Body 8', color: '#00ff00', favourite: true },
      { id: 369, title: 'Testing note 9', body: 'Testing Note Body 9', color: '#0000ff', favourite: false },
    ];
    return {notes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(notes: Note[]): number {
    return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 11;
  }
}
