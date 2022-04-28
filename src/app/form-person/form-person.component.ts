import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarInfo, PeopleInfo } from 'src/models/people-info.models';
@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.sass']
})
export class FormPersonComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }
  displayedColumns: string[] = ['number', 'model', 'brand', 'year', 'actions'];
  formUserData: FormGroup;
  myModel = ''
  numberCarMask = [/[A-Z]/, /[A-Z]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[A-Z]/,  /[A-Z]/];
  carsData: CarInfo[] = [{
    number: 'string;',
        model: 'string;',
        brand:' string;',
        year: 1999
  }]
  ngOnInit(): void {
    this.initForm();
    console.log(this.data);

  }

  initForm() {
    this.formUserData = this.fb.group({
      secondName: ['', Validators.required],
      firstName: ['', Validators.required],
      patronymic: ['', Validators.required]
    });
  }
}
