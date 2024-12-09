import { FindManyOptions, FindOneOptions, MongoRepository } from 'typeorm';
import { BaseInterfaceRepository } from './base.repository.interface';
import BaseApiEntity from './base.entity';

export abstract class BaseAbstractRepository<T extends BaseApiEntity>
  implements BaseInterfaceRepository<T>
{
  private entity: MongoRepository<T>;

  protected constructor(entity: MongoRepository<T>) {
    this.entity = entity;
  }

  public async findOneByOptions(
    filterOptions: FindOneOptions<T>
  ): Promise<T | null> {
    return await this.entity.findOne(filterOptions);
  }

  public async findManyByOptions(
    filterOptions: FindManyOptions<T>
  ): Promise<T[]> {
    return await this.entity.find(filterOptions);
  }

  public async save(data: T): Promise<T> {
    return await this.entity.save(data);
  }
}
