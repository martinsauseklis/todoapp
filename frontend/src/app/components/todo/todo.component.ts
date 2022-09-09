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

  
  
  addTodoForm: FormGroup;
  todos: Todo[];
  

  
  
  constructor(private todoService: TodoService, private authService: AuthenticationService) { 
   
  }

 
  ngOnInit(): void {
    this.todoService.getTodoItems().subscribe({
      next: (todos: Todo[]) => this.todos = todos.sort(this.sorterFn)
    });
    
   this.addTodoForm = new FormGroup({
    todoItem: new FormControl(null, [Validators.required])
   })

   
  }

  
  

  onSubmit() {
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
            this.todos = todos.sort(this.sorterFn)
            
          }
        })
      }
    )
  }

  switchComplete(event: any){
    const isChecked = event.currentTarget.checked;
    const id = event.currentTarget.name;
    console.log(id)
    const todo: Todo = this.todos.filter(todo => todo.id === parseInt(id))[0];
    todo.completed = isChecked;

    

    
    return this.todoService.updateTodo(todo).subscribe()
        
  }

  sorterFn(a: Todo, b: Todo){ return Number(b.dateTime) - Number(a.dateTime)}

  deleteTodo(event: any){
    let target =  event.currentTarget;
    const id = target.attributes.id.value;
    
   
   
    // const index = this.todos.findIndex(el => el.id === id);
    // this.todos.splice(index, 1)
    
    return this.todoService.deleteTodo(id).subscribe({
      next: () => this.todoService.getTodoItems().subscribe({
        next: (todos: Todo[]) => this.todos = todos.sort(this.sorterFn)
      })
    })
      
    
    }
  

  


}
