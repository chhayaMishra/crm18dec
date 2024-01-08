import { Component } from "@angular/core";
import { Event, NavigationEnd, NavigationStart, Router } from "@angular/router";
import { MsalService } from "@azure/msal-angular";
import * as microsoftTeams from "@microsoft/teams-js";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  currentUrl: string;
  loginDisplay = false;

  constructor(
    public _router: Router,
    private authService: MsalService,
  ) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        // location.onPopState(() => {
        //   window.location.reload();
        // });
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf("/") + 1,
        );
      }
      if (routerEvent instanceof NavigationEnd) {
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {
    microsoftTeams.initialize();
  }

  login() {
    this.authService.loginPopup().subscribe({
      next: (result) => {
        this.setLoginDisplay();
      },
      error: (error) => {},
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }
}
