import { TestBed } from '@angular/core/testing';

import { JwttokenserviceService } from './jwtToken.service';

describe('JwttokenserviceService', () => {
  let service: JwttokenserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwttokenserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
