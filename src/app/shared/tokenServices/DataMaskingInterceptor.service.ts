import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class DataMaskingInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // Clone the request to modify it without affecting the original request.
    let modifiedRequest = request.clone({
      // Modify the request body here to mask or obfuscate sensitive data.
      body: this.maskSensitiveData(request.body),
    });
    const token = localStorage.getItem("token");
    modifiedRequest = modifiedRequest.clone({
      setHeaders: {
        Authorization: `bearer ${token}`,
      },
      body: modifiedRequest.body,
    }); // Continue with the modified request.
    return next.handle(modifiedRequest);
  }

  private maskSensitiveData(data: any): any {
    // Implement your logic to mask or modify sensitive data here.
    // You can use regular expressions, encryption, or other methods as needed.
    // For example, replace all occurrences of 'password' with '***':
    return this.deepMask(data);
  }

  private deepMask(obj: any): any {
    obj = "data";
    return obj;
    // if (typeof obj === 'string') {
    //   return obj.replace(/password/g, '***');
    // } else if (typeof obj === 'object') {
    //   const result = {};
    //   for (const key in obj) {
    //     result[key] = this.deepMask(obj[key]);
    //   }
    //   return result;
    // } else {
    //   return obj;
    // }
  }
}
