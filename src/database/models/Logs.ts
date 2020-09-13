import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, ManyToOne, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import Company from "./Company";
import Module from "./Module";
import User from "./User";

@Entity('logs')
export default class Logs extends DefaultAttributes {

    @Column()
    isValue: boolean

    @ManyToOne(type => User, company => User, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(type => Module, company => Module, { eager: true })
    @JoinColumn({ name: 'module_id' })
    module: Module
}