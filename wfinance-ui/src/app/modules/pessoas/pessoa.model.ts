export type Pessoa = {
  id: number;
  nome: string;
  ativo: boolean;
  endereco: Endereco
}

export type Endereco = {
  cep: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
  bairro: string;
  complemento: string;
}
