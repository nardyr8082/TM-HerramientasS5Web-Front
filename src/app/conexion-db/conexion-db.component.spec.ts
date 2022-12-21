import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConexionDBComponent } from './conexion-db.component';

describe('ConexionDBComponent', () => {
  let component: ConexionDBComponent;
  let fixture: ComponentFixture<ConexionDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConexionDBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConexionDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
