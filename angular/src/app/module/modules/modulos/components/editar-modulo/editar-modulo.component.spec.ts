import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarModuloComponent } from './editar-modulo.component';

describe('EditarModuloComponent', () => {
  let component: EditarModuloComponent;
  let fixture: ComponentFixture<EditarModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarModuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
