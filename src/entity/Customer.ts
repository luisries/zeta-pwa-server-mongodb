import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm";
import { Notification } from "./Notification";
import { Vehicle } from "./Vehicle";

@Entity()
export class Customer
{
    @ObjectIdColumn()
    _id: number;

    @Column()
    cpf: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;
    
    @Column()
    password: string;
    
    @Column()
    createdDate: Date;    

    @Column(type => Notification)
    notifications: Notification[];

    @Column(type => Vehicle)
    vehicles: Vehicle[];


    constructor(){
        this.notifications = [];
        this.vehicles = [];

    }
}