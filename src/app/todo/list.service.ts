import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ListService {
  private listDisplay: Todo[] = [];
  private listUpdated = new Subject<Todo[]>();

  constructor(
    private http: HttpClient,
    private router: Router) {}

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

  getListItem(listId: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/todos/' + listId
    );
  }


  addListItem(title: string, content: string) {
    const listitem: Todo = {id: null, title, content};
    this.http.post<{message: string, listId: string}>('http://localhost:3000/api/newitem', listitem)
      .subscribe(responseData => {
        const id = responseData.listId;
        listitem.id = id;
        this.listDisplay.push(listitem);
        this.listUpdated.next([...this.listDisplay]);
      });
    }


  updateListItem(id: string, title: string, content: string) {
    const item: Todo = { id, title, content };
    this.http
      .put('http://localhost:3000/api/todos/' + id, item)
      .subscribe(response => {
        const updatedList = [...this.listDisplay];
        const oldListIndex = updatedList.findIndex(p => p.id === item.id);
        updatedList[oldListIndex] = item;
        this.listDisplay = updatedList;
        this.listUpdated.next([...this.listDisplay]);
      });
  }

  deleteListItem(listId: string) {
    return this.http.delete('http://localhost:3000/api/todos/' + listId);
  }


}
