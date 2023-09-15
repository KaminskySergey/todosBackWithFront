/* eslint-disable import/no-cycle */
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './Todo';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @Column({ default: false })
  isVerify: boolean;

  @Column({ default: null })
  verifyToken: string;

  @Column({ default: null })
  token: string;
}
