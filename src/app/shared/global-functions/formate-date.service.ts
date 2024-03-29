import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormateDateService {
  constructor() {}

  //#region function to remove the time from the date to send the data
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("/");
  }
  //#endregion
}
