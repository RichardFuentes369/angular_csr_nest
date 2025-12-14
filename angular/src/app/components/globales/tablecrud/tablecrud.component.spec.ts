import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablecrudComponent } from './tablecrud.component';

describe('TablecrudComponent', () => {
  let component: TablecrudComponent;
  let fixture: ComponentFixture<TablecrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablecrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablecrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
