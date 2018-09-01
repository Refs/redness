import { TestBed, inject } from '@angular/core/testing';

import { SidenavCloseService } from './sidenav-close.service';

describe('SidenavCloseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavCloseService]
    });
  });

  it('should be created', inject([SidenavCloseService], (service: SidenavCloseService) => {
    expect(service).toBeTruthy();
  }));
});
