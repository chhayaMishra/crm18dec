import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  API = environment.API_URL;

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

  newSendFCM(post) {
    return this.http.post(`${this.API}/api/notification/addupdatetoken`, post);
  }
}
