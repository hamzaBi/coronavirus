import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Country } from '../models/Country.model';


@Injectable({
  providedIn: 'root'
})
export class CoronaService {


  data: any[] = [
   ];

  constructor(
    private afd: AngularFireDatabase
  ) { }

  update() {

    /*
    fetch('../../assets/json/casesByDay.json').then(res => res.json())
      .then(json => {
        this.data.forEach((d) => {
          d.details = json[d.country] ? json[d.country] : [];
          this.afd.list('countries').push(d);
        });
      });
*/
    
  }



}
