import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class Module {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    path: string;

    @Column()
    user_id: ObjectID;

}