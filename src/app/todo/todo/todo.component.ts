import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../todo.model';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ListService } from '../list.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  todo: Todo;
  todoArray: Todo[] = [];
  form: FormGroup;
  private listSub: Subscription;
  private itemSub: Subscription;
  private editMode = 'create';
  public listId: string;

  constructor(
    public listService: ListService,
    public route: ActivatedRoute) {}

  ngOnInit() {
    this.listService.getList();
    this.listSub = this.listService.getListUpdateListener()
    .subscribe((list: Todo[]) => {
      this.todoArray = list;
    });
  }

  onDelete(listId: string) {
    this.listService.deleteListItem(listId).subscribe(response => {
      this.listService.getList();
    });
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
  }

}
