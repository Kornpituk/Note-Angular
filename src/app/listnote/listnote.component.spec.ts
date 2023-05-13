import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListnoteComponent } from './listnote.component';

describe('ListnoteComponent', () => {
  let component: ListnoteComponent;
  let fixture: ComponentFixture<ListnoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListnoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
