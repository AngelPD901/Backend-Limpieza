import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';

@Entity('aparments')
export class Apartament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (users) => users.aparment, { cascade: true })
  user: User[];
}
