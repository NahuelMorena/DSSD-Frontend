import { TestBed } from '@angular/core/testing';

import { DateSpacesService } from './date-spaces.service';

describe('DateSpacesService', () => {
  let service: DateSpacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateSpacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
