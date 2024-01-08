import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AssetsService {
  API = environment.API_URL;

  constructor(private http: HttpClient) { }

  //#region api to get assets dashboard data
  assetsdashboard() {
    return this.http.get(`${this.API}/api/assetsdashboard/assetsdashboard`);
  }
  //#endregion

  //#region api to get expired assets dashboard data
  expiredashboard() {
    return this.http.get(`${this.API}/api/assetsdashboard/expiredashboard`);
  }
  //#endregion

  //#region api to get all base category
  getassetstypeenum() {
    return this.http.get(`${this.API}/api/basecategory/getassetstypeenum`);
  }
  //#endregion

  //#region api to get the base category
  getbasecategorybyassetstypeid(post) {
    return this.http.post(
      `${this.API}/api/assestitemmaster/getbasecategorybyassetstypeid`,
      post,
    );
  }
  //#endregion

  //#region api to get the category by base category id
  getallcategorybybasecategoryid(id) {
    return this.http.get(
      `${this.API}/api/assestitemmaster/getallcategorybybasecategoryid?baseCategoryId=${id}`,
    );
  }
  //#endregion

  //#region api to get the category by base category id
  getallbasecategorymulltipel(post) {
    return this.http.post(
      `${this.API}/api/assestitemmaster/getallbasecategorymulltipel`,
      post,
    );
  }
  //#endregion

  //#region api to get condition enum
  getallconditionenum() {
    return this.http.get(
      `${this.API}/api/assestitemmaster/getallconditionenum`,
    );
  }
  //#endregion

  //#region api to get the assets status
  getasseststatusenum() {
    return this.http.get(
      `${this.API}/api/assestitemmaster/getasseststatusenum`,
    );
  }
  //#endregion

  //#region api to get the list of all employee
  getallemployeelist() {
    return this.http.get(`${this.API}/api/assestitemmaster/getallemployeelist`);
  }
  //#endregion

  //#region api to get the list of all assets in the company
  getallassestitemmaster(post) {
    return this.http.post(
      `${this.API}/api/assestitemmaster/getallassestitemmaster`,
      post,
    );
  }
  //#endregion

  //#region api to delete the asset
  deleteitem(post) {
    return this.http.put(`${this.API}/api/assestitemmaster/deleteitem`, post);
  }
  //#endregion

  //#region api to get the list of assets assigned
  getallassigneassest(post) {
    return this.http.post(
      `${this.API}/api/assestitemmaster/getallassigneassest`,
      post,
    );
  }
  //#endregion

  //#region api to upload images while recovering assets
  recoverassetsimages(post) {
    return this.http.post(
      `${this.API}/api/assetsnew/recoverassetsimages`,
      post,
    );
  }

  //#endregion

  //#region api to recover assets from the employee
  recoverdassets(post) {
    return this.http.post(
      `${this.API}/api/assestitemmaster/recoverdassets`,
      post,
    );
  }
  //#endregion

  //#region api to get the list of assets for the assets report
  getassestreport(post) {
    return this.http.post(
      `${this.API}/api/assetsdashboard/getassestreport`,
      post,
    );
  }
  //#endregion

  //#region api to get all the warehouse
  getallwarehousefordropdown() {
    return this.http.get(
      `${this.API}/api/warehouse/getallwarehousefordropdown`,
    );
  }
  //#endregion

  //#region api to get the list of base category
  getallbasecategoryfordropdown() {
    return this.http.get(
      `${this.API}/api/basecategory/getallbasecategoryfordropdown`,
    );
  }
  //#endregion

  //#region api to get all the warehouse
  getallwarehouse(post) {
    return this.http.post(`${this.API}/api/warehouse/getallwarehouse`, post);
  }
  //#endregion

  //#region api to add  update warehouse
  addwarehouse(post) {
    return this.http.post(`${this.API}/api/warehouse/addwarehouse`, post);
  }
  //#endregion

  //#region api to update update warehouse
  updatewarehouse(post) {
    return this.http.post(`${this.API}/api/warehouse/updatewarehouse`, post);
  }
  //#endregion

  //#region api to get the warehouse information using the warehouse id
  getwarehousebyid(warehouseId) {
    return this.http.get(
      `${this.API}/api/warehouse/getwarehousebyid?wareHouseId=${warehouseId}`,
    );
  }
  //#endregion

  //#region api to delete the warehouse
  deletewarehouse(wareHouseId) {
    return this.http.delete(
      `${this.API}/api/warehouse/deletewarehouse?wareHouseId=${wareHouseId}`,
    );
  }
  //#endregion

  //#region api to get all of the base category
  getallbasecategory(post) {
    return this.http.post(
      `${this.API}/api/basecategory/getallbasecategory`,
      post,
    );
  }
  //#endregion

  //#region api to get all categories
  getallcategory(post) {
    return this.http.post(`${this.API}/api/category/getallcategory`, post);
  }
  //#endregion

  //#region api to add base category
  addbasecategory(post) {
    return this.http.post(`${this.API}/api/basecategory/addbasecategory`, post);
  }
  //#endregion

  //#region api to update base category
  updatebasecategory(post) {
    return this.http.post(
      `${this.API}/api/basecategory/updatebasecategory`,
      post,
    );
  }
  //#endregion

  //#region api to upload assets icon image
  uploadeassetsiconimg(post) {
    return this.http.post(
      `${this.API}/api/category/uploadeassetsiconimg`,
      post,
    );
  }
  //#endregion

  //#region api to add category
  addcategory(post) {
    return this.http.post(`${this.API}/api/category/addcategory`, post);
  }
  //#endregion

  //#region api to update category
  updatecategory(post) {
    return this.http.post(`${this.API}/api/category/updatecategory`, post);
  }
  //#endregion

  //#region api to get base category data using id
  getbasecategorybyid(id) {
    return this.http.get(
      `${this.API}/api/basecategory/getbasecategorybyid?baseCategoryId=${id}`,
    );
  }
  //#endregion

  //#region api to delete base category
  deletbasecategory(id) {
    return this.http.get(
      `${this.API}/api/basecategory/deletbasecategory?baseCategoryId=${id}`,
    );
  }
  //#endregion

  //#region api to get category information using category id
  getcategorybyid(id) {
    return this.http.get(
      `${this.API}/api/category/getcategorybyid?categoryId=${id}`,
    );
  }
  //#endregion

  //#region api to delete category using category id
  deletecategory(id) {
    return this.http.get(
      `${this.API}/api/category/deletecategory?categoryId=${id}`,
    );
  }
  //#endregion

  //#region api to get deleted assets
  getdeletedassets(post) {
    return this.http.post(
      `${this.API}/api/assestitemmaster/getdeletedassets`,
      post,
    );
  }
  //#endregion

  //#region api to get all archived assets
  getarchiveassetsitem(post) {
    return this.http.post(
      `${this.API}/api/assestitemmaster/getarchiveassetsitem`,
      post,
    );
  }
  //#endregion

  //#region api to add the assets
  additemmaster(post) {
    return this.http.post(
      `${this.API}/api/assestitemmaster/additemmaster`,
      post,
    );
  }
  //#endregion

  //#region api to update the assets
  edititemmaster(post) {
    return this.http.post(
      `${this.API}/api/assestitemmaster/edititemmaster`,
      post,
    );
  }
  //#endregion

  //#region api to upload the image of the assets
  uploadassetImages(post) {
    return this.http.post(`${this.API}/api/assetsnew/assignassetsimages`, post);
  }
  //#endregion

  //#region api to upload images in assets for the
  uploadmulltiassetsimg(post) {
    return this.http.post(
      `${this.API}/api/assestitemmaster/uploadmulltiassetsimg`,
      post,
    );
  }
  //#endregion

  //#region api to api to get the information about asset using asset id
  getassetsbyitemid(id) {
    return this.http.get(
      `${this.API}/api/assestitemmaster/getassetsbyitemid?itemId=${id}`,
    );
  }
  //#endregion

  //#region api to get the list of faulty assets
  getfaultyimport(post) {
    return this.http.post(
      `${this.API}/api/assetsimportexport/getfaultyimport`,
      post,
    );
  }

  //#endregion

  //#region api to download the faulty import
  getfaultyimportdatalist(id) {
    return this.http.get(
      `${this.API}/api/assetsimportexport/getfaultyimportdatalist?groupId=${id}`,
    );
  }
  //#endregion

  //#region api to archive asset
  archiveassetsitem(post) {
    return this.http.put(
      `${this.API}/api/assestitemmaster/archiveassetsitem`,
      post,
    );
  }
  //#endregion

  //#region api to get assets for theexpire section
  getexpireassestitemlist(post) {
    return this.http.post(
      `${this.API}/api/assetsdashboard/getexpireassestitemlist`,
      post,
    );
  }
  //#endregion

  //#region api to renew the asset which got expired
  renewexpireassets(post) {
    return this.http.post(
      `${this.API}/api/assetsdashboard/renewexpireassets`,
      post,
    );
  }
  //#endregion

  //#region api to assign the asset to the employee
  assigneeassetstoemployee(post) {
    return this.http.post(`${this.API}/api/assestitemmaster/assigneeassetstoemployee`, post,);
  }
  //#endregion

  //#region api to get the data of history of recover asset using asset id
  gethistorybyitemid(post) {
    return this.http.post(`${this.API}/api/assetsitemhistory/gethistorybyitemid`, post,);
  }
  //#endregion

  //#region api to restre asset from the deleted table
  restoredeleteassets(Id) {
    return this.http.get(`${this.API}/api/assestitemmaster/restoredeleteassets?itemId=${Id}`,);
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

  //#region api to
  //#endregion
}
