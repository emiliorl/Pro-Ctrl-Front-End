import { TestBed } from '@angular/core/testing';

import { RestTopicService } from './rest-topic.service';

describe('RestTopicService', () => {
  let service: RestTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});