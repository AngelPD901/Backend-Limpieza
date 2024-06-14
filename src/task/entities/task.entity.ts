import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('bool', {
    default: false,
  })
  state: boolean;

  @ManyToOne(
    () => User, 
    (users) => users.task
  )
  user: string;
}
