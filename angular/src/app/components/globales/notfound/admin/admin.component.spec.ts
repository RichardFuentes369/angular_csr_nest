import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminnotFoundComponent } from './admin.component';

describe('AdminnotFoundComponent', () => {
  let component: AdminnotFoundComponent;
  let fixture: ComponentFixture<AdminnotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminnotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminnotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
