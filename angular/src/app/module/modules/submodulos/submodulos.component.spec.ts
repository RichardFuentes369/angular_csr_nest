import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmodulosComponent } from './submodulos.component';

describe('SubmodulosComponent', () => {
  let component: SubmodulosComponent;
  let fixture: ComponentFixture<SubmodulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmodulosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmodulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
