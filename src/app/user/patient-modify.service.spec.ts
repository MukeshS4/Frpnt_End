import { TestBed } from '@angular/core/testing';

import { PatientModifyService } from './patient-modify.service';

describe('PatientModifyService', () => {
  let service: PatientModifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientModifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
