import { TestBed } from '@angular/core/testing';

import { CartsharingService } from './cartsharing.service';

describe('CartsharingService', () => {
  let service: CartsharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartsharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
