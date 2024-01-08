import { DOCUMENT } from "@angular/common";
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
// import { ROUTES } from "./sidebar-items";
import { SidebarService } from "src/app/core/service/sidebar.service";
import { RouteInfo } from "./sidebar.metadata";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public sidebarItems: any[];
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  userFullName: string;
  userImg: string;
  userType: string;
  headerHeight = 60;
  currentRoute: string;
  routerObj = null;
  isHover: boolean = false;
  selectedIndex: any;
  routeData: RouteInfo[];
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private router: Router,
    private sidebarservice: SidebarService,
  ) {
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, "overlay-open");
      }
    });
  }
  @HostListener("window:resize", ["$event"])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, "overlay-open");
    }
  }
  @HostListener("window:popstate", ["$event"])
  onPopState(event) {
    setTimeout(() => {
      location.reload();
    }, 500);
  }
  ngOnInit() {
    const routeObservable = this.sidebarservice.getSidebar();
    routeObservable.subscribe((routeData: RouteInfo[]) => {
      this.routeData = routeData;
      let currentURL = this.router.url;
      this.routeData.map((elm) => {
        if (elm.path === currentURL) {
          elm.isHover = true;
        } else {
          elm.isHover = false;
        }
      });
    });

    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }

  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }
  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + "";
    this.listMaxWidth = "500px";
  }
  isOpen() {
    return this.bodyTag.classList.contains("overlay-open");
  }
  checkStatuForResize(firstTime) {
    // Collapse sideBar
    if (window.innerWidth < 1024) {
      this.renderer.addClass(this.document.body, "ls-closed");
    } else {
      this.renderer.removeClass(this.document.body, "ls-closed");
    }
  }
  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest("body");
    if (body.classList.contains("submenu-closed")) {
      this.renderer.addClass(this.document.body, "side-closed-hover");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    }
  }
  mouseover(e) {
    e.isHover = true;
  }
  mouseout(e) {
    e.isHover = false;
  }

  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest("body");
    if (body.classList.contains("side-closed-hover")) {
      this.renderer.removeClass(this.document.body, "side-closed-hover");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }
  logout() { }
  hoverIcon(selectedindex) {
    this.selectedIndex = selectedindex;
  }
  routeMenu(data) {
    this.routeData.map((elm) => {
      if (elm.submenu.length > 0) {
        elm.path = elm.submenu[0].path;
      }
      if (elm.path === data.path) {
        elm.isHover = true;
      } else {
        elm.isHover = false;
      }
    });
    this.router.navigate([data.path]);
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
        return "#e75480";
      }
      case "theme-tsf": {
        return "#007dc2";
      }
    }
  }

  checkiconhover(sidebarItem) {
    let icon = localStorage.choose_skin;
    switch (icon) {
      case "theme-blue": {
        return sidebarItem.iconBlue;
      }
      case "theme-orange": {
        return sidebarItem.iconSaffron;
      }
      case "theme-tsf": {
        return sidebarItem.iconTSF;
      }
      case "theme-pink": {
        return sidebarItem.iconPink;
      }
    }
  }
}
