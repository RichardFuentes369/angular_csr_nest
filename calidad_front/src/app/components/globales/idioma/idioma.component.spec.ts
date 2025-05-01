import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomaComponent } from './idioma.component';

describe('IdiomaComponent', () => {
  let component: IdiomaComponent;
  let fixture: ComponentFixture<IdiomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdiomaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
