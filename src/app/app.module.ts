import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NotesService } from './notes.service';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NOTES } from './mock.notes';
import { CreatenoteComponent } from './createnote/createnote.component';
import { AppRoutingModule } from './app-routing.module';
import { NotesComponent } from './notes/notes.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { DashboardComponent } from './dashboard/dashboard.component'; // Add this import
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { NoteSearchComponent } from './note-search/note-search.component';

// export function notesFactory(messageService: MessageService) {
//   const service = new NotesService(messageService);
//   service['notes'] = NOTES;
//   return service;
// }

@NgModule({
  declarations: [
    AppComponent,
    CreatenoteComponent,
    NotesComponent,
    NoteDetailsComponent,
    MessagesComponent,
    DashboardComponent,
    NoteSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    {
      provide: NotesService,
      // useFactory: notesFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
