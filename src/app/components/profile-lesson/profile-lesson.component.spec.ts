import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLessonComponent } from './profile-lesson.component';

describe('ProfileLessonComponent', () => {
  let component: ProfileLessonComponent;
  let fixture: ComponentFixture<ProfileLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
