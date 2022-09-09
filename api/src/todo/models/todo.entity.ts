import { UserEntity } from 'src/user/models/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

@Entity()
export class TodoEntity {
    @PrimaryGeneratedColumn({type: 'integer'})
    id: number;

    @ManyToOne(type => UserEntity, userEntity => userEntity.id)
    @Column()
    userId: number;

    @Column({length: 255})
    task: string;

    @Column('boolean')
    completed: boolean;

    @Column({nullable: true})
    dateTime: string;

}