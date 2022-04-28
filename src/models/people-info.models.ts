export interface CarInfo {
  number: string;
  model: string;
  brand: string;
  year: number;
}

export interface PeopleInfo {
  secondName: string;
  firstName: string;
  patronymic: string;
  carInfo: CarInfo[]
}
