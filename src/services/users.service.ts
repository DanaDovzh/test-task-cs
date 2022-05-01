import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PeopleInfo } from "src/models/people-info.models";

@Injectable({
  providedIn: 'root'
})
export class PeopleInfoService {
  constructor(private http: HttpClient) { }

  private apiUrl: string = 'api/owners';

  getOwners() {
    return this.http.get<PeopleInfo[]>(this.apiUrl);
  }

  getOwnersById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createNewOwner(owner: PeopleInfo[]) {
    return this.http.post(this.apiUrl, owner);
  }

  editOwner(owner: PeopleInfo) {
    return this.http.put(`${this.apiUrl}/${owner?.id}`, owner);
  }

  deleteOwnerById(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
