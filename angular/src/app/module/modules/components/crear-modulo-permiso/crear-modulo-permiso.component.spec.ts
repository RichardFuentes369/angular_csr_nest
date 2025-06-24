import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModuloPermisoComponent } from './crear-modulo-permiso.component';

describe('CrearModuloPermisoComponent', () => {
  let component: CrearModuloPermisoComponent;
  let fixture: ComponentFixture<CrearModuloPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearModuloPermisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearModuloPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
