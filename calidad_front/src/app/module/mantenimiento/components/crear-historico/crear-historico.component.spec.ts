import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHistoricoComponent } from './crear-historico.component';

describe('CrearHistoricoComponent', () => {
  let component: CrearHistoricoComponent;
  let fixture: ComponentFixture<CrearHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearHistoricoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
