import { Entity, Column } from 'typeorm';
import BaseApiEntity from '../../../shared/base/base.entity';
import { Expose } from 'class-transformer';

@Entity('messages')
export class Message extends BaseApiEntity {
  @Column({ type: 'string' })
  @Expose()
  from!: string;

  @Column({ type: 'string' })
  @Expose()
  to!: string;

  @Column({ type: 'string' })
  @Expose()
  content!: string;
}
