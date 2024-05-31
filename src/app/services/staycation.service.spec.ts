import { TestBed } from '@angular/core/testing';

import { StaycationService } from './staycation.service';

describe('StaycationService', () => {
  let service: StaycationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaycationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
