import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, ManyToOne, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import Company from "./Company";
import Module from "./Module";

@Entity('user')
export default class User extends DefaultAttributes {
    @Column()
    email: string

    @Column()
    password: string

    @ManyToOne(type => Company, company => Company, { eager: true })
    @JoinColumn({ name: 'company_id' })
    company: Company

    @ManyToMany(type => Module, { cascade: true, eager: true})
    @JoinTable({name: 'user_module'})
    module: Module[]
}