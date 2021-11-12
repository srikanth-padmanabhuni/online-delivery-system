import { TestBed } from '@angular/core/testing';

import { RedirectguardGuard } from './redirectguard.guard';

describe('RedirectguardGuard', () => {
  let guard: RedirectguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
