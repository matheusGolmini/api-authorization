import DefaultAttributes from "./DefaultAttributes";
import { Column, Entity, ManyToOne, JoinColumn, ManyToMany, OneToMany } from "typeorm";
import Company from "./Company";
import User from "./User";
import Logs from "./Logs";

@Entity('module')
export default class Module extends DefaultAttributes {
    @Column()
    path: string

    @ManyToOne(type => Company, company => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company

    @ManyToMany(type => User)
    user: User[]

    @OneToMany(type => Logs, company => Logs)
    logs: Logs
}