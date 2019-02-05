import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Vehicle
{
    @ObjectIdColumn()
    _id: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;
    
    @Column()
    info: string;

    @Column()
    chassis: string;

    @Column()
    color: string;

    @Column()
    fuel: string;

    
}