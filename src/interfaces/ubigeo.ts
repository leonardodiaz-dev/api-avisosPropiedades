export interface DepartamentoAPI {
  id: string;
  nombre: string;
}

export interface ProvinciaAPI {
  id: string;
  nombre: string;
  departamento_id: string;
}

export interface DistritoAPI {
  id: string;
  nombre: string;
  provincia_id: string;
}
