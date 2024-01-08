import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExcelAPIService {
  API = environment.API_URL

  constructor(private http: HttpClient) { }

  //#region api to import the asset sheet
  importassetsbyexcel(excelData) {
    return this.http.post(`${this.API}/api/assetsimportexport/importassetsbyexcel`, excelData,);
  }
  //#endregion
}
