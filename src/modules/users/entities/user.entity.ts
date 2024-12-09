import { Entity, Column } from 'typeorm';
import BaseApiEntity from '../../../shared/base/base.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
export class User extends BaseApiEntity {
  @Column()
  @Expose()
  name: string;

  @Column({ unique: true })
  @Expose()
  username: string;

  @Column()
  @Exclude()
  password: string;
}
