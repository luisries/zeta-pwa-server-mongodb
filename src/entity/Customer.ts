import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm";
import { Notification } from "./Notification";

@Entity()
export class Customer
{
    @ObjectIdColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column(type => Notification)
    notifications: Notification[];
}