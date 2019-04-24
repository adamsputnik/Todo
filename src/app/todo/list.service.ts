import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ListService {
  private listDisplay: Todo[] = [];
  private listUpdated = new Subject<Todo[]>();

  constructor(private http: HttpClient) {}

  getListUpdateListener() {
    return this.listUpdated.asObservable();
  }

  getList() {
    this.http.get<{message: string; todo: any}>
    ('http://localhost:3000/api/todos')
    .pipe(map((listData) => {
      return listData.todo.map(list => {
        return {
          title: list.title,
          content: list.content,
          id: list._id
        };
      });
    }))
    .subscribe(TodoList => {
      this.listDisplay = TodoList;
      this.listUpdated.next([...this.listDisplay]);
    });
  }

  addListItem(title: string, content: string) {
    const listitem: Todo = {id: null, title, content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/newitem', listitem)
      .subscribe(responseData => {
        console.log(responseData.message);
        const id = responseData.postId;
        listitem.id = id;
        this.listDisplay.push(listitem);
        this.listUpdated.next([...this.listDisplay]);
      });
  }

  deleteListItem(listId: string) {
    this.http.delete('http://localhost:3000/api/todos/' + listId)
    .subscribe(() => {
      const updatedList = this.listDisplay.filter(listitem => listitem.id !== listId);
      this.listDisplay = updatedList;
      this.listUpdated.next([...this.listDisplay]);
    });
  }
}
