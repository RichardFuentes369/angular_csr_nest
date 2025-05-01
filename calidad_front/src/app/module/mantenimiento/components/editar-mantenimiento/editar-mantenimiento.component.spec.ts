import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMantenimientoComponent } from './editar-mantenimiento.component';

describe('EditarMantenimientoComponent', () => {
  let component: EditarMantenimientoComponent;
  let fixture: ComponentFixture<EditarMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarMantenimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
