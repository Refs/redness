import { TestBed, inject } from '@angular/core/testing';

import { ProcessBarService } from './process-bar.service';

describe('ProcessBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessBarService]
    });
  });

  it('should be created', inject([ProcessBarService], (service: ProcessBarService) => {
    expect(service).toBeTruthy();
  }));
});
