import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerUsuariosComponent } from './ver-usuarios.component';

describe('VerUsuariosComponent', () => {
  let component: VerUsuariosComponent;
  let fixture: ComponentFixture<VerUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
