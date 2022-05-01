export interface CarInfo {
  number: string;
  model: string;
  brand: string;
  year: number;
}

export interface PeopleInfo {
  id: string;
  secondName: string;
  firstName: string;
  patronymic: string;
  carInfo: CarInfo[]
}
