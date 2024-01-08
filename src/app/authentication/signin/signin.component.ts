import * as microsoftTeams from "@microsoft/teams-js";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MsalService } from "@azure/msal-angular";
import { AuthenticationResult } from "@azure/msal-browser";
import { AuthService } from "src/app/core/service/auth.service";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  hide = true;
  error = "";
  profiledata: any = {};
  statusReason: any;
  Password: any;
  UserName: any;
  logindata: Object;
  login = false;
  url: string;
  microsoft: any;
  url1: string;
  urls: any;
  google: any;
  urlRoute: any;
  category: any;
  showButton = true;
  formShow = false;
  token: string;
  urlLink = this.router.url;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private ToastrService: ToastrService,
    private MsalService: MsalService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    // sessionStorage.clear();
    var _this = this;
    if (microsoftTeams != undefined) {
      microsoftTeams.getContext(function (context) {
        if (context) {
          JSON.stringify(context);
          if (context) {
            // this.MSALLogin(context.loginHint);
            let post = {
              officeEmail: context.loginHint,
            };
            _this.authService.newuserlogin(post).subscribe((data: any) => {
              if (data.status) {
                localStorage.setItem("token", data.acces_Token);
                _this.userdetails(data.acces_Token);
                _this.login = false;
              } else {
                _this.login = false;
                _this.ToastrService.error(data.message);
              }
            });
          }
        } else {
        }
      });
    }

    this.urlLink == "http://localhost:4400/";

    this.activatedRoute.queryParams.subscribe((p) => (this.urlRoute = p));
    if (this.urlRoute.token != undefined) {
      localStorage.setItem("token", this.urlRoute.token);
    }
    this.token = localStorage.getItem("token");
    if (
      this.token != null ||
      this.token != undefined ||
      this.token != "undefined"
    ) {
      this.userdetails(this.token);
    } else {
      this.router.navigate["/authentication/login"];
    }

    this.loginForm = this.formBuilder.group({
      UserName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ]),
      ],
      Password: ["", Validators.required],
    });

    this.url1 = location.origin;
    this.url = environment.API_URL;
    this.ExternalLogins(this.url1);
  }

  LoginwithEmail() {
    this.showButton = !this.showButton;
    this.formShow = !this.formShow;
  }

  userdetails(data) {
    this.authService.getuserlogindetail(data).subscribe((data: any) => {
      if (data != null) {
        this.profiledata = data;
        this.login = false;
        if (this.profiledata.roleType == "SuperAdmin") {
          this.router
            .navigate(["/super-admin/superadmin-dasboard"])
            .then(() => {});
          localStorage.setItem(
            btoa("ROLE"),
            btoa(JSON.stringify("SuperAdmin")),
          );
        } else {
          this.router.navigate(["crm/row-data"]).then(() => {});
          localStorage.setItem(btoa("ROLE"), btoa(JSON.stringify("Admin")));
        }
        localStorage.setItem("roleType", "Admin");
        localStorage.setItem("employeeId", data.employeeId);
        localStorage.setItem("profileImageUrl", data.profileImage);
        localStorage.setItem("companyDomain", data.companyDomain);
        localStorage.setItem("companyLogo", data.companyLogo);
        localStorage.setItem("STATE", "true");
        localStorage.setItem("companyId", data.companyId);
        localStorage.setItem("FULLNAME", this.profiledata.displayName);
        localStorage.setItem("userid", this.profiledata.employeeId);
        localStorage.setItem("USERIMG", "assets/images/user/admin.jpg");
        localStorage.setItem("choose_skin", "theme-blue");
        localStorage.setItem("choose_skin_active", "blue");
        this.ToastrService.success("Welcome " + this.profiledata.displayName);
        // const menuOption = "menu_dark";
        // localStorage.setItem("choose_logoheader", "logo-black");
        // localStorage.setItem("menuOption", menuOption);
        // localStorage.setItem("companyWebSiteURL", data.companyWebSiteURL);
        // localStorage.setItem("isAdminInCompany", data.isAdminInCompany);
      }
    });
  }

  ExternalLogins(url) {
    this.authService.ExternalLogins(url).subscribe((res: any) => {
      if (res.status) {
        this.microsoft = res.data[1].url;
        this.google = res.data[0].url;
        this.urls = res.data[1].url;
      }
    });
  }

  logInWithMicrosoft() {
    // window.location.href = this.url + this.urls;
    sessionStorage.clear();
    this.MsalService.loginPopup().subscribe((res: AuthenticationResult) => {
      this.MsalService.instance.setActiveAccount(res.account);
      this.MSALLogin(res.account.username);
    });
  }
  googleLogIn() {
    window.location.href = this.url + this.google;
    // this.SocialAuthService.authState.subscribe(res => {
    // });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(value: boolean) {
    this.login = value;
    this.submitted = true;
    if (
      this.loginForm.value.UserName == "" ||
      this.loginForm.value.Password == ""
    ) {
      this.login = false;
      return this.ToastrService.error("Please Use Login Credentials For Login");
    }
    if (this.loginForm.invalid) {
      this.login = false;
      return this.ToastrService.error(
        "Please Use Proper Login Credentials For Login",
      );
    }
    let post = {
      userName: this.loginForm.value.UserName,
      password: this.loginForm.value.Password,
    };

    this.authService.userlogin(post).subscribe((data: any) => {
      if (data.status) {
        localStorage.setItem("token", data.acces_Token);
        this.userdetails(data.acces_Token);
        this.sendFCMToken();
        this.login = false;
      } else {
        this.login = false;
        this.ToastrService.error(data.message);
      }
    });
  }

  MSALLogin(officeEmail) {
    let post = {
      officeEmail: officeEmail,
    };
    this.authService.newuserlogin(post).subscribe((data: any) => {
      if (data.status) {
        localStorage.setItem("token", data.acces_Token);
        this.userdetails(data.acces_Token);
        this.login = false;
      } else {
        this.login = false;
        this.ToastrService.error(data.message);
      }
    });
  }

  sendFCMToken() {
    let FCM = localStorage.getItem("FCM");
    let post = {
      FCMToken: "",
      PCFCMToken: FCM,
    };
    // this.authService.newSendFCM(post).subscribe(res => { return })
  }
}
