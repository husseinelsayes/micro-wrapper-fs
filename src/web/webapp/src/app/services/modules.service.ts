import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(private _http:HttpClient) { }

  modulesSysURL = environment.modulesSysURL;
  getSystems(){
    return this._http.get(`${this.modulesSysURL}/systems`);
  }
}
