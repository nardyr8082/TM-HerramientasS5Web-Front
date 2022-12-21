import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CascaronComponent } from './cascaron.component';

describe('CascaronComponent', () => {
  let component: CascaronComponent;
  let fixture: ComponentFixture<CascaronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CascaronComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CascaronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
