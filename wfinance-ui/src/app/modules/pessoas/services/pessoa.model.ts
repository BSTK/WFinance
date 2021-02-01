export class Pessoa {
  id: number;
  nome: string;
  ativo: boolean;
  endereco: Endereco = new Endereco();
}

export class Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
  bairro: string;
  complemento: string;
}

export class PessoasFiltro {
  nome: string;
}
