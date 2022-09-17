import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '../models/todo.entity';
import { Repository } from 'typeorm';
import { Todo } from '../models/todo.interface';
import { Observable, pipe, from, map, switchMap, of, throwError, tap } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import e from 'express';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>, private userService: UserService) {

    }

    createTodo(todo: Todo): Observable<Todo | Object> {
        return from(this.todoRepository.save(todo))

        
    }

    findOneByDateTime(dateTime: string): Observable<Todo | Object> {
        return from(this.todoRepository.findOne({where: {dateTime}}))
    }

    findAllTodos(email: string): Observable<Todo[]> {
        
        return from(this.userService.findByMail(email)).pipe(
            switchMap((user: User) => {
                return this.todoRepository.find({where: {userId: user.id}})
            })
        )
    }

    updateTodo(todo: Todo): Observable<any> | Error{
          
            
                return from(this.todoRepository.update(todo.id, todo)).pipe(
                    switchMap(() => this.findOne(todo.id))
                )
    }

    findOne(id: number): Observable<Todo> {
        return from(this.todoRepository.findOneBy({id}))
        
    }

    deleteTodo(id: number){
        return from(this.findOne(id)).pipe(
            map((todo: Todo) => {
                
                    return of(this.todoRepository.delete({id: todo.id}))
                
                
            })
        )
        
        
    
    }
}
