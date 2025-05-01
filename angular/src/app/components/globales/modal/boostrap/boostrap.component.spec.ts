import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBoostrapComponent } from './boostrap.component';

describe('ModalBoostrapComponent', () => {
  let component: ModalBoostrapComponent;
  let fixture: ComponentFixture<ModalBoostrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalBoostrapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBoostrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
