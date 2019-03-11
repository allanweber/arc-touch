import { TestBed } from '@angular/core/testing';

import { MoviesConfigurationService } from './movies-configuration.service';

describe('MoviesConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoviesConfigurationService = TestBed.get(MoviesConfigurationService);
    expect(service).toBeTruthy();
  });
});
