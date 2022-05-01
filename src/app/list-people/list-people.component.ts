import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { PeopleInfo } from 'src/models/people-info.models';
import { ModeDialog } from 'src/models/type-dialog.model';
import { PeopleInfoService } from 'src/services/users.service';
import { FormPersonComponent } from '../form-person/form-person.component';
import { SnakbarComponent } from '../snakbar/snakbar.component';

@Component({
  selector: 'app-list-people',
  styleUrls: ['list-people.component.sass'],
  templateUrl: 'list-people.component.html',
})
export class ListPeopleComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];

  constructor(
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private peopleInfoService: PeopleInfoService
  ) {}

  @ViewChild(MatTable, { static: false }) table: MatTable<PeopleInfo>;

  mode: ModeDialog = 'create';
  peopleInfo: PeopleInfo[] = []
  carsNumber: string[] = [];
  clickedRows: Set<PeopleInfo> = new Set<PeopleInfo>();

  ngOnInit(): void {
    this.spinner.show();
    this.peopleInfoService.getOwners()
      .subscribe(data => {
        this.peopleInfo = data;
        data.forEach(owner => {
          owner.carInfo.forEach(car => {
            this.carsNumber.push(car.number)
          });
        });
        this.spinner.hide();
      });
  }

  createUID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  createUser(): void {
    this.openDialogWindow(null);
  }

  createDialogRef(data) {
    return this.dialog.open(FormPersonComponent, {
      restoreFocus: false,
      disableClose: true,
      autoFocus: false,
      closeOnNavigation: false,
      data: { ...data, carsNumber: this.carsNumber,  mode: this.mode }
    });

  }

  openDialogWindow(idOwner: string): void {
    let dialogRef: any;
    if(idOwner) {
      this.spinner.show();
      this.peopleInfoService.getOwnersById(idOwner).subscribe(({...data}: PeopleInfo) => {
        this.spinner.hide();
        dialogRef = this.createDialogRef(data);
        dialogRef?.afterClosed().pipe(filter(() => this.mode !== 'show')).subscribe(result => {
          if(result) {
            this.spinner.show();
            this.peopleInfoService.editOwner({...result, id: idOwner})
            .pipe(
              switchMap(() => this.peopleInfoService.getOwners()),
              takeUntil(this.destroy$),
            ).subscribe((data) => {
              this.openSnackBar('Owner is updated')
              this.peopleInfo = data;
              this.table?.renderRows();
              this.spinner.hide();
              });
          }
        });
      })
    } else {
      this.mode = 'create';
      dialogRef = this.createDialogRef(null);
    }
    dialogRef?.afterClosed().subscribe(result => {
      if(result) {
        this.peopleInfoService.createNewOwner({...result, id: this.createUID() })
        .pipe(
          switchMap(() => this.peopleInfoService.getOwners()),
          takeUntil(this.destroy$),
        ).subscribe((data) => {
            this.openSnackBar('New owner is added')
            this.peopleInfo = data;
            this.table?.renderRows();
            this.spinner.hide();
          });
      }
    });
  }

  openDialogOwner(id: string, mode: ModeDialog): void {
    this.mode = mode;
    this.openDialogWindow(id);
  }

  deleteUser(id: number): void {
    this.spinner.show();
    this.peopleInfoService.deleteOwnerById(id)
    .pipe(
      switchMap(() => this.peopleInfoService.getOwners()),
      takeUntil(this.destroy$),
    ).subscribe((result) => {
        this.peopleInfo = result;
        this.spinner.hide();
      });
  }

  openSnackBar(message: string):void {
    this.snackBar.openFromComponent(SnakbarComponent, {
      data: message,
      duration: 2500
    });
  }
}

