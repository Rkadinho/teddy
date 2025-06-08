import { DashboardComponent } from '../src/app/dashboard/dashboard.component';
import { of, throwError } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let mockDadosCache: any;
  let mockClientesService: any;
  let mockToastService: any;

  beforeEach(() => {
    mockDadosCache = {
      nomeUsuario: 'Usuário Teste',
      removerClienteSelecionado: jest.fn(),
      atualizarClienteSelecionado: jest.fn(),
      adicionarClienteSelecionado: jest.fn()
    };

    mockClientesService = {
      listarClientes: jest.fn().mockReturnValue(of({
        clients: [{ id: 1, name: 'Cliente A', salary: 1000, companyValuation: 2000 }],
        totalPages: 5,
        currentPage: 1
      })),
      criarCliente: jest.fn(),
      deletarCliente: jest.fn(),
      atualizarCliente: jest.fn()
    };

    mockToastService = {
      mostrarToast: jest.fn()
    };

    component = new DashboardComponent(
      mockDadosCache,
      mockClientesService,
      mockToastService
    );
  });

  it('deve inicializar com nome do cache', () => {
    expect(component.nome).toBe('Usuário Teste');
  });

  it('deve carregar clientes', () => {
    const fakeResponse = {
      clients: [{ id: 2, name: 'Cliente B', salary: 2000, companyValuation: 4000 }],
      totalPages: 3,
      currentPage: 1
    };

    mockClientesService.listarClientes.mockReturnValue(of(fakeResponse));

    component.carregarClientes();

    expect(mockClientesService.listarClientes).toHaveBeenCalledWith(1, 16);
    expect(component.listaClientes).toEqual(fakeResponse.clients);
    expect(component.totalPaginas).toBe(fakeResponse.totalPages);
    expect(component.paginaAtual).toBe(fakeResponse.currentPage);
  });

  it('deve formatar valor em BRL', () => {
    const valor = component.formatarValor(1500);
    expect(valor).toBe('R$ 1.500,00');
  });

  it('deve abrir modal de criação de cliente', () => {
    component.criarCliente();
    expect(component.modalCriarCliente).toBe(true);
    expect(component.novoCliente.nome).toBe('');
  });

  it('deve fechar modais corretamente', () => {
    component.modalCriarCliente = true;
    component.fecharModal();
    expect(component.modalCriarCliente).toBe(false);
  });

  it('deve chamar serviceCadastrarCliente e lidar com sucesso', () => {
    mockClientesService.criarCliente.mockReturnValue(of({}));
    component.novoCliente = { nome: 'Teste', salario: '1000', valorEmpresa: '5000' };
    component.serviceCadastrarCliente();

    expect(mockToastService.mostrarToast).toHaveBeenCalledWith(
      'Cliente criado com sucesso!',
      'sucesso'
    );
  });

  it('deve lidar com erro ao cadastrar cliente', () => {
    mockClientesService.criarCliente.mockReturnValue(throwError(() => 'erro'));
    component.novoCliente = { nome: 'Teste', salario: '1000', valorEmpresa: '5000' };
    component.serviceCadastrarCliente();

    expect(mockToastService.mostrarToast).toHaveBeenCalledWith(
      'Sitemas indisponivel, Tente novamente mais tarde',
      'erro'
    );
  });

  it('deve abrir modal de exclusão', () => {
    const cliente = { id: 1, name: 'Cliente A' };
    component.excluirClienteModal(cliente as any);

    expect(component.modalExcluirCliente).toBe(true);
    expect(component.nomeCliente).toBe('Cliente A');
  });

  it('deve excluir cliente com sucesso', () => {
    mockClientesService.deletarCliente.mockReturnValue(of({}));
    component.clienteSelecionado = 1;
    component.excluirCliente();

    expect(mockToastService.mostrarToast).toHaveBeenCalledWith(
      'Cliente excluido com sucesso!',
      'sucesso'
    );
    expect(mockDadosCache.removerClienteSelecionado).toHaveBeenCalledWith(1);
  });

  it('deve lidar com erro ao excluir cliente', () => {
    mockClientesService.deletarCliente.mockReturnValue(throwError(() => 'erro'));
    component.clienteSelecionado = 1;
    component.excluirCliente();

    expect(mockToastService.mostrarToast).toHaveBeenCalledWith(
      'Sitemas indisponivel, Tente novamente mais tarde',
      'erro'
    );
  });

  it('deve editar cliente e abrir modal', () => {
    const cliente = { id: 1, name: 'João', salary: 1000, companyValuation: 2000 };
    component.editarCliente(cliente as any);

    expect(component.modalEditarCliente).toBe(true);
    expect(component.novoCliente.nome).toBe('João');
  });

  it('deve atualizar cliente com sucesso', () => {
    mockClientesService.atualizarCliente.mockReturnValue(of({}));
    component.novoCliente = { nome: 'Atualizado', salario: '2000', valorEmpresa: '8000' };
    component.clienteSelecionado = 2;
    component.editarClientesService();

    expect(mockToastService.mostrarToast).toHaveBeenCalledWith(
      'Cliente editado com sucesso!',
      'sucesso'
    );
    expect(mockDadosCache.atualizarClienteSelecionado).toHaveBeenCalled();
  });

  it('deve lidar com erro ao atualizar cliente', () => {
    mockClientesService.atualizarCliente.mockReturnValue(throwError(() => 'erro'));
    component.editarClientesService();

    expect(mockToastService.mostrarToast).toHaveBeenCalledWith(
      'Sitemas indisponivel, Tente novamente mais tarde',
      'erro'
    );
  });

  it('deve chamar método correto em onSalvar()', () => {
    mockClientesService.criarCliente.mockReturnValue(of({}));
    mockClientesService.atualizarCliente.mockReturnValue(of({}));

    const spyCadastrar = jest.spyOn(component, 'serviceCadastrarCliente');
    const spyEditar = jest.spyOn(component, 'editarClientesService');

    component.modalCriarCliente = true;
    component.onSalvar();
    expect(spyCadastrar).toHaveBeenCalled();

    component.modalCriarCliente = false;
    component.modalEditarCliente = true;
    component.onSalvar();
    expect(spyEditar).toHaveBeenCalled();
  });

  it('deve adicionar cliente ao cache', () => {
    const cliente = { id: 1, name: 'X', salary: 0, companyValuation: 0 };
    component.adicionarClienteSelecionado(cliente as any);
    expect(mockDadosCache.adicionarClienteSelecionado).toHaveBeenCalledWith(cliente);
  });

  it('deve alterar clientes por página', () => {
    const spy = jest.spyOn(component, 'carregarClientes');
    component.clientesPorPagina = 0;
    component.aoMudarClientesPorPagina();
    expect(component.clientesPorPagina).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('deve navegar para páginas válidas', () => {
    const spy = jest.spyOn(component, 'carregarClientes');
    component.totalPaginas = 5;

    mockClientesService.listarClientes.mockReturnValue(of({
      clients: [],
      totalPages: 5,
      currentPage: 3
    }));

    component.irParaPagina(3);

    expect(component.paginaAtual).toBe(3);
    expect(spy).toHaveBeenCalled();
  });

  it('deve gerar array correto de paginasPaginacao', () => {
    component.totalPaginas = 7;
    component.paginaAtual = 4;
    const resultado = component.paginasPaginacao;
    expect(resultado).toContain(1);
    expect(resultado).toContain('...');
    expect(resultado).toContain(4);
    expect(resultado).toContain(7);
  });

  it('deve fechar modalExcluirCliente no fecharModal', () => {
    component.modalCriarCliente = false;
    component.modalEditarCliente = false;
    component.modalExcluirCliente = true;

    component.fecharModal();

    expect(component.modalExcluirCliente).toBe(false);
  });

  it('deve retornar array completo quando totalPaginas <= 5', () => {
    component.totalPaginas = 4;
    const resultado = component.paginasPaginacao;
    expect(resultado).toEqual([1, 2, 3, 4]);
  });
});
