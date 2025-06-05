export interface Clientes {
  nome: string;
  salario: string;
  valorEmpresa: string;
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

export interface cleintesRequest {
  name: string;
  salary: number;
  companyValuation: number;
}
