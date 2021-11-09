import { TestBed } from '@angular/core/testing';

import { HeaderSharingService } from './headersharing.service';

describe('HeaderSharingService', () => {
  let service: HeaderSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
