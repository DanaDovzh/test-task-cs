import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { PeopleInfo } from 'src/models/people-info.models';
import { ModeDialog } from 'src/models/type-dialog.model';
import { PeopleInfoService } from 'src/services/people-info.service';
import { FormPersonComponent } from '../form-person/form-person.component';

@Component({
  selector: 'app-list-people',
  styleUrls: ['list-people.component.sass'],
  templateUrl: 'list-people.component.html',
})
export class ListPeopleComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];

  constructor(private peopleInfoService: PeopleInfoService, public dialog: MatDialog) {}

  @ViewChild(MatSort) sort: MatSort;

  peopleInfo: PeopleInfo[] = []
  clickedRows = new Set<PeopleInfo>();

  ngOnInit(): void {
    this.peopleInfo = this.peopleInfoService.getPeopleInfo();
  }

  createUser() {
    this.openDialogWindow(null, 'create');
  }

  openDialogWindow(data, mode: ModeDialog) {
    this.dialog.open(FormPersonComponent, {
      restoreFocus: false,
      disableClose: true,
      autoFocus: false,
      closeOnNavigation: false,
      data: {...data, mode }
    });
  }
  editUser(user) {
    this.openDialogWindow(user, 'edit');
    console.log(user)
  }

  openUser(user) {
    this.openDialogWindow(user, 'show');
  }
}
