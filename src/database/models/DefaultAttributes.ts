import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm'

export default abstract class DefaultAttributes {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @CreateDateColumn({ name: 'created_At' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_At' })
    updatedAt: Date
}