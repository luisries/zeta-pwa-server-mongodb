import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm";
import { Notification } from "./Notification";

@Entity()
export class Customer
{
    @ObjectIdColumn()
    id: number;

    @Column()
    cpf: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;
    // @Column()
    // password: string;
    @Column()
    createdDate: Date;    

    @Column(type => Notification)
    notifications: Notification[];
}