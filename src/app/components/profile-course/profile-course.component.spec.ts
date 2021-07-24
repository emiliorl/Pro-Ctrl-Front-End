import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCourseComponent } from './profile-course.component';

describe('ProfileCourseComponent', () => {
  let component: ProfileCourseComponent;
  let fixture: ComponentFixture<ProfileCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
