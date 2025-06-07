import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServicoClientesService } from '../../src/service/servico-clientes.service';
import { cleintesRequest, Clientes, clientesResponse, response } from '../../src/models/clientes';

describe('ServicoClientesService', () => {
  let service: ServicoClientesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicoClientesService]
    });

    service = TestBed.inject(ServicoClientesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve listar clientes', () => {
    const mockResponse: response[] = [{ id: 1, nome: 'Cliente 1' } as any];

    service.listarClientes(1, 10).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === service['apiUrl']);
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('limit')).toBe('10');
    req.flush(mockResponse);
  });

  it('deve buscar cliente por ID', () => {
    const mockCliente: Clientes = { id: 1, nome: 'Cliente Teste' } as any;

    service.buscarClientes(1).subscribe(cliente => {
      expect(cliente).toEqual(mockCliente);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCliente);
  });

  it('deve criar cliente', () => {
    const novoCliente: cleintesRequest = { nome: 'Novo Cliente' } as any;
    const resposta: clientesResponse = { id: 1, nome: 'Novo Cliente' } as any;

    service.criarCliente(novoCliente).subscribe(res => {
      expect(res).toEqual(resposta);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(novoCliente);
    req.flush(resposta);
  });

  it('deve atualizar cliente', () => {
    const dadosAtualizados: Partial<cleintesRequest> = { name: 'Atualizado' };
    const resposta: clientesResponse = { id: 1, nome: 'Atualizado' } as any;

    service.atualizarCliente(1, dadosAtualizados).subscribe(res => {
      expect(res).toEqual(resposta);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(dadosAtualizados);
    req.flush(resposta);
  });

  it('deve deletar cliente', () => {
    const id = 1;
    const resposta = 'Cliente removido com sucesso';

    service.deletarCliente(id).subscribe(res => {
      expect(res).toBe(resposta);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(resposta);
  });
});
