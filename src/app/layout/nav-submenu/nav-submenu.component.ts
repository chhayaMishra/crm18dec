import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ROUTES } from "../sidebar/sidebar-items";

@Component({
  selector: "app-nav-submenu",
  templateUrl: "./nav-submenu.component.html",
  styleUrls: ["./nav-submenu.component.scss"],
})
export class NavSubmenuComponent implements OnInit {
  menuData: any;
  subMenu: any = [];
  constructor(private router: Router) {}

  ngOnInit() {}

  showSubMenu() {
    let url = window?.location?.href;
    let currentURL = this.router.url;

    let RouteData = [...ROUTES];

    RouteData.forEach((element) => {
      if (element?.path === currentURL) {
        this.subMenu = element.submenu;
      } else {
        let a = url.split("#")[1].split("/")[1];
        let b = element.path.split("/")[1];
        if (a === b) {
          element.path = currentURL;
        }
      }
    });
    if (this.subMenu.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  activeSubmenu(data) {
    let currentURL = this.router.url;
    let style = {};
    if (currentURL.includes(data.path)) {
      style = {
        backgroundColor: this.checkcolor(),
        color: "white",
        fontFamily: "poppins",
        width: "100%",
        paddingInline: "2rem",
        marginLeft: "auto",
        marginRight: "auto",
      };
      return style;
    } else {
      style = {
        color: "rgb(97, 101, 118) ",
        fontFamily: "poppins",
      };
      return style;
    }
  }

  checkcolor() {
    let data = localStorage.choose_skin;
    switch (data) {
      case "theme-orange": {
        return "#FF6154";
      }
      case "theme-black": {
        return "#4691FF";
      }
      case "theme-white": {
        return "#4691FF";
      }
      case "theme-blue": {
        return "#4691FF";
      }
      case "theme-pink": {
        return "#E75480";
      }
      case "theme-tsf": {
        return "#007dc2";
      }
    }
  }
}
