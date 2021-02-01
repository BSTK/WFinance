import {ParamMap} from '@angular/router';
import {Lancamento} from './lancamento.model';
import {notEmpty} from '../../../shared/utils/object-utils';
import {LancamentosFiltro} from '../components/lancamentos-pesquisa/lancamentos-filtro.model';
import {ConfirmDialogConfig, ConfirmDialogConfigTipo} from '../../../shared/components/dialog/confirm-dialog-config';

export const confirmDialogConfigExclusao = (lancamento: Lancamento): ConfirmDialogConfig => {
  return {
    titulo: 'Deseja excluir lancamento?',
    texto: `Excluindo lançamento '${ lancamento.descricao }' 
            do fornecedor "${ lancamento.pessoa.nome }" 
            no valor de "R$ ${ lancamento.valor }"`,
    tipo: ConfirmDialogConfigTipo.EXCLUSAO
  };
};

export const filtroValido = (filtro: LancamentosFiltro): boolean => {
  return filtro && notEmpty(filtro.descricao)
    || notEmpty(filtro.dataVencimentoDe)
    || notEmpty(filtro.dataVencimentoAte);
};

export const lancamentoFiltroQueryParam = (queryParamMap: ParamMap): LancamentosFiltro => {
  return {
    descricao: queryParamMap.get('descricao'),
    dataVencimentoDe: queryParamMap.get('dataVencimentoDe'),
    dataVencimentoAte: queryParamMap.get('dataVencimentoAte')
  };
};

