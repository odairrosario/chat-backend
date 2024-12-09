import { FindManyOptions, FindOneOptions } from 'typeorm';

import BaseApiEntity from './base.entity';

export interface BaseInterfaceRepository<T extends BaseApiEntity> {
  findOneByOptions(filterOptions: FindOneOptions<T>): Promise<T | null>;

  findManyByOptions(filterOptions: FindManyOptions<T>): Promise<T[]>;

  save(data: T): Promise<T>;
}
