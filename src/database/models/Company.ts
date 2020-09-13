import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, OneToMany } from "typeorm";
import User from "./User";
import Module from "./Module";

@Entity('company')
export default class Company extends DefaultAttributes {
    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(type => User, user => User)
    user: User[]

    @OneToMany(type => Module, module => Module)
    module: Module[]

    @Column()
    basicPath: string
}

