import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserDetailsComponent } from './profile-user-details.component';

describe('ProfileUserDetailsComponent', () => {
  let component: ProfileUserDetailsComponent;
  let fixture: ComponentFixture<ProfileUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
