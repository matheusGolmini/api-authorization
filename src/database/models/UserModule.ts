import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_module')
export default class UserModule {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @PrimaryGeneratedColumn('uuid')
    moduleId: string;
}