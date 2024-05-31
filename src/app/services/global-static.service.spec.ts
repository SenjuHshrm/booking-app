import { TestBed } from '@angular/core/testing';

import { GlobalStaticService } from './global-static.service';

describe('GlobalStaticService', () => {
  let service: GlobalStaticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalStaticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
