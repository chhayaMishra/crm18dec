import { getSvg } from "src/app/svg/svgIcon";
import { RouteInfo } from "./sidebar.metadata";

export const ROUTES: RouteInfo[] = [
  {
    path: "/admin/dashboard/main",
    title: "Row",
    icon: getSvg[0]?.home,
    iconBlue: getSvg[0]?.homeBlue,
    iconSaffron: getSvg[0]?.homeOrange,
    iconTSF: getSvg[0]?.homeTSF,
    iconPink: getSvg[0]?.homePink,
    isHover: false,
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [],
  },
  {
    path: "/attendance-master/holiday",
    title: "Lead",
    icon: getSvg[0]?.helpDesk,
    iconBlue: getSvg[0]?.helpDeskBlue,
    iconSaffron: getSvg[0]?.helpDeskOrange,
    iconTSF: getSvg[0]?.helpDeskTSF,
    iconPink: getSvg[0]?.helpDeskPink,
    isHover: false,
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      // {
      //   path: "attendance-master/holiday",
      //   title: "Holiday",
      //   icon: getSvg[0]?.helpDesk,
      //   iconBlue: getSvg[0]?.helpDeskBlue,
      //   iconSaffron: getSvg[0]?.helpDeskOrange,
      //   iconTSF: getSvg[0]?.helpDeskTSF,
      //   iconPink: getSvg[0]?.helpDeskPink,
      //   isHover: false,
      //   class: "menu-toggle",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["Admin"],
      //   submenu: [],
      // },
    ],
  },
  {
    path: "/help-desk/ticket-dashboard",
    title: "Account",
    icon: getSvg[0]?.helpDesk,
    iconBlue: getSvg[0]?.helpDeskBlue,
    iconSaffron: getSvg[0]?.helpDeskOrange,
    iconTSF: getSvg[0]?.helpDeskTSF,
    iconPink: getSvg[0]?.helpDeskPink,
    isHover: false,
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      // {
      //   path: "help-desk/ticket-dashboard",
      //   title: "TICKET DASHBOARD",
      //   icon: getSvg[0]?.helpDesk,
      //   iconBlue: getSvg[0]?.helpDeskBlue,
      //   iconSaffron: getSvg[0]?.helpDeskOrange,
      //   iconTSF: getSvg[0]?.helpDeskTSF,
      //   iconPink: getSvg[0]?.helpDeskPink,
      //   isHover: false,
      //   class: "menu-toggle",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["Admin"],
      //   submenu: [],
      // },
      // {
      //   path: "help-desk/ticket-category",
      //   title: "TICKET CATEGORY",
      //   icon: getSvg[0]?.helpDesk,
      //   iconBlue: getSvg[0]?.helpDeskBlue,
      //   iconSaffron: getSvg[0]?.helpDeskOrange,
      //   iconTSF: getSvg[0]?.helpDeskTSF,
      //   iconPink: getSvg[0]?.helpDeskPink,
      //   isHover: false,
      //   class: "menu-toggle",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["Admin"],
      //   submenu: [],
      // },
      // {
      //   path: "help-desk/ticket-raised",
      //   title: "TICKET RAISED",
      //   icon: getSvg[0]?.helpDesk,
      //   iconBlue: getSvg[0]?.helpDeskBlue,
      //   iconSaffron: getSvg[0]?.helpDeskOrange,
      //   iconTSF: getSvg[0]?.helpDeskTSF,
      //   iconPink: getSvg[0]?.helpDeskPink,
      //   isHover: false,
      //   class: "menu-toggle",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["Admin"],
      //   submenu: [],
      // },
      // {
      //   path: "help-desk/ticket-received",
      //   title: "TICKET RECEIVED",
      //   icon: getSvg[0]?.helpDesk,
      //   iconBlue: getSvg[0]?.helpDeskBlue,
      //   iconSaffron: getSvg[0]?.helpDeskOrange,
      //   iconTSF: getSvg[0]?.helpDeskTSF,
      //   iconPink: getSvg[0]?.helpDeskPink,
      //   isHover: false,
      //   class: "menu-toggle",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["Admin"],
      //   submenu: [],
      // },
      // {
      //   path: "help-desk/ticket-report",
      //   title: "TICKET REPORT",
      //   icon: getSvg[0]?.helpDesk,
      //   iconBlue: getSvg[0]?.helpDeskBlue,
      //   iconSaffron: getSvg[0]?.helpDeskOrange,
      //   iconTSF: getSvg[0]?.helpDeskTSF,
      //   iconPink: getSvg[0]?.helpDeskPink,
      //   isHover: false,
      //   class: "menu-toggle",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["Admin"],
      //   submenu: [],
      // },
    ],
  },
  {
    path: "/employee-master/employee-onboarding",
    title: "Contact",
    icon: getSvg[0]?.ourEmployee,
    iconBlue: getSvg[0]?.ourEmployeeBlue,
    iconSaffron: getSvg[0]?.ourEmployeeOrange,
    iconTSF: getSvg[0]?.ourEmployeeTSF,
    iconPink: getSvg[0]?.ourEmployeePink,
    isHover: false,
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      {
        path: "employee-master/employee-onboarding",
        title: "Employee Onbording",
        icon: getSvg[0]?.ourEmployee,
        iconBlue: getSvg[0]?.ourEmployeeBlue,
        iconSaffron: getSvg[0]?.ourEmployeeOrange,
        iconTSF: getSvg[0]?.ourEmployeeTSF,
        iconPink: getSvg[0]?.ourEmployeePink,
        isHover: false,
        class: "menu-toggle",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["Admin"],
        submenu: [],
      },
      {
        path: "employee-master/all-employee",
        title: "All Employee",
        icon: getSvg[0]?.ourEmployee,
        iconBlue: getSvg[0]?.ourEmployeeBlue,
        iconSaffron: getSvg[0]?.ourEmployeeOrange,
        iconTSF: getSvg[0]?.ourEmployeeTSF,
        iconPink: getSvg[0]?.ourEmployeePink,
        isHover: false,
        class: "menu-toggle",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["Admin"],
        submenu: [],
      },
      {
        path: "employee-master/employee-directory",
        title: "Employee Directory",
        icon: getSvg[0]?.ourEmployee,
        iconBlue: getSvg[0]?.ourEmployeeBlue,
        iconSaffron: getSvg[0]?.ourEmployeeOrange,
        iconTSF: getSvg[0]?.ourEmployeeTSF,
        iconPink: getSvg[0]?.ourEmployeePink,
        isHover: false,
        class: "menu-toggle",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: ["Admin"],
        submenu: [],
      },
    ],
  },
  {
    path: "/assets-master/assets-dashboard",
    title: "Opportunity",
    icon: getSvg[0]?.assets,
    iconBlue: getSvg[0]?.assetsBlue,
    iconSaffron: getSvg[0]?.helpDeskOrange,
    iconTSF: getSvg[0]?.assetsTSF,
    iconPink: getSvg[0]?.assetsPink,
    isHover: false,
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["Admin"],
    submenu: [
      // {
      //   path: "assets-master/assets-dashboard",
      //   title: "Assets Dashboard",
      //   icon: getSvg[0]?.assets,
      //   iconBlue: getSvg[0]?.assetsBlue,
      //   iconSaffron: getSvg[0]?.assetsOrange,
      //   iconTSF: getSvg[0]?.assetsTSF,
      //   iconPink: getSvg[0]?.assetsPink,
      //   isHover: false,
      //   class: "menu-toggle",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["Admin"],
      //   submenu: [],
      // },
      // {
      //   path: "assets-master/expire-dashboard",
      //   title: "Expire Dashboard",
      //   icon: getSvg[0]?.assets,
      //   iconBlue: getSvg[0]?.assetsBlue,
      //   iconSaffron: getSvg[0]?.assetsOrange,
      //   iconTSF: getSvg[0]?.assetsTSF,
      //   iconPink: getSvg[0]?.assetsPink,
      //   isHover: false,
      //   class: "menu-toggle",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["Admin"],
      //   submenu: [],
      // },
      // {
      //   path: "assets-master/company-assets",
      //   title: "Company Assets",
      //   icon: getSvg[0]?.assets,
      //   iconBlue: getSvg[0]?.assetsBlue,
      //   iconSaffron: getSvg[0]?.assetsOrange,
      //   iconTSF: getSvg[0]?.assetsTSF,
      //   iconPink: getSvg[0]?.assetsPink,
      //   isHover: false,
      //   class: "menu-toggle",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["Admin"],
      //   submenu: [],
      // },
      // {
      //   path: "assets-master/assets-report",
      //   title: "Assets Report",
      //   icon: getSvg[0]?.assets,
      //   iconBlue: getSvg[0]?.assetsBlue,
      //   iconSaffron: getSvg[0]?.assetsOrange,
      //   iconTSF: getSvg[0]?.assetsTSF,
      //   iconPink: getSvg[0]?.assetsPink,
      //   isHover: false,
      //   class: "menu-toggle",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["Admin"],
      //   submenu: [],
      // },
      // {
      //   path: "assets-master/assets-warehouse-categories",
      //   title: "Warehouse",
      //   icon: getSvg[0]?.assets,
      //   iconBlue: getSvg[0]?.assetsBlue,
      //   iconSaffron: getSvg[0]?.assetsOrange,
      //   iconTSF: getSvg[0]?.assetsTSF,
      //   iconPink: getSvg[0]?.assetsPink,
      //   isHover: false,
      //   class: "menu-toggle",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["Admin"],
      //   submenu: [],
      // },
      // {
      //   path: "assets-master/assets-delete-archive",
      //   title: "Deleted Assets",
      //   icon: getSvg[0]?.assets,
      //   iconBlue: getSvg[0]?.assetsBlue,
      //   iconSaffron: getSvg[0]?.assetsOrange,
      //   iconTSF: getSvg[0]?.assetsTSF,
      //   iconPink: getSvg[0]?.assetsPink,
      //   isHover: false,
      //   class: "menu-toggle",
      //   groupTitle: false,
      //   badge: "",
      //   badgeClass: "",
      //   role: ["Admin"],
      //   submenu: [],
      // },
    ],
  },
  // {
  //   path: "/organization-master/organization",
  //   title: "Activity",
  //   icon: getSvg[0]?.organization,
  //   iconBlue: getSvg[0]?.organizationBlue,
  //   iconSaffron: getSvg[0]?.organizationOrange,
  //   iconTSF: getSvg[0]?.organizationTSF,
  //   iconPink: getSvg[0]?.organizationPink,
  //   isHover: false,
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["Admin"],
  //   submenu: [
  //     // {
  //     //   path: "/organization-master/organization",
  //     //   title: "Organization",
  //     //   icon: getSvg[0]?.organization,
  //     //   iconBlue: getSvg[0]?.organizationBlue,
  //     //   iconSaffron: getSvg[0]?.organizationOrange,
  //     //   iconTSF: getSvg[0]?.organizationTSF,
  //     //   iconPink: getSvg[0]?.organizationPink,
  //     //   isHover: false,
  //     //   class: "menu-toggle",
  //     //   groupTitle: false,
  //     //   badge: "",
  //     //   badgeClass: "",
  //     //   role: ["Admin"],
  //     //   submenu: [],
  //     // },
  //     // {
  //     //   path: "/organization-master/department",
  //     //   title: "Department",
  //     //   icon: getSvg[0]?.organization,
  //     //   iconBlue: getSvg[0]?.organizationBlue,
  //     //   iconSaffron: getSvg[0]?.organizationOrange,
  //     //   iconTSF: getSvg[0]?.organizationTSF,
  //     //   iconPink: getSvg[0]?.organizationPink,
  //     //   isHover: false,
  //     //   class: "menu-toggle",
  //     //   groupTitle: false,
  //     //   badge: "",
  //     //   badgeClass: "",
  //     //   role: ["Admin"],
  //     //   submenu: [],
  //     // },
  //     // {
  //     //   path: "/organization-master/designation",
  //     //   title: "Designation",
  //     //   icon: getSvg[0]?.organization,
  //     //   iconBlue: getSvg[0]?.organizationBlue,
  //     //   iconSaffron: getSvg[0]?.organizationOrange,
  //     //   iconTSF: getSvg[0]?.organizationTSF,
  //     //   iconPink: getSvg[0]?.organizationPink,
  //     //   isHover: false,
  //     //   class: "menu-toggle",
  //     //   groupTitle: false,
  //     //   badge: "",
  //     //   badgeClass: "",
  //     //   role: ["Admin"],
  //     //   submenu: [],
  //     // },
  //   ],
  // },

  // {
  //   path: "/organization-master/organization",
  //   title: "Tecnology",
  //   icon: getSvg[0]?.organization,
  //   iconBlue: getSvg[0]?.organizationBlue,
  //   iconSaffron: getSvg[0]?.organizationOrange,
  //   iconTSF: getSvg[0]?.organizationTSF,
  //   iconPink: getSvg[0]?.organizationPink,
  //   isHover: false,
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["Admin"],
  //   submenu: [
  //     // {
  //     //   path: "/organization-master/organization",
  //     //   title: "Organization",
  //     //   icon: getSvg[0]?.organization,
  //     //   iconBlue: getSvg[0]?.organizationBlue,
  //     //   iconSaffron: getSvg[0]?.organizationOrange,
  //     //   iconTSF: getSvg[0]?.organizationTSF,
  //     //   iconPink: getSvg[0]?.organizationPink,
  //     //   isHover: false,
  //     //   class: "menu-toggle",
  //     //   groupTitle: false,
  //     //   badge: "",
  //     //   badgeClass: "",
  //     //   role: ["Admin"],
  //     //   submenu: [],
  //     // },
  //     // {
  //     //   path: "/organization-master/department",
  //     //   title: "Department",
  //     //   icon: getSvg[0]?.organization,
  //     //   iconBlue: getSvg[0]?.organizationBlue,
  //     //   iconSaffron: getSvg[0]?.organizationOrange,
  //     //   iconTSF: getSvg[0]?.organizationTSF,
  //     //   iconPink: getSvg[0]?.organizationPink,
  //     //   isHover: false,
  //     //   class: "menu-toggle",
  //     //   groupTitle: false,
  //     //   badge: "",
  //     //   badgeClass: "",
  //     //   role: ["Admin"],
  //     //   submenu: [],
  //     // },
  //     // {
  //     //   path: "/organization-master/designation",
  //     //   title: "Designation",
  //     //   icon: getSvg[0]?.organization,
  //     //   iconBlue: getSvg[0]?.organizationBlue,
  //     //   iconSaffron: getSvg[0]?.organizationOrange,
  //     //   iconTSF: getSvg[0]?.organizationTSF,
  //     //   iconPink: getSvg[0]?.organizationPink,
  //     //   isHover: false,
  //     //   class: "menu-toggle",
  //     //   groupTitle: false,
  //     //   badge: "",
  //     //   badgeClass: "",
  //     //   role: ["Admin"],
  //     //   submenu: [],
  //     // },
  //   ],
  // },

  // {
  //   path: "/organization-master/organization",
  //   title: "Currency",
  //   icon: getSvg[0]?.organization,
  //   iconBlue: getSvg[0]?.organizationBlue,
  //   iconSaffron: getSvg[0]?.organizationOrange,
  //   iconTSF: getSvg[0]?.organizationTSF,
  //   iconPink: getSvg[0]?.organizationPink,
  //   isHover: false,
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["Admin"],
  //   submenu: [
  //     // {
  //     //   path: "/organization-master/organization",
  //     //   title: "Organization",
  //     //   icon: getSvg[0]?.organization,
  //     //   iconBlue: getSvg[0]?.organizationBlue,
  //     //   iconSaffron: getSvg[0]?.organizationOrange,
  //     //   iconTSF: getSvg[0]?.organizationTSF,
  //     //   iconPink: getSvg[0]?.organizationPink,
  //     //   isHover: false,
  //     //   class: "menu-toggle",
  //     //   groupTitle: false,
  //     //   badge: "",
  //     //   badgeClass: "",
  //     //   role: ["Admin"],
  //     //   submenu: [],
  //     // },
  //     // {
  //     //   path: "/organization-master/department",
  //     //   title: "Department",
  //     //   icon: getSvg[0]?.organization,
  //     //   iconBlue: getSvg[0]?.organizationBlue,
  //     //   iconSaffron: getSvg[0]?.organizationOrange,
  //     //   iconTSF: getSvg[0]?.organizationTSF,
  //     //   iconPink: getSvg[0]?.organizationPink,
  //     //   isHover: false,
  //     //   class: "menu-toggle",
  //     //   groupTitle: false,
  //     //   badge: "",
  //     //   badgeClass: "",
  //     //   role: ["Admin"],
  //     //   submenu: [],
  //     // },
  //     // {
  //     //   path: "/organization-master/designation",
  //     //   title: "Designation",
  //     //   icon: getSvg[0]?.organization,
  //     //   iconBlue: getSvg[0]?.organizationBlue,
  //     //   iconSaffron: getSvg[0]?.organizationOrange,
  //     //   iconTSF: getSvg[0]?.organizationTSF,
  //     //   iconPink: getSvg[0]?.organizationPink,
  //     //   isHover: false,
  //     //   class: "menu-toggle",
  //     //   groupTitle: false,
  //     //   badge: "",
  //     //   badgeClass: "",
  //     //   role: ["Admin"],
  //     //   submenu: [],
  //     // },
  //   ],
  // },
];
