import {
  HttpBackend,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { AuthService } from "src/app/core/service/auth.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TokenServiceService {
  requrl: any;
  baseURl = environment.API_URL;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private httpBackend: HttpBackend,
  ) {
    // var token = localStorage.getItem('token');
    // var decoded = jwt_decode(token);
  }

  intercept(req, next) {
    // this.loaderService.show();/**UNHIDE FOR LOADER */
    let url = new URL(req.url);
    let urlname = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
    if (urlname !== "token") {
      let tokenizedReq = req.clone();
      const token = localStorage.getItem("token");
      tokenizedReq = tokenizedReq.clone({
        setHeaders: {
          Authorization: `bearer ${token}`,
        },
        body: tokenizedReq.body,
      });

      return next.handle(tokenizedReq).pipe(
        tap(
          () => {},
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(["/authentication/signin"]);
                localStorage.clear();
                // return this.errorhandle(req, next, err.url);
              }
            }
          },
        ),
      );
    } else {
      let tokenizedReq = req.clone();
      // const token = localStorage.token;
      // tokenizedReq = tokenizedReq.clone({
      //   setHeaders: {
      //     Authorization: `bearer ${token}`
      //   },
      //   body: tokenizedReq.body
      // });
      return next.handle(tokenizedReq);
    }
  }

  errorhandle(req, next, url) {
    var token = localStorage.getItem("refreshToken");

    let header = new HttpHeaders().set("Authorization", "bearer " + token);
    this.httpBackend
      .handle(
        new HttpRequest(
          "GET",
          `${this.baseURl}/api/isamanager/getnewtsfaccesstoken`,
          { headers: header },
        ),
      )
      .subscribe(
        (res: any) => {
          localStorage.setItem("accessToken", res.body);
        },
        (e) => {},
        () => {
          location.reload();
        },
      );

    // return this.http.get("http://192.168.1.117:8091/api/isamanager/getnewtsfaccesstoken", {headers:header}).subscribe(res =>{

    // });
    // let url = new URL(`api/isamanager/getnewtsfaccesstoken`);
    //     let tokenizedReq = req.clone();
    //     var token = localStorage.getItem('refreshToken');

    //     tokenizedReq = tokenizedReq.clone({
    //       setHeaders: {
    //           Authorization: `bearer ${token}`
    //         },
    //         body: tokenizedReq.body,
    //         url: `http://192.168.1.117:8091/api/isamanager/getnewtsfaccesstoken`
    //     });

    //      return  next.handle(tokenizedReq).pipe(
    //       tap(evt => {
    //       }),
    // );

    // this.authenticationService.getnewtsfaccesstoken(true).subscribe((res: any) => {
    // })
    // return next.handle(tokenizedReq).pipe(tap(() => { },
    // (err :any) => {
    //   if (err instanceof HttpErrorResponse) {
    //     if (err.status === 401) {
    //       return this.getnewaccess();
    //     }
    //   }
    // }
    // ))
  }

  // getnewaccess() {
  //   this.authenticationService.getnewtsfaccesstoken(true).subscribe((res: any) => {
  //   })
  // }
}
