import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class Users {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

}