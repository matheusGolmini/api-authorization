import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import Company from "./Company";
import User from "./User";

@Entity('module')
export default class Module extends DefaultAttributes {
    @Column()
    path: string

    @ManyToOne(type => Company, company => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company

    @ManyToMany(type => User)
    user: User[]
}