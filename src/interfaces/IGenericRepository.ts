import { PaginatedList } from '../types/common'

export interface ISpecification {

}

export interface IGenericRepository<T extends { id: any }, S extends ISpecification> {
  getOne(specification: S, table: string): Promise<any> // FIXME
  getList(specification: S): Promise<PaginatedList<any>> // FIXME
  createOne(record: T, table: string): Promise<T>
  createMany(record: T, table: string): Promise<any[]> // FIXME
  deleteOne(specification: S): Promise<void>
}
