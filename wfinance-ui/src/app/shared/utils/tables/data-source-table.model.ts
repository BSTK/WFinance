export const ResponseToDataSource = <T>(response: any): DataSourceTable<T>  => {
  const dataSource = new DataSourceTable<T>();
  dataSource.totalItensPagina = 5;
  dataSource.pagina = response.number | 0;
  dataSource.conteudo = response.content  || [];
  dataSource.totalRegistros = response.totalElements | 0;
  return dataSource;
};

export class DataSourceTable<T> {
  pagina: number;
  totalRegistros: number;
  totalItensPagina: number;
  conteudo: T[] = [];
}
