import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { from, map, switchMap } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';

import { Todo } from '../models/todo.interface';
import { TodoService } from '../service/todo.service';

@Controller('todo')
export class TodoController {

    constructor(private todoService: TodoService, private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    createTodo(@Body() todo: Todo, @Request() req) {
        
        const user = req.user.user;

        return this.userService.findByMail(user.email).pipe(
            switchMap((user: User) => {
                todo.userId = user.id;
                const currentTime = new Date();
                todo.dateTime = currentTime.getTime().toString();
                return this.todoService.createTodo(todo)
            })
            

        )


        
        // todo.userId = user.id;
        // return this.todoService.createTodo(todo)
    }

    @UseGuards(JwtAuthGuard)
    @Put('mark')
    updateTodo(@Body() todo: Todo) {

            
       
            return this.todoService.updateTodo(todo)
  
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    getAllTodos(@Request() req) {
        const user = req.user.user;
       
        
        return this.todoService.findAllTodos(user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteTodo(@Param('id') id: number){
        
    
        
        
        return this.todoService.deleteTodo(Number(id));
    }

    
}
