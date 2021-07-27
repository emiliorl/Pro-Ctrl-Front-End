import { TestBed } from '@angular/core/testing';

import { RestProgressService } from './rest-progress.service';

describe('RestProgressService', () => {
  let service: RestProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});