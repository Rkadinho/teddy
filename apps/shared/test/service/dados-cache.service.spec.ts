import { TestBed } from '@angular/core/testing';
import { DadosCacheService } from '../../src/service/dados-cache.service';
import { ToastService } from '../../src/service/toast.service';

describe('DadosCacheService', () => {
  let service: DadosCacheService;
  let toastServiceMock: Partial<ToastService>;

  let store: Record<string, string>;

  beforeEach(() => {
    store = {};

    const localStorageProto = window.localStorage['__proto__'];

    jest.spyOn(localStorageProto, 'setItem').mockImplementation((...args: any[]) => {
      const [key, value] = args;
      store[key] = value;
    });

    jest.spyOn(localStorageProto, 'getItem').mockImplementation((...args: any[]) => {
      const [key] = args;
      return store[key] || null;
    });

    jest.spyOn(localStorageProto, 'removeItem').mockImplementation((...args: any[]) => {
      const [key] = args;
      delete store[key];
    });

    toastServiceMock = {
      mostrarToast: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        DadosCacheService,
        { provide: ToastService, useValue: toastServiceMock }
      ]
    });

    service = TestBed.inject(DadosCacheService);
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve salvar e recuperar nomeUsuario', () => {
    service.nomeUsuario = 'João';
    expect(service.nomeUsuario).toBe('João');
  });

  it('deve salvar e recuperar clientesSelecionados', () => {
    const clientes = [{ id: 1, nome: 'Cliente 1' }] as any;
    service.clientesSelecionados = clientes;
    expect(service.clientesSelecionados).toEqual(clientes);
  });

  it('deve retornar array vazio para clientesSelecionados se localStorage estiver vazio', () => {
    localStorage.removeItem('clientesSelecionados');
    expect(service.clientesSelecionados).toEqual([]);
  });

  it('deve adicionar cliente e mostrar toast de sucesso', () => {
    const cliente = { id: 1, nome: 'Cliente 1' } as any;
    service.clientesSelecionados = [];
    service.adicionarClienteSelecionado(cliente);

    expect(service.clientesSelecionados).toContainEqual(cliente);
    expect(toastServiceMock.mostrarToast).toHaveBeenCalledWith('Cliente selecionado com sucesso!', 'sucesso');
  });

  it('não deve adicionar cliente repetido e mostrar toast de erro', () => {
    const cliente = { id: 1, nome: 'Cliente 1' } as any;
    service.clientesSelecionados = [cliente];
    service.adicionarClienteSelecionado(cliente);

    expect(service.clientesSelecionados.length).toBe(1);
    expect(toastServiceMock.mostrarToast).toHaveBeenCalledWith('Este cliente ja foi selecionado', 'erro');
  });

  it('deve atualizar cliente selecionado', () => {
    const cliente = { id: 1, nome: 'Cliente 1' } as any;
    const clienteAtualizado = { id: 1, nome: 'Cliente Atualizado' } as any;
    service.clientesSelecionados = [cliente];
    service.atualizarClienteSelecionado(clienteAtualizado);

    expect(service.clientesSelecionados).toContainEqual(clienteAtualizado);
  });

  it('deve remover cliente e mostrar toast de sucesso', () => {
    const cliente = { id: 1, nome: 'Cliente 1' } as any;
    service.clientesSelecionados = [cliente];
    service.removerClienteSelecionado(1);

    expect(service.clientesSelecionados).not.toContainEqual(cliente);
    expect(toastServiceMock.mostrarToast).toHaveBeenCalledWith('Cliente removido com sucesso!', 'sucesso');
  });

  it('deve limpar clientes selecionados e mostrar toast', () => {
    service.clientesSelecionados = [{ id: 1 } as any];
    service.limparClientesSelecionados();

    expect(service.clientesSelecionados.length).toBe(0);
    expect(toastServiceMock.mostrarToast).toHaveBeenCalledWith('Todos os cliente removido com sucesso!', 'sucesso');
  });

  it('deve limpar dados do localStorage', () => {
    const removeItemSpy = jest.spyOn(localStorage, 'removeItem');
    service.limparDados();

    expect(removeItemSpy).toHaveBeenCalledWith('nomeUsuario');
    expect(removeItemSpy).toHaveBeenCalledWith('clientesSelecionados');
  });
});

