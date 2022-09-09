import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { Todo } from 'src/app/components/todo/todo.component';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  

  constructor(private http: HttpClient) { }

  addTodo(todo: Todo) {
    return this.http.post<Todo>('http://localhost:3000/todo/', todo)
  }

  getTodoItems(){
    return this.http.get<any>('http://localhost:3000/todo')
  }

  deleteTodo(id: string){
    return this.http.delete(`http://localhost:3000/todo/${id}`)
  }

  updateTodo(todo: Todo){
    return this.http.put(`http://localhost:3000/todo/mark`, todo)
  }

}
