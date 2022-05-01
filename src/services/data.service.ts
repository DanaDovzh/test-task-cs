import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { PeopleInfo } from "src/models/people-info.models";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() { }
  createDb(): Record<string, PeopleInfo[]>{
   const owners: PeopleInfo[] = [
    {
      id:  Date.now().toString(36) + Math.random().toString(36).substring(2),
      secondName: 'Mask',
      firstName: 'Elon',
      patronymic: 'Errolovuch',
      carInfo: [
        {
          number: 'XP2434AA',
          model: 'S60D',
          brand:'Tesla',
          year: 2003
        },
        {
          number: 'XY2654HH',
          model: 'S60D',
          brand:'Tesla',
          year: 2002
        }
      ],
    },
    {
      id:  Date.now().toString(36) + Math.random().toString(36).substring(2),
      secondName:  'Backman',
      firstName: 'Uve',
      patronymic: 'Frederickovuch',
      carInfo: [
        {
          number: 'RE4577TT',
          model: '99',
          brand:'Saab',
          year: 1999
        }
      ],
    },
   ];

  return { owners };
  }
}
