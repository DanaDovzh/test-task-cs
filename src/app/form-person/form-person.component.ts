import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import _ from 'lodash';
import { PeopleInfo } from 'src/models/people-info.models';
import { ModeDialog } from 'src/models/type-dialog.model';

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.sass'],
})
export class FormPersonComponent implements OnInit {
  @ViewChild(MatTable, { static: false }) table: MatTable<PeopleInfo>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  thisYear: number = new Date().getFullYear();
  tooltipColumn = {
    number: 'Number car is required and be in format like AH1111AS',
    model: 'Model is required',
    brand: 'Brand is required',
    year: `Year of production is required and should be between 1999 and ${this.thisYear}`,
    numberCars: 'User must have at least one car',
  };

  carsNumber: string[];
  displayedColumns: string[] = ['number', 'model', 'brand', 'year', 'actions'];
  formUserData: FormGroup;
  mode: ModeDialog;
  numberCarMask: RegExp[] = [
    /[A-Z]/,
    /[A-Z]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    /[A-Z]/,
    /[A-Z]/,
  ];
  patternForValidator: RegExp = /^[A-Z]{2}[0-9]{4}[A-Z]{2}$/;
  carForm: FormGroup = this.fb.group({
    year: [
      '',
      [
        Validators.required,
        Validators.min(1990),
        Validators.max(this.thisYear),
      ],
    ],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    number: [
      '',
      [
        Validators.required,
        Validators.pattern(this.patternForValidator)
      ],
    ],
  });

  ngOnInit(): void {
    this.carsNumber = [];
    this.initForm();
    this.mode = this.data.mode;
  }

  get cars(): FormArray {
    return this.formUserData.get('carInfo') as FormArray;
  }

  initForm() {
    if (this.data.mode !== 'create') {
      this.formUserData = this.fb.group({
        secondName: [this.data.secondName, Validators.required],
        firstName: [this.data.firstName, Validators.required],
        patronymic: [this.data.patronymic, Validators.required],
        carInfo: this.fb.array([], Validators.required),
      });
      this.data.carInfo.forEach((car) => {
        (this.formUserData.get('carInfo') as FormArray).push(
          this.fb.group({
            year: [
              car.year,
              [
                Validators.required,
                Validators.min(1990),
                Validators.max(new Date().getFullYear()),
              ],
            ],
            brand: [car.brand, Validators.required],
            model: [car.model, Validators.required],
            number: [
              car.number,
              [
                Validators.required,
                Validators.pattern(this.patternForValidator),
              ],
            ],
          })
        );
      });
      this.formUserData.markAllAsTouched();
    } else {
      this.formUserData = this.fb.group({
        secondName: ['', Validators.required],
        firstName: ['', Validators.required],
        patronymic: ['', Validators.required],
        carInfo: this.fb.array(
          [_.cloneDeep(this.carForm)],
          Validators.required
        ),
      });
    }
  }

  addCar() {
    (this.formUserData.get('carInfo') as FormArray).push(
      _.cloneDeep(this.carForm)
    );
    this.table?.renderRows();
  }

  checkUniqNumber() {
    const currentNumbers: string[] = [];
    this.formUserData.value.carInfo.forEach((car) => {
      if (car.number) {
        currentNumbers.push(car.number);
      }
    });

    let allNumbers: string[] = this.carsNumber.concat(currentNumbers);
    let uniqNumbers: string[] = [...new Set(allNumbers)];
    return allNumbers.length === uniqNumbers.length;
  }

  getErrorControl(control) {
    return control.invalid && !control.untouched;
  }

  deleteCar(i) {
    this.cars.removeAt(i);
    this.formUserData.markAllAsTouched();
    this.table?.renderRows();
  }
}
