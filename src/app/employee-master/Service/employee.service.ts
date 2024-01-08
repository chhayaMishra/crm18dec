import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  API = environment.API_URL;

  constructor(private http: HttpClient) {}

  //#region api to get employee on onboarding
  getnewemployeeonboarding(post) {
    return this.http.post(
      `${this.API}/api/newemployeeservice/getnewemployeeonboarding`,
      post,
    );
  }
  //#endregion

  //#region api to get employee
  empdirectoryfilter(data) {
    return this.http.post(
      `${this.API}/api/employeenew/empdirectoryfilter`,
      data,
    );
  }
  //#endregion

  //#region api to lock the credentionls of the employee
  lockemployee(id) {
    return this.http.post(
      `${this.API}/api/employeenew/lockemployee?employeeId=${id}`,
      id,
    );
  }
  //#endregion

  //#region api to create the employee for onbording
  createemployeeentity(post) {
    return this.http.post(
      `${this.API}/api/newemployeeservice/createemployeeentity`,
      post,
    );
  }
  //#endregion

  //#region function to update the employee
  updatenewemployee(post) {
    return this.http.post(
      `${this.API}/api/newemployeeservice/updatenewemployee`,
      post,
    );
  }
  //#endregion

  //#region api to update the employee onbording process
  updatenewemployeeonboarding(post) {
    return this.http.post(
      `${this.API}/api/newemployeeservice/updatenewemployeeonboarding`,
      post,
    );
  }
  //#endregion

  //#region api to get the information of employee using employee id
  getnewemployeebyid(employeeId) {
    return this.http.get(
      `${this.API}/api/newemployeeservice/getnewemployeebyid?employeeId=${employeeId}`,
    );
  }
  //#endregion

  //#region api to get the information of employee on the onbording stage
  getnewemployeeonboardingbyid(employeeId) {
    return this.http.get(
      `${this.API}/api/newemployeeservice/getnewemployeeonboardingbyid?employeeId=${employeeId}`,
    );
  }
  //#endregion

  //#region api to get the blood group type
  getbloodtype() {
    return this.http.get(`${this.API}/api/extramaster/getbloodtype`);
  }
  //#endregion

  //#region api to get the employee type
  getemployeetype() {
    return this.http.get(`${this.API}/api/extramaster/getemployeetype`);
  }
  //#endregion

  //#region api to get the employee list for reporting manager
  emplistnotself(empId) {
    return this.http.get(
      `${this.API}/api/employeenew/emplistnotself?employeeId=${empId}`,
    );
  }
  //#endregion

  //#region api to get all employee list
  getallemployeelist() {
    return this.http.get(`${this.API}/api/Dashboard/getallemployeelist`);
  }
  //#endregion

  //#region api to get shift group
  getshiftgroup() {
    return this.http.get(`${this.API}/api/shiftmaster/getshiftgroup`);
  }
  //#endregion

  //#region api to get week off
  getallweekoffsgroup() {
    return this.http.get(`${this.API}/api/shiftmaster/getallweekoffsgroup`);
  }
  //#endregion

  //#region api to get the list of organizations
  orgbycompanyidclaims() {
    return this.http.get(`${this.API}/api/orgmaster/orgbycompanyidclaims`);
  }
  //#endregion

  //#region api to get the list of employees for the employee directory section
  empdirectoryfilteradmin(data) {
    return this.http.post(
      `${this.API}/api/employeenew/empdirectoryfilteradmin`,
      data,
    );
  }

  //#endregion
}
