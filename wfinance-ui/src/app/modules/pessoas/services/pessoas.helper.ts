import {ParamMap} from '@angular/router';
import {Pessoa, PessoasFiltro} from './pessoa.model';
import {notEmpty} from '../../../shared/utils/object-utils';
import {ConfirmDialogConfig, ConfirmDialogConfigTipo} from '../../../shared/components/dialog/confirm-dialog-config';

export const ROTA_PESSOA_CADASTRO = 'pessoas/cadastro/';

export const confirmDialogConfigExclusao = (pessoa: Pessoa): ConfirmDialogConfig => {
  return {
    titulo: 'Deseja excluir fornecedor?',
    texto: `Excluindo fornecedor '${ pessoa.nome }'`,
    tipo: ConfirmDialogConfigTipo.EXCLUSAO
  };
};

export const filtroValido = (filtro: PessoasFiltro): boolean => {
  return filtro && notEmpty(filtro.nome);
};

export const pessoaFiltroQueryParam = (queryParamMap: ParamMap): PessoasFiltro => {
  return {
    nome: queryParamMap.get('nome')
  };
};
