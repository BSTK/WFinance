import {ParamMap} from '@angular/router';
import {Categoria} from './categoria.model';
import {notEmpty} from '../../../shared/utils/object-utils';
import {CategoriasFiltro} from '../components/categorias-pesquisa/categorias-filtro.model';
import {ConfirmDialogConfig, ConfirmDialogConfigTipo} from '../../../shared/components/dialog/confirm-dialog-config';

export const ROTA_CATEGORIA_CADASTRO = 'categorias/cadastro/';

export const confirmDialogConfigExclusao = (categoria: Categoria): ConfirmDialogConfig => {
  return {
    titulo: 'Deseja excluir categoria?',
    texto: `Excluindo categoria "${categoria.nome}"`,
    tipo: ConfirmDialogConfigTipo.EXCLUSAO
  };
};

export const filtroValido = (filtro: CategoriasFiltro): boolean => {
  return filtro && notEmpty(filtro.nome);
};

export const categoriaFiltroQueryParam = (queryParamMap: ParamMap): CategoriasFiltro => {
  return {
    nome: queryParamMap.get('nome')
  };
};
