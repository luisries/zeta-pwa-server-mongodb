import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ObjectIdColumn } from "typeorm";

@Entity()
export class Notification
{
    @ObjectIdColumn()
    _id: number;

    @Column()
    message: string;

    @Column()
    read:boolean

    @Column()
    createdDate: Date;

}
