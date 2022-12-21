import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarNomencladoresComponent } from './importar-nomencladores.component';

describe('ImportarNomencladoresComponent', () => {
  let component: ImportarNomencladoresComponent;
  let fixture: ComponentFixture<ImportarNomencladoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarNomencladoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarNomencladoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
