import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerModuloPermisoComponent } from './ver-modulo-permiso.component';

describe('VerModuloPermisoComponent', () => {
  let component: VerModuloPermisoComponent;
  let fixture: ComponentFixture<VerModuloPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerModuloPermisoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerModuloPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
