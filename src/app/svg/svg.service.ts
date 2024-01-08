import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SvgService {
  public Images: any;

  constructor() {
    this.getSvg();
  }

  getSvg() {
    this.Images = [
      {
        home: "../../assets/images/icons/Group 34696.png",
        user: "",
        helpdesk: "",
        project: "",
        notification: "",
        Efms: "",
        organization: "",
        emossy: "",
        ourEmployee: "",
        approval: "",
        recruitment: "",
        assetmaster: "",
        payroll: "",
        career: "",
        performance: "",
        ouritranet: "",
        faq: "",
        permission: "",
        clientmaster: "",
      },
    ];

    return this.Images;
  }
}
