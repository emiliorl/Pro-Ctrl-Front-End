import { TestBed } from '@angular/core/testing';

import { RestLessonService } from './rest-lesson.service';

describe('RestTopicService', () => {
  let service: RestLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});