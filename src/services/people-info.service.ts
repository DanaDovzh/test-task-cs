import { Injectable } from "@angular/core";
import { PeopleInfo } from "src/models/people-info.models";
@Injectable({
  providedIn: 'root'
})
export class PeopleInfoService {
  constructor(){}

  private peopleInfo: PeopleInfo[] = [{
    secondName: 'string;',
    firstName: 'string;',
    patronymic: 'string;',
    carInfo: [
      {
        number: 'string;',
        model: 'string;',
        brand:' string;',
        year: 1999
      }
    ]
  }];

  getPeopleInfo() {
    return this.peopleInfo;
  }
}
