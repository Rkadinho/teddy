import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesSelecionadosComponent } from '../src/app/clientesSelecionados/clientesSelecionados.component';
import { DadosCacheService, ToastService, clientesResponse } from '@teddy/lib';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeddyBotaoComponent, TeddyCardComponent } from '@teddy/lib';
import { of } from 'rxjs';

describe('ClientesSelecionadosComponent', () => {
  let component: ClientesSelecionadosComponent;
  let fixture: ComponentFixture<ClientesSelecionadosComponent>;
  let dadosCacheMock: jest.Mocked<DadosCacheService>;
  let toastServiceMock: jest.Mocked<ToastService>;

  const clienteFake = (id: number): clientesResponse => ({
    id,
    name: `Cliente ${id}`,
    salary: 1000,
    companyValuation: 5000,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  });

  beforeEach(async () => {
    dadosCacheMock = {
      removerClienteSelecionado: jest.fn(),
      limparClientesSelecionados: jest.fn(),
      get clientesSelecionados() {
        return mockClientes;
      }
    } as unknown as jest.Mocked<DadosCacheService>;

    toastServiceMock = {
      toast$: of(),
      mostrarToast: jest.fn(),
    } as unknown as jest.Mocked<ToastService>;

    mockClientes = [clienteFake(1), clienteFake(2)];

    await TestBed.configureTestingModule({
      imports: [ClientesSelecionadosComponent, CommonModule, FormsModule, TeddyBotaoComponent, TeddyCardComponent],
      providers: [
        { provide: DadosCacheService, useValue: dadosCacheMock },
        { provide: ToastService, useValue: toastServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesSelecionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let mockClientes: clientesResponse[];

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar clientes selecionados no ngOnInit', () => {
    expect(component.clientes.length).toBe(2);
    expect(component.clientes[0].name).toBe('Cliente 1');
  });

  it('deve remover um cliente pelo id', () => {
    mockClientes = [clienteFake(1), clienteFake(2)];
    dadosCacheMock.removerClienteSelecionado.mockImplementation((id: number) => {
      mockClientes = mockClientes.filter(c => c.id !== id);
    });

    component.remover(1);
    expect(component.clientes.length).toBe(1);
    expect(component.clientes[0].id).toBe(2);
  });

  it('deve limpar todos os clientes', () => {
    component.limparTodos();
    expect(component.clientes.length).toBe(0);
    expect(dadosCacheMock.limparClientesSelecionados).toHaveBeenCalled();
  });

  it('deve formatar o valor corretamente', () => {
    const valorFormatado = component.formatarValor(1234.56);
    expect(valorFormatado).toBe('R$ 1.234,56');
  });

  it('deve calcular corretamente o total de páginas', () => {
    component.clientes = Array.from({ length: 30 }, (_, i) => clienteFake(i + 1));
    component.clientesPorPagina = 10;
    expect(component.totalPaginas).toBe(3);
  });

  it('deve retornar clientes paginados corretamente', () => {
    component.clientes = Array.from({ length: 30 }, (_, i) => clienteFake(i + 1));
    component.clientesPorPagina = 10;
    component.paginaAtual = 2;

    const paginados = component.clientesPaginados;
    expect(paginados.length).toBe(10);
    expect(paginados[0].id).toBe(11);
  });

  it('deve corrigir paginaAtual se ela for maior que totalPaginas', () => {
    component.clientes = Array.from({ length: 20 }, (_, i) => clienteFake(i + 1));
    component.clientesPorPagina = 10;
    component.paginaAtual = 5;

    component.aoMudarClientesPorPagina();
    expect(component.paginaAtual).toBe(2);
  });

  it('deve corrigir paginaAtual em atualizarClientes', () => {
    mockClientes = Array.from({ length: 5 }, (_, i) => clienteFake(i + 1));
    component.paginaAtual = 3;
    component.clientesPorPagina = 3;

    component.atualizarClientes();
    expect(component.paginaAtual).toBe(2);
  });

  it('deve ajustar clientesPorPagina para 1 se for menor que 1', () => {
    component.clientesPorPagina = 0;
    component.aoMudarClientesPorPagina();
    expect(component.clientesPorPagina).toBe(1);
  });
});
