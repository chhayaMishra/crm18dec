import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  API = environment.API_URL;

  constructor(private http: HttpClient) { }

  //#region api to add the holiday
  createholiday(data) {
    return this.http.post(`${this.API}/api/holidays/createholiday`, data);
  }
  //#endregion

  //#region api to get all holiday
  getallholidayfilter(value) {
    return this.http.post(`${this.API}/api/holidays/getallholidayfilter`, value,);
  }
  //#endregion

  //#region api to get the data of the holiday using holiday id
  getholidaybyid(holidayId) {
    return this.http.get(`${this.API}/api/holidays/getholidaybyid?holidayId=${holidayId}`,);
  }
  //#endregion

  //#region api to update the data of the holiday
  updateholiday(data) {
    return this.http.post(`${this.API}/api/holidays/updateholiday`, data);
  }
  //#endregion

  //#region api to delete the holiday
  deleteholiday(id) {
    return this.http.post(`${this.API}/api/holidays/deleteholiday?holidayId=${id}`, id,);
  }
  //#endregion

  //#region api to create the holiday group
  createholidaygroup(value) {
    return this.http.post(`${this.API}/api/holidaygroup/createholidaygroup`, value,);
  }
  //#endregion

  //#region api to update the holiday group
  updateholidaygroup(value) {
    return this.http.post(`${this.API}/api/holidaygroup/updateholidaygroup`, value,);
  }
  //#endregion

  //#region api to get the list of holiday groups
  getallholidaygroup() {
    return this.http.get(`${this.API}/api/holidaygroup/getallholidaygroup`);
  }
  //#endregion

  //#region api to get the data of the holiday group using group id
  getholidaygroupbyid(groupId) {
    return this.http.get(`${this.API}/api/holidaygroup/getholidaygroupbyid?groupId=${groupId}`,);
  }
  //#endregion

  //#region api to delete the holiday group
  deleteholidaygroup(id) {
    return this.http.post(`${this.API}/api/holidaygroup/deleteholidaygroup?groupId=${id}`, id,);
  }
  //#endregion

  //#region api to get the list of holiday for the holiday group
  getassignholidayingroup(groupId) {
    return this.http.get(`${this.API}/api/holidaycentral/getassignholidayingroup?groupId=${groupId}`,);
  }
  //#endregion

  //#region api to update the holiday in holiday group
  assignholidayinholidaygroup(data) {
    return this.http.post(`${this.API}/api/holidaycentral/assignholidayinholidaygroup`, data,);
  }
  //#endregion

  //#region api to get the list of organizations for the holiday
  getorglist() {
    return this.http.get(`${this.API}/api/holidaycentral/getorglist`);
  }
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion
}
