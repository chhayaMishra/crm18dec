import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityserviceService {

  constructor(private http:HttpClient,private toastr: ToastrService) { }
  UtiltyURL = environment.UtiltyURL;


  //http://192.168.1.50:8053/api/Utility/GetAllByCompanyGroup

  GetAllByCompanyGroupSuperadmin()
  {
   return this.http.get(`${this.UtiltyURL}/api/Utility/GetAllByCompanyGroup`);
  }
  GetSuperadmin()
  {
   return this.http.get(`${this.UtiltyURL}/api/Utility/Get`);
  }
  GetByIdSuperadmin(utilityid:any)
  {
   return this.http.get(`${this.UtiltyURL}/api/Utility/GetById?id=${utilityid}`);
  }
  GetByCompanyIdSuperadmin(companyId:any)
  {
   return this.http.get(`${this.UtiltyURL}/api/Utility/GetByCompanyId?companyid=${companyId}`);
  }
  CreateSuperadmin(data:any)
  {
   return this.http.post(`${this.UtiltyURL}/api/Utility/Create`,data);
  }
  UpdateSuperadmin(data:any)
  {
   return this.http.put(`${this.UtiltyURL}/api/Utility/Update`,data);
  }

  DeleteSuperadminUtility(id:any)
  {
   return this.http.patch(`${this.UtiltyURL}/api/Utility/Delete?id=${id}`,'');
  }
  GetAllCompanies()
  {
   return this.http.get(`${this.UtiltyURL}/api/Utility/GetAllCompanies`);
  }

  
  showToaster(msg:any) {
    return this.toastr.success(msg, 'Success');
    }
    showErrorToaster(msg:any) {
      return this.toastr.error(msg, 'Success');
      }
  //api/Utility/Delete
}
