import { TodoEntity } from 'src/todo/models/todo.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    @OneToMany(type => TodoEntity, todoEntity => todoEntity.userId)
    id: number;

    
    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;
}