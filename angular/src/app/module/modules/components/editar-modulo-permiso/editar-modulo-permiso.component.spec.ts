import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarModuloPermisoComponent } from './editar-modulo-permiso.component';

describe('EditarModuloPermisoComponent', () => {
  let component: EditarModuloPermisoComponent;
  let fixture: ComponentFixture<EditarModuloPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarModuloPermisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarModuloPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
