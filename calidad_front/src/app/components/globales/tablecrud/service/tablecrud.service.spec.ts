import { TestBed } from '@angular/core/testing';

import { TablecrudService } from './tablecrud.service';

describe('TablecrudService', () => {
  let service: TablecrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablecrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
