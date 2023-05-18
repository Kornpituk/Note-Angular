import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSearchComponent } from './note-search.component';

describe('HeroSearchComponent', () => {
  let component: NoteSearchComponent;
  let fixture: ComponentFixture<NoteSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
