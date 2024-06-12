import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  data: string;

  @Column('bool',{
    default:false,
  })
  state:boolean;

  @Column()
  idApartment: string;
  
  @Column()
  idUser: string;
}
