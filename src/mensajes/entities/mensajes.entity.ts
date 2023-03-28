import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class mensaje {
   @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nick: string;

    @Column('text')
    mensaje: string;
}
