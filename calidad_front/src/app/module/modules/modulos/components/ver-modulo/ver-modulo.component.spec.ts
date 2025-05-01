import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerModuloComponent } from './ver-modulo.component';

describe('VerModuloComponent', () => {
  let component: VerModuloComponent;
  let fixture: ComponentFixture<VerModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerModuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
