/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServicoClientesService } from './servico-clientes.service';

describe('Service: ServicoClientes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicoClientesService]
    });
  });

  it('should ...', inject([ServicoClientesService], (service: ServicoClientesService) => {
    expect(service).toBeTruthy();
  }));
});
