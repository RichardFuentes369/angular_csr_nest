import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernotFoundComponent } from './user.component';

describe('UsernotFoundComponent', () => {
  let component: UsernotFoundComponent;
  let fixture: ComponentFixture<UsernotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsernotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsernotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
