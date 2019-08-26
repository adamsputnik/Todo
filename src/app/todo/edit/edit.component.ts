import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListService } from '../list.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  public listId: string;
  listitem: Todo;
  editMode = 'create';

  constructor(private listService: ListService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      content: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.listId = paramMap.get('id');
        this.editMode = 'edit';
        this.listService.getListItem(this.listId).subscribe(listData => {
          this.listitem = {
            id: listData._id,
            title: listData.title,
            content: listData.content
          };
          this.form.setValue({
            title: this.listitem.title,
            content: this.listitem.content
          });
        });
      } else {
        this.editMode = 'create';
        this.listId = null;
      }
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
    this.router.navigate(['/']);
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
    this.router.navigate(['/']);
  }

  onCancel() {
    this.form.reset();
    this.router.navigate(['/']);
  }

}
