import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListService } from '../list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup;
  public listId: string;

  constructor(private listService: ListService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      content: new FormControl(null, {validators: [Validators.required]})
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
    // location.reload();

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
    // location.reload();
  }

  onCancel() {
    this.form.reset();
    this.router.navigate(['/']);
    // location.reload();
  }

}
