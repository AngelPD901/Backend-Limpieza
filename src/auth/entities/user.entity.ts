import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text', {
    unique: true,
  })
  username: string;

  @ApiProperty()
  @Column('text')
  password: string;

  @ApiProperty()
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty()
  @Column('text', {
    array: true,
    default: ['user'],
  })
  rols: string[];

  @ApiProperty()
  @Column('bool', {
    default: false,
  })
  isLoggued: boolean;

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  task: Task;
  @ManyToOne(() => Apartament, (aparments) => aparments.user)
  aparment: Apartament;
}
