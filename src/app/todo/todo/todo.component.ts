import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../todo.model';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ListService } from '../list.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  todo: Todo[] = [];
  form: FormGroup;
  private listSub: Subscription;

  constructor(public listService: ListService) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      content: new FormControl(null, {validators: [Validators.required]})
    });
    this.listService.getList();
    this.listSub = this.listService.getListUpdateListener().subscribe((list: Todo[]) => {
      this.todo = list;
    });
  }

  onSaveList() {
    if (this.form.invalid) {
      return;
    }
    this.listService.addListItem(
      this.form.value.title,
      this.form.value.content
    );
  }

  onDelete(postId: string) {
    this.listService.deleteListItem(postId);
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
  }

}
