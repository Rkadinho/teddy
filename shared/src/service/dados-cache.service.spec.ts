/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DadosCacheService } from './dados-cache.service';

describe('Service: DadosCache', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DadosCacheService]
    });
  });

  it('should ...', inject([DadosCacheService], (service: DadosCacheService) => {
    expect(service).toBeTruthy();
  }));
});
