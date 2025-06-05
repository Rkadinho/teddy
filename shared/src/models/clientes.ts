export interface Clientes {
  nome: string;
  salario: number;
  valorEmpresa: number;
}

export interface clientesResponse {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

export interface response {
  clients: clientesResponse[];
  currentPage: number;
  totalPage: number;
}
