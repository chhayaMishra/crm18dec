import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  public API = environment.API_URL;

  constructor(private http: HttpClient) {}

  //#region api to get all the ticket category to show the details
  getallticketcategory(value) {
    return this.http.get(
      `${this.API}/api/newticketcategory/getallticketcategory?active=${value}`,
    );
  }
  //#endregion

  //#region api to get all employee list
  emplistoforg() {
    return this.http.get(`${this.API}/api/employeenew/emplistoforg`);
  }
  //#endregion

  //#region api to add ticekt category
  createcategory(data) {
    return this.http.post(
      `${this.API}/api/newticketcategory/createcategory`,
      data,
    );
  }
  //#endregion

  //#region api to get the ticket category data using tocket category id
  getticketcategorybyid(categoryId) {
    return this.http.get(
      `${this.API}/api/newticketcategory/getticketcategorybyid?categoryId=${categoryId}`,
    );
  }
  //#endregion

  //#region update ticekt category
  updatecategory(data) {
    return this.http.post(
      `${this.API}/api/newticketcategory/updatecategory`,
      data,
    );
  }
  //#endregion

  //#region api to get all ticket categories
  getallcategorys() {
    return this.http.get(`${this.API}/api/newticketcategory/getallcategorys`);
  }
  //#endregion

  //#region api to get the subcategories in the ticket category
  getallsubcategorybyid(categoryId) {
    return this.http.get(
      `${this.API}/api/newticketcategory/getallsubcategorybyid?categoryId=${categoryId}`,
    );
  }
  //#endregion

  //#region api to get the priorities in the ticket category
  getallprioritiesbyid(id) {
    return this.http.get(
      `${this.API}/api/newticketcategory/getallprioritiesbyid?categoryId=${id}`,
    );
  }
  //#endregion

  //#region api to upload the files while creating the ticket
  uploadticketmultiple(post) {
    return this.http.post(
      `${this.API}/api/ticketmaster/uploadticketmultiple`,
      post,
    );
  }
  //#endregion

  //#region api will give the list of the tickets crated by the user
  ticketsraised() {
    return this.http.get(`${this.API}/api/ticket/ticketsraised`);
  }
  //#endregion

  //#region api will give the list of open ticket on the reciver side
  openticket(data) {
    return this.http.post(`${this.API}/api/ticket/openticket`, data);
  }
  //#endregion

  //#region api will give the list of closed ticket on the reciver side
  closeticket(data) {
    return this.http.post(`${this.API}/api/ticket/closeticket`, data);
  }
  //#endregion

  //#region api will give the data of the ticket on the reciver side
  getticketdetails(ticketId) {
    return this.http.get(
      `${this.API}/api/ticket/getticketdetails?ticketId=${ticketId}`,
    );
  }
  //#endregion

  //#region api to add the comment to the ticket
  createticketcomment(data) {
    return this.http.post(`${this.API}/api/ticket/createticketcomment`, data);
  }
  //#endregion

  //#region api to get all assignee in the ticket category
  ticketcategoryidemp(categoryId) {
    return this.http.get(
      `${this.API}/api/ticket/ticketcategoryidemp?ticketCategoryId=${categoryId}`,
    );
  }
  //#endregion

  //#region api to update the ticket status
  updateticket(data) {
    return this.http.post(`${this.API}/api/ticket/updateticket`, data);
  }
  //#endregion

  //#region api to rais the ticekt
  createticket(data) {
    return this.http.post(`${this.API}/api/ticket/createticket`, data);
  }
  //#endregion

  //#region api to reopen the ticket which is closed by the assignee
  updateticketstatus(data) {
    return this.http.post(`${this.API}/api/ticket/updateticketstatus`, data);
  }
  //#endregion

  //#region api to get the report of the ticket
  getticketdata(post) {
    return this.http.post(`${this.API}/api/ticketreport/getticketdata`, post);
  }
  //#endregion
}
