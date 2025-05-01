import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexnotFoundComponent } from './index.component';

describe('IndexnotFoundComponent', () => {
  let component: IndexnotFoundComponent;
  let fixture: ComponentFixture<IndexnotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexnotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexnotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
