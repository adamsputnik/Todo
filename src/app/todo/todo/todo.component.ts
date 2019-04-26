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
  // todo: Todo[] = [];
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
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      content: new FormControl(null, {validators: [Validators.required]})
    });
    this.listService.getList();
    this.listSub = this.listService.getListUpdateListener()
    .subscribe((list: Todo[]) => {
      this.todoArray = list;
    });
  }

  onSaveList() {
    if (this.form.invalid) {
      return;
    }
    this.listService.addListItem(
      this.form.value.title,
      this.form.value.content);
      // );
    this.form.reset();
    location.reload();

  }

  onSaveEdits(listId: string) {
    if (this.form.invalid) {
      return;
    }
    this.listService.updateListItem(
      this.listId,
      this.form.value.title,
      this.form.value.content
    );
    this.form.reset();
    location.reload();
  }

  onCancel() {
    this.form.reset();
  }

  onEdit(listId: string) {
    this.itemSub = this.listService.getListItem(listId).subscribe((list) => {
      this.form.patchValue({
        title: list.title,
        content: list.content
      });
      this.listId = list._id;
      return this.listId;
    });

  }

  onDelete(listId: string) {
    this.listService.deleteListItem(listId);
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
  }

}
