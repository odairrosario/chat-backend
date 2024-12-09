import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

export default class BaseApiEntity {
  @ObjectIdColumn()
  @Exclude()
  public _id!: ObjectId;

  @Column()
  public createdAt: Date;

  @Column()
  public updatedAt: Date;

  @BeforeInsert()
  public setCreated(): void {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  public setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}
