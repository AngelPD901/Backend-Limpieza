import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  username: string;
  
  @Column('text')
  password:string;

  @Column('bool',{
    default:true,
  })
  isActive: boolean;

  @Column('text',{
    array:true,
    default:['user']
  })
  rols: string[];

  @Column('bool',{
    default:false,
  })
  isLoggued:boolean;
}