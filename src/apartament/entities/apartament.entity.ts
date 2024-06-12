import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';

@Entity('aparments')
export class Apartament {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @Column()
    idAdimin:string

}
