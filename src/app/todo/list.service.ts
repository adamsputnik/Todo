import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ListService {
  private listDisplay: Todo[] = [];
  private listUpdated = new Subject<Todo[]>();

  constructor(private http: HttpClient) {}

  getListUpdateListener() {
    return this.listUpdated.asObservable();
  }

  getList() {
    this.http.get<{message: string, todo: Todo[]}>('http://localhost:3000/api/todos')
    .subscribe(TodoList => {
      this.listDisplay = TodoList.todo;
      // console.log(TodoList.todo);
      this.listUpdated.next([...this.listDisplay]);
    });
  }
}
