import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const EXCEL_EXTENSION = ".xlsx";
@Injectable({
  providedIn: "root",
})
export class CrmService {
  CreateSuperadmin(post: {
    utilityName: any;
    linkUrl: any;
    userName: any;
    userToken: any;
    serverIp: any;
    companyId: any;
    isEnabled: any;
  }) {
    throw new Error("Method not implemented.");
  }
  showToaster(arg0: string) {
    throw new Error("Method not implemented.");
  }

  API = environment.API_URL;
  backendUrl = environment.backend;
  private apiUrl = "http://192.168.1.50:8086/api/project/GetProjectmanager";
  constructor(private http: HttpClient) {}

  ExternalLogins(url) {
    return this.http.get(
      `${this.API}/api/accounts/ExternalLogins?returnUrl=${url}`,
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
  }

  userlogintsf(userValue) {
    return this.http.post(`${this.API}/api/accounts/userlogintsf`, userValue);
  }

  userlogin(post) {
    return this.http.post(`${this.API}/api/accounts/userlogin`, post);
  }

  newuserlogin(post) {
    return this.http.post(`${this.API}/api/accounts/newuserlogin`, post);
  }

  getuserlogindetail(data) {
    return this.http.post(
      `${this.API}/api/accounts/getuserlogindetail?token=${data}`,
      data,
    );
  }

  //ACCOUNT API

  createaccount(post) {
    return this.http.post(`${this.backendUrl}/api/account/createaccount`, post);
  }

  getlistofaccount() {
    return this.http.get(`${this.backendUrl}/api/account/getlistofaccount`);
  }

  getaccountbyid(accountId) {
    return this.http.get(
      `${this.backendUrl}/api/account/getaccountbyid?accountId=${accountId}`,
    );
  }

  editaccountentity(post: any) {
    return this.http.put(
      `${this.backendUrl}/api/account/editaccountentity`,
      post,
    );
  }

  deleteaccount(AccountId: any) {
    debugger;
    return this.http.delete(
      `${this.backendUrl}/api/account/deleteaccount?accountId=${AccountId}`,
    );
  }

  getAccount(
    pageNumber: number,
    pageSize: number,
    keyword: string = "",
  ): Observable<any> {
    const params = {
      pageNumber: pageNumber.toString(),

      pageSize: pageSize.toString(),

      keyword: keyword,
    };

    return this.http.get(`${this.backendUrl}/api/account/getlistofaccount`, {
      params,
    });
  }

  //  LEAD API

  createlead(post) {
    debugger;

    return this.http.post(`${this.backendUrl}/api/Lead/createLead`, post);
  }

  getlistoflead() {
    return this.http.get(`${this.backendUrl}/api/Lead/getlistoflead`);
  }

  editleadentity(post: any) {
    return this.http.put(`${this.backendUrl}/api/Lead/editleadentity`, post);
  }

  deletelead(leadId: any) {
    return this.http.delete(
      `${this.backendUrl}/api/Lead/deletelead?leadId=${leadId}`,
    );
  }

  softDeleteLead(leadId: any): Observable<any> {
    const url = `${this.backendUrl}/api/Lead/deletelead`; // Replace with your API endpoint

    return this.http.delete(url, { params: { leadId: leadId } });
  }

  getLeads(
    pageNumber: number,
    pageSize: number,
    keyword: string = "",
  ): Observable<any> {
    const params = {
      pageNumber: pageNumber.toString(),

      pageSize: pageSize.toString(),

      keyword: keyword,
    };

    return this.http.get(`${this.backendUrl}/api/Lead/getlistoflead`, {
      params,
    });
  }

  //OPPORTUNITY API

  // deleteopportunity(Id: any) {
  //   return this.http.delete(
  //     `${this.backendUrl}/api/opportunity/deleteopportunity?Id=${Id}`
  //   );
  // }

  // createopportunity(post) {
  //   debugger;
  //   return this.http.post(
  //     `${this.backendUrl}/api/opportunity/createopportunity`,
  //     post
  //   );
  // }

  // getlistofopportunity() {
  //   return this.http.get(
  //     `${this.backendUrl}/api/opportunity/getlistofopportunity`
  //   );
  // }

  // getopportunitybyid(opportunityId: any) {
  //   return this.http.get(
  //     `${this.backendUrl}/api/opportunity/getopportunitybyid=${opportunityId}`
  //   );
  // }

  // editOpportunity(post: any) {
  //   return this.http.put(`${this.backendUrl}/api/Lead/editleadentity`, post);
  // }

  // getopportunity(
  //   pageNumber: number,
  //   pageSize: number,
  //   keyword: string = ""
  // ): Observable<any> {
  //   const params = {
  //     pageNumber: pageNumber.toString(),
  //     pageSize: pageSize.toString(),
  //     keyword: keyword,
  //   };
  //   return this.http.get(
  //     `${this.backendUrl}/api/opportunity/getlistofopportunity`,
  //     { params }
  //   );
  // }

  createopportunity(post) {
    debugger;

    return this.http.post(
      `${this.backendUrl}/api/opportunity/createopportunity`,

      post,
    );
  }

  editOpportunity(put) {
    debugger;

    return this.http.put(
      `${this.backendUrl}/api/opportunity/editopportunity`,

      put,
    );
  }

  getlistofopportunity() {
    return this.http.get(
      `${this.backendUrl}/api/opportunity/getlistofopportunity`,
    );
  }

  getopportunitybyid(opportunityId: any) {
    return this.http.get(
      `${this.backendUrl}/api/opportunity/getopportunitybyid=${opportunityId}`,
    );
  }

  getopportunity(
    pageNumber: number,

    pageSize: number,

    keyword: string = "",
  ): Observable<any> {
    const params = {
      pageNumber: pageNumber.toString(),

      pageSize: pageSize.toString(),

      keyword: keyword,
    };

    return this.http.get(
      `${this.backendUrl}/api/opportunity/getlistofopportunity`,

      { params },
    );
  }

  deleteopportunity(Id: any) {
    return this.http.delete(
      `${this.backendUrl}/api/opportunity/deleteopportunity?Id=${Id}`,
    );
  }

  softDeleteOpportunity(Id: any): Observable<any> {
    debugger;

    const url = `${this.backendUrl}api/opportunity/deleteopportunity`; // Replace with your API endpoint

    return this.http.delete(url, { params: { Id: Id } });
  }

  //Contact API

  getContact(
    pageNumber: number,
    pageSize: number,
    keyword: string = "",
  ): Observable<any> {
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      keyword: keyword,
    };
    debugger;
    return this.http.get(`${this.backendUrl}/api/contact//getlistofcontact`, {
      params,
    });
  }

  deletecontact(contactId: any) {
    return this.http.delete(
      `${this.backendUrl}/api/contact/deletecontact?contactId=${contactId}`,
    );
  }
  softDeleteContact(contactId: any): Observable<any> {
    const url = `${this.backendUrl}/api/contact/deletecontact`; // Replace with your API endpoint
    return this.http.delete(url, { params: { contactId: contactId } });
  }

  createcontact(post) {
    return this.http.post(`${this.backendUrl}/api/contact/createcontact`, post);
  }
  getlistofcontact() {
    return this.http.get(`${this.backendUrl}/api/contact/getlistofcontact`);
  }
  getcontactbyid(contactId: any) {
    return this.http.get(
      `${this.backendUrl}/api/contact/getcontactbyid?contactId=${contactId}`,
    );
  }

  editcontactentity(post: any) {
    debugger;
    return this.http.put(
      `${this.backendUrl}/api/contact/editcontactentity`,
      post,
    );
  }

  //CURRENY API

  createcurrency(post) {
    // debugger;

    return this.http.post(
      `${this.backendUrl}/api/currency/createcurrency`,
      post,
    );
  }

  getlistofcurrency() {
    debugger;

    return this.http.get(`${this.backendUrl}/api/currency/getlistofcurrency`);
  }

  getcurrencybyid(CurrencyId) {
    return this.http.get(
      `${this.backendUrl}/api/currency/getcurrencybyid?CurrencyId=${CurrencyId}`,
    );
  }

  editcurrencyentity(post: any) {
    // debugger;

    return this.http.put(
      `${this.backendUrl}/api/currency/editcurrencyentity`,

      post,
    );
  }

  deletecurrency(currencyId: any) {
    return this.http.delete(
      `${this.backendUrl}/api/currency/deletecurrency?CurrencyId=${currencyId}`,
    );
  }

  getcurrency(
    pageNumber: number,

    pageSize: number,

    keyword: string = "",
  ): Observable<any> {
    const params = {
      pageNumber: pageNumber.toString(),

      pageSize: pageSize.toString(),

      keyword: keyword,
    };

    return this.http.get(`${this.backendUrl}/api/currency/getlistofcurrency`, {
      params,
    });
  }

  //TECHNOLOGY API

  createTechno(post) {
    return this.http.post(
      `${this.backendUrl}/api/Technology/createTechno`,
      post,
    );
  }

  getlistofTechno() {
    return this.http.get(`${this.backendUrl}/api/Technology/getlistofTechno`);
  }

  getTechnobyid(TechnoId: any) {
    return this.http.get(
      `${this.backendUrl}/api/Technology/getTechnobyid=${TechnoId}`,
    );
  }

  editTechnoentity(ed) {
    return this.http.put(
      `${this.backendUrl}/api/Technology/editTechnoentity`,
      ed,
    );
  }
  confirmDelete(TechnoId: any) {
    return this.http.delete(
      `${this.backendUrl}/api/Technology/deleteTechno?TechnoId=${TechnoId}`,
    );
  }

  softDeleteTechnology(TechnoId: any): Observable<any> {
    const url = `${this.backendUrl}/api/Technology/deleteTechno`; // Replace with your API endpoint
    return this.http.delete(url, { params: { TechnoId: TechnoId } });
  }

  getTechno(
    pageNumber: number,
    pageSize: number,
    keyword: string = "",
  ): Observable<any> {
    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      keyword: keyword,
    };

    return this.http.get(`${this.backendUrl}/api/Technology/getlistofTechno`, {
      params,
    });
  }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(workbook, {dateNF:"dd.MM.yyyy"});
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION,
    );
  }

  //import account
  ImportExcelAccount(excelData: any) {
    debugger;
    return this.http.post(
      `${this.backendUrl}/api/account/importaccount`,
      excelData,
    );
  }

  //import lead
  ImportExcelLead(excelData: any) {
    debugger;
    return this.http.post(`${this.backendUrl}/api/lead/importlead`, excelData);
  }

  //import opportuntity

  ImportExcelopportunity(excelData: any) {
    debugger;
    return this.http.post(
      `${this.backendUrl}/api/opportunity/importexcel`,
      excelData,
    );
  }

  //import contact
  ImportExcelContact(excelData: any) {
    debugger;
    return this.http.post(
      `${this.backendUrl}/api/contact/importcontact`,
      excelData,
    );
  }
  ImportExcelRaw(excelData: any) {
    debugger;
    return this.http.post(
      `${this.backendUrl}/api/api/Raw/importraw`,
      excelData,
    );
  }

  getlistofallcurrency() {
    return this.http.get(`${this.backendUrl}/api/currency/getcurrency`);
  }

  getlistofallaccount() {
    return this.http.get(`${this.backendUrl}/api/account/getaccount`);
  }
  getlistofallcontact() {
    return this.http.get(`${this.backendUrl}/api/contact/getcontact`);
  }

  //raw

  getraws(
    pageNumber: number,
    pageSize: number,
    keyword: string = "",
  ): Observable<any> {
    const params = {
      pageNumber: pageNumber.toString(),

      pageSize: pageSize.toString(),

      keyword: keyword,
    };

    return this.http.get(`${this.backendUrl}/api/Raw/getlistofraw`, {
      params,
    });
  }

  createraw(post) {
    debugger;

    return this.http.post(`${this.backendUrl}/api/Raw/createraw`, post);
  }

  // editrawentity(post: any) {
  //   return this.http.put(`${this.backendUrl}/api/Raw/editrawdata`, post);
  // }

  // softDeleteraw(RawId: any): Observable<any> {
  //   const url = `${this.backendUrl}/api/Raw/deleteraw`; // Replace with your API endpoint

  //   return this.http.delete(url, { params: { RawdId: RawId } });
  // }
  editrawentity(ed) {
    return this.http.put(`${this.backendUrl}/api/Raw/editrawdata`, ed);
  }

  softDeleteraw(RawId: any) {
    debugger;
    return this.http.delete(
      `${this.backendUrl}/api/Raw/deleteraw?RawId=${RawId}`,
    );
  }

  //activity api
  getallactivity() {
    return this.http.get(`${this.backendUrl}/api/activity/getallactivity`);
  }

  //activity api
  // getallactivity(){
  //   return this.http.get(`${this.backendUrl}/api/activity/getallactivity`)
  // }
  createactivity(post) {
    return this.http.post(
      `${this.backendUrl}/api/activity/createactivity`,
      post,
    );
  }

  getallactivitybyid(leadId) {
    return this.http.get(
      `${this.backendUrl}/api/activity/getactivitybyid`,
      leadId,
    );
  }
  editactivity(post) {
    return this.http.get(`${this.backendUrl}/api/activity/editactivity`, post);
  }
  getactivitybylead(leadId) {
    return this.http.get(
      `${this.backendUrl}/api/activity/getactivitiesbyleadid?leadId=${leadId}`,
    );
  }
  createactivitybylead(leadId, post) {
    return this.http.post(
      `${this.backendUrl}/api/activity/createactivityforlead?leadId=${leadId}`,
      post,
    );
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // getallactivitybyoppoId(oppoId){
  //   debugger
  //   return this.http.get(`${this.backendUrl}/api/activity/getactivitiesbyoppoid?oppoId=${oppoId}`)
  // }

  getallactivitybyoppoId(oppoId) {
    debugger;
    return this.http.get(
      `${this.backendUrl}/api/activity/getactivitiesbyoppid?oppoId=${oppoId}`,
    );
  }
  createactivitybyoppo(oppoId, post) {
    debugger;
    return this.http.post(
      `${this.backendUrl}/api/activity/createactivityforoppo?oppoId=${oppoId}`,
      post,
    );
  }
}
