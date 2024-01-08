import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrganizationService {
  API = environment.API_URL;

  constructor(private http: HttpClient) {} //#region api to get all department list
  getdepartmentonadmin(data) {
    return this.http.post(
      `${this.API}/api/departmentservice/getdepartmentonadmin`,
      data,
    );
  }
  //#endregion

  //#region api to create the deaprtment
  createdepartment(data) {
    return this.http.post(
      `${this.API}/api/departmentservice/createdepartment`,
      data,
    );
  }
  //#endregion

  //#region api to update the deaprtment
  updatedepartment(data) {
    return this.http.post(
      `${this.API}/api/departmentservice/updatedepartment`,
      data,
    );
  }
  //#endregion

  //#region api to get the department data using department id
  getdepartmentid(Id) {
    return this.http.get(
      `${this.API}/api/departmentnew/getdepartmentid?departmentId=${Id}`,
    );
  }
  //#endregion

  //#region api to delete the department data using department id
  deletedepartment(Id) {
    return this.http.post(
      `${this.API}/api/departmentnew/deletedepartment?DepartmentId=${Id}`,
      "",
    );
  }
  //#endregion

  //#region api to get the list of designations
  designationonadminview(data) {
    return this.http.post(
      `${this.API}/api/designationservice/designationonadminview`,
      data,
    );
  }
  //#endregion

  //#region api to delete the designation
  deletedesignation(Id) {
    return this.http.post(
      `${this.API}/api/designationnew/deletedesignation?DesignationId=${Id}`,
      "",
    );
  }
  //#endregion

  //#region api to get designation data using designation id
  getdesignationbyid(Id) {
    return this.http.get(
      `${this.API}/api/designationnew/getdesignationbyid?designationId=${Id}`,
    );
  }
  //#endregion

  //#region api to get the department list for designation page
  getallactivedeparmentlist() {
    return this.http.get(
      `${this.API}/api/departmentnew/getallactivedeparmentlist`,
    );
  }
  //#endregion

  //#region api to create the designation
  createdesignation(data) {
    return this.http.post(
      `${this.API}/api/designationservice/createdesignation`,
      data,
    );
  }
  //#endregion

  //#region api to update designation
  updatedesignation(data) {
    return this.http.post(
      `${this.API}/api/designationservice/updatedesignation`,
      data,
    );
  }
  //#endregion

  //#region api to get all active organization list
  getallactiveorg(data) {
    return this.http.get(
      `${this.API}/api/orgmaster/getallactiveorg?searchstring=${JSON.stringify(
        data,
      )}`,
    );
  }
  //#endregion

  //#region api to get all the country
  getallcountry() {
    return this.http.get(`${this.API}/api/country/getallcountry`);
  }
  //#endregion

  //#region api to get timezone for the organization
  gettimezonelist() {
    return this.http.get(`${this.API}/api/company/gettimezonelist`);
  }
  //#endregion

  //#region api to add organization
  addorg(post) {
    return this.http.post(`${this.API}/api/orgmaster/addorg`, post);
  }
  //#endregion

  //#region api to get information about organization using orgId
  getorgbyid(id) {
    return this.http.get(`${this.API}/api/orgmaster/getorgbyid?orgId=${id}`);
  }
  //#endregion

  //#region api to update the organization
  editorg(post) {
    return this.http.post(`${this.API}/api/orgmaster/editorg`, post);
  }
  //#endregion

  //#region api to delete organization
  deleteorg(orgId) {
    return this.http.put(
      `${this.API}/api/orgmaster/deleteorg?orgId=${orgId}`,
      orgId,
    );
  }
  //#endregion

  //#region api to change the activity of organization
  lockorg(orgId) {
    return this.http.post(
      `${this.API}/api/orgmaster/lockorg?orgId=${orgId}`,
      orgId,
    );
  }
  //#endregion

  //#region api to get the designaiton list using department id
  designationbydepartment(id) {
    return this.http.get(
      `${this.API}/api/designationnew/designationbydepartment?departmentId=${id}`,
    );
  }
  //#endregion

  //#region api to get all designation
  getallactivedesignation() {
    return this.http.get(
      `${this.API}/api/designationnew/getallactivedesignation`,
    );
  }
  //#endregion

  //#region api to get all the employee type
  getuserlogintype() {
    return this.http.get(`${this.API}/api/extramaster/getuserlogintype`);
  }
  //#endregion
}
