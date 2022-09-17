import { Component, Inject, OnInit, Input, ChangeDetectionStrategy, ɵisDefaultChangeDetectionStrategy, IterableDiffers, DoCheck } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { useStore } from 'react-redux';
import { map, mergeMap, Observable, of, switchMap, tap, throttleTime } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { TodoService } from 'src/app/services/todo-service/todo.service';

export interface Todo  {
  id?: number;
  userId?: number;
  task?: string;
  completed?: boolean;
  dateTime?: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  remainingTodos: number;
  totalTodos: number;
  
  addTodoForm: FormGroup;
  todos: Todo[];
  style = (id?: number): string => {
    const todo = this.todos.filter(el => el.id === id)[0]
    if (todo.completed) {
      return "text-decoration: line-through; color: green;"
    }

    return "";
  }
  

  
  
  constructor(private todoService: TodoService, private authService: AuthenticationService) { 
   
  }

 
  ngOnInit(): void {
    this.todoService.getTodoItems().subscribe({
      next: (todos: Todo[]) => {
        this.todos = todos.sort(this.sortByComplete);
        this.totalTodos = this.todos.length;
        this.remainingTodos = this.totalTodos - this.todos.filter(el => el.completed ===true).length;
        
      }
    });
    
   this.addTodoForm = new FormGroup({
    todoItem: new FormControl(null, [Validators.required])
   })

  

   
  }

  
  

  onSubmit() {
    this.remainingTodos++;
    this.totalTodos++;
    let todo: Todo = {
      
      task: this.addTodoForm.value['todoItem'],
      completed: false
    }
    if (this.addTodoForm.invalid){
      return;
    }
    
    this.addTodoForm.reset();
    return this.todoService.addTodo(todo).subscribe(
      {
        next: () => this.todoService.getTodoItems().subscribe({
          next: (todos: Todo[]) => {
            this.todos = todos.sort(this.sortByComplete)
            
          }
        })
      }
    )
  }

  switchComplete(event: any, id?: number){
    const isChecked = event.checked;
    
   
    const todo: Todo = this.todos.filter(todo => todo.id === Number(id))[0];
    
    todo.completed = isChecked;

    if (isChecked){
      this.remainingTodos--;
    } else {
      this.remainingTodos++;
    }

   

    
    return this.todoService.updateTodo(todo).pipe(
      switchMap(() => this.todoService.getTodoItems())
    ).subscribe({
      next: (todos: Todo[]) => this.todos = todos.sort(this.sortByComplete)
    })
        
  }

  sortByComplete(a: Todo, b: Todo){ 
  if (a.completed && !b.completed){
      return 1
  } else if (!a.completed && b.completed) {
      return -1
  } else if (a.completed && b.completed){
    return Number(b.dateTime) - Number(a.dateTime);
  } else if (!a.completed && !b.completed){
    return Number(b.dateTime) - Number(a.dateTime);
  } else {
    return 0
  }

    
    
  }

  

  deleteTodo(event: any){
    
    this.totalTodos--;
    let target =  event.currentTarget;
    const id = target.attributes.id.value;
    
   
   
    // const index = this.todos.findIndex(el => el.id === id);
    // this.todos.splice(index, 1)
    
    return this.todoService.deleteTodo(id).subscribe({
      next: () => this.todoService.getTodoItems().subscribe({
        next: (todos: Todo[]) => this.todos = todos.sort(this.sortByComplete)
      })
    })
      
    
    }
  

  


}
