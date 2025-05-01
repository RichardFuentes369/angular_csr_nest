import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModuloComponent } from './crear-modulo.component';

describe('CrearModuloComponent', () => {
  let component: CrearModuloComponent;
  let fixture: ComponentFixture<CrearModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearModuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
