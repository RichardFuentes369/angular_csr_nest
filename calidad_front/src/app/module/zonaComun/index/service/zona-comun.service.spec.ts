import { TestBed } from '@angular/core/testing';

import { ZonaComunService } from './zona-comun.service';

describe('ZonaComunService', () => {
  let service: ZonaComunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonaComunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
