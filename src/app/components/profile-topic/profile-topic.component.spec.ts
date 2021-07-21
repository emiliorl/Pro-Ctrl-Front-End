import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTopicComponent } from './profile-topic.component';

describe('ProfileTopicComponent', () => {
  let component: ProfileTopicComponent;
  let fixture: ComponentFixture<ProfileTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
