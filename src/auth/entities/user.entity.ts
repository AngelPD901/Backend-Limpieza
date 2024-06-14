import { Apartament } from 'src/apartament/entities/apartament.entity';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  rols: string[];

  @Column('bool', {
    default: false,
  })
  isLoggued: boolean;

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  task: Task;
  @ManyToOne(() => Apartament, (aparments) => aparments.user)
  aparment: Apartament;
}
