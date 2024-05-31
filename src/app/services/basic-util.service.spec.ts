import { TestBed } from '@angular/core/testing';

import { BasicUtilService } from './basic-util.service';

describe('BasicUtilService', () => {
  let service: BasicUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
