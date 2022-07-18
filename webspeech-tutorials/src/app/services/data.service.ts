import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tutorial} from "../models/tutorial-model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  link: string = '../assets/data-de.json'

  constructor(private http: HttpClient) {
  }

  getTutorials(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(this.link);
  }
}
