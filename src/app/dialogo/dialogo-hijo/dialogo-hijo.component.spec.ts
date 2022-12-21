import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoHijoComponent } from './dialogo-hijo.component';

describe('DialogoHijoComponent', () => {
  let component: DialogoHijoComponent;
  let fixture: ComponentFixture<DialogoHijoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoHijoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoHijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
