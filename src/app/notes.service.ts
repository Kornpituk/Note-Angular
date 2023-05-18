import { Injectable } from "@angular/core";
import { Note } from "./note";
import { Observable, of } from "rxjs";
import { NOTES } from "./mock.notes";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  // private notes: Note[] = [];
  // private currentId = 1234;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  private notesUrl = "api/notes"; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

   /** Log a HeroService message with the MessageService */
   private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // getNotes(): Note[] {
  //   return this.notes;
  // }
  // Example usage of the message service

  /** GET heroes from the server */
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl)
    .pipe(
      tap((_) => this.log("fetched notes")),
      catchError(this.handleError<Note[]>("getNotes", []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getNoteNo404<Data>(id: number): Observable<Note> {
    const url = `${this.notesUrl}/?id=${id}`;
    return this.http.get<Note[]>(url)
      .pipe(
        map(notes => notes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} note id=${id}`);
        }),
        catchError(this.handleError<Note>(`getNote id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getNote(id: number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Note>(url).pipe(
      tap((_) => this.log(`fetched note id=${id}`)),
      catchError(this.handleError<Note>(`getNote id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateNote(note: Note): Observable<any> {
    return this.http.put(this.notesUrl, note, this.httpOptions).pipe(
      tap((_) => this.log(`updated note id=${note.id}`)),
      catchError(this.handleError<any>("updateNote"))
    );
  }


  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, this.httpOptions).pipe(
      tap((newNote: Note) => this.log(`added note w/ id=${newNote.id}`)),
      catchError(this.handleError<Note>("addNote"))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteNote(id: number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;

    return this.http.delete<Note>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted note id=${id}`)),
      catchError(this.handleError<Note>("deleteNote"))
    );
  }

  /* GET heroes whose name contains search term */
  searchNotes(term: string): Observable<Note[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Note[]>(`${this.notesUrl}/?title=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found notes matching "${term}"`)
          : this.log(`no notes matching "${term}"`)
      ),
      catchError(this.handleError<Note[]>("searchNotes", []))
    );
  }

  // getNote(id: number): Note {
  //   return this.notes[this.getNoteIndex(id)];
  // }

  // saveNote(note: Note): Note {
  //   if (note.id) {
  //     const index = this.getNoteIndex(note.id);
  //     this.notes.splice(index, 1, note);
  //   } else {
  //     note.id = this.generateId();
  //     this.notes.push(note);
  //   }
  //   return note;
  // }

  // private getNoteIndex(id: number) {
  //   return this.notes.findIndex((note) => id === note.id);
  // }

  // private generateId() {
  //   return this.currentId++;
  // }
}
