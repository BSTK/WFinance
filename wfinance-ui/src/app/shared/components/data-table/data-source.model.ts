export const ResponseToDataSource = <T>(response: any): DataSourceTable<T>  => {
  const dataSource = new DataSourceTable<T>();
  dataSource.pagina = response.number;
  dataSource.totalItensPagina = response.size;
  dataSource.conteudo = response.content;
  dataSource.totalRegistros = (response.totalElements - 2);
  return dataSource;
};

export class DataSourceTable<T> {
  pagina: number;
  totalRegistros: number;
  totalItensPagina: number;
  conteudo: T[] = [];
}
