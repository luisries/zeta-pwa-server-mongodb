import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Company
{
    @ObjectIdColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    logo: string;

    @Column()
    url: string;

    @Column()
    zetaUrl: string;

    //Links to images for loading in carousel 
    @Column()
    photos: string[];
    
}