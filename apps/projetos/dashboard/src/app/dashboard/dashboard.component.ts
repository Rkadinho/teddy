import { DadosCacheService,
        TeddyBotaoComponent,
        ServicoClientesService,
        TeddyCardComponent,
        clientesResponse,
        TeddyModalComponent,
        Clientes,
        cleintesRequest,
        TeddyModalExcluirComponent,
        ToastService} from '@teddy/lib';
import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    TeddyBotaoComponent,
    TeddyCardComponent,
    TeddyModalComponent,
    TeddyModalExcluirComponent,
    FormsModule,
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  nome = ''
  clientesEncontrados = ' clientes encontrados';
  clientesPagina = 'Clientes por página:';
  textoBotao = "Criar cliente";
  listaClientes: clientesResponse[] = [];
  tituloModal = 'Criar cliente:';
  tituloModalBotao = 'Salvar';
  tituloEditarModal = 'Editar cliente:'
  tituloExcluirModal = 'Excluir cliente:'
  tituloModalBotaoExcluir = 'Continuar';
  textoExcluirModal = '';
  modalCriarCliente = false;
  modalEditarCliente = false;
  modalExcluirCliente = false;
  novoCliente: Clientes = {
    nome: '',
    salario: '',
    valorEmpresa: ''
  };
  clienteSelecionado = 0;
  nomeCliente = '';
  totalPaginas = 1;
  paginaAtual = 1;
  clientesPorPagina = 16;
  clientesSelecionados: clientesResponse[] = [];

  constructor(
    private dadosCache: DadosCacheService,
    private clientesService: ServicoClientesService,
    private toastService: ToastService
  ) {
    this.nome = this.dadosCache.nomeUsuario;
    this.carregarClientes();
  }

  carregarClientes() {
    this.clientesService.listarClientes(this.paginaAtual, this.clientesPorPagina).subscribe((res: any) => {
      this.listaClientes = res.clients;
      this.totalPaginas = res.totalPages;
      this.paginaAtual = res.currentPage;
    });
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
    });
  }

  criarCliente() {
    this.novoCliente = { nome: '', salario: '', valorEmpresa: '' };
    this.modalCriarCliente = true;
  }

  fecharModal() {
    if(this.modalCriarCliente == true) {
      this.modalCriarCliente = false;
    } else if (this.modalEditarCliente == true) {
      this.modalEditarCliente = false;
    } else if(this.modalExcluirCliente == true) {
      this.modalExcluirCliente =false;
    }
  }

  serviceCadastrarCliente() {
    const clienteRequest: cleintesRequest = {
      name: this.novoCliente.nome,
      salary: Number(this.novoCliente.salario),
      companyValuation: Number(this.novoCliente.valorEmpresa)
    }
    this.clientesService.criarCliente(clienteRequest).subscribe(
      (res) => {
        this.toastService.mostrarToast('Cliente criado com sucesso!', 'sucesso');
        this.carregarClientes();
        this.fecharModal();
      },
      (error) => {
        this.toastService.mostrarToast('Sitemas indisponivel, Tente novamente mais tarde', 'erro');
      }
    )
  }

  excluirCliente() {
    this.clientesService.deletarCliente(this.clienteSelecionado).subscribe(
      (res) => {
        this.toastService.mostrarToast('Cliente excluido com sucesso!', 'sucesso');
        this.dadosCache.removerClienteSelecionado(this.clienteSelecionado);
        this.carregarClientes();
        this.fecharModal();
      },
      (error) => {
        this.toastService.mostrarToast('Sitemas indisponivel, Tente novamente mais tarde', 'erro');
      }
    );
  }

  excluirClienteModal(cliente: clientesResponse) {
    this.clienteSelecionado = cliente.id;
    this.modalExcluirCliente = true;
    this.textoExcluirModal = `Você está prestes a excluir o cliente: `;
    this.nomeCliente = cliente.name
  }

  editarCliente(cliente: clientesResponse) {
    this.clienteSelecionado = cliente.id;
    this.modalEditarCliente = true;
    this.novoCliente = {
      nome: cliente.name,
      salario: String(cliente.salary),
      valorEmpresa: String(cliente.companyValuation)
    };
  }

  editarClientesService() {
    const clienteRequest: cleintesRequest = {
      name: this.novoCliente.nome,
      salary: Number(this.novoCliente.salario),
      companyValuation: Number(this.novoCliente.valorEmpresa)
    }
    this.clientesService.atualizarCliente(this.clienteSelecionado, clienteRequest).subscribe(
      (res) => {
        this.toastService.mostrarToast('Cliente editado com sucesso!', 'sucesso');
        this.dadosCache.atualizarClienteSelecionado(res);
        this.carregarClientes();
        this.fecharModal()
      },
      (error) =>{
        this.toastService.mostrarToast('Sitemas indisponivel, Tente novamente mais tarde', 'erro');
      }
    )
  }

  onSalvar() {
    if (this.modalCriarCliente) {
      this.serviceCadastrarCliente();
    } else if (this.modalEditarCliente) {
      this.editarClientesService();
    }
  }

  irParaPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
      this.carregarClientes();
    }
  }

  aoMudarClientesPorPagina() {
    if (this.clientesPorPagina < 1) {
      this.clientesPorPagina = 1;
    }
    this.paginaAtual = 1;
    this.carregarClientes();
  }

  get paginasPaginacao(): (number | string)[] {
    const paginas: (number | string)[] = [];
    if (this.totalPaginas <= 5) {
      for (let i = 1; i <= this.totalPaginas; i++) {
        paginas.push(i);
      }
      return paginas;
    }
    const ultimaPagina = this.totalPaginas;
    const atual = this.paginaAtual;
    paginas.push(1);
    if (atual > 3) {
      paginas.push('...');
    }
    const inicio = Math.max(2, atual - 1);
    const fim = Math.min(ultimaPagina - 1, atual + 1);
    for (let i = inicio; i <= fim; i++) {
      if (i !== 1 && i !== ultimaPagina) {
        paginas.push(i);
      }
    }
    if (atual < ultimaPagina - 2) {
      paginas.push('...');
    }
    if (ultimaPagina !== 1) {
      paginas.push(ultimaPagina);
    }
    return paginas;
  }

  adicionarClienteSelecionado(cliente: clientesResponse) {
    this.dadosCache.adicionarClienteSelecionado(cliente);
  }
}
