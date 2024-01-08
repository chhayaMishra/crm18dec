import { Component, OnInit } from "@angular/core";
import { AssetsService } from "../Service/assets.service";
import { CRUDFunction } from "../../shared/global-functions/crudFunctions.service";

@Component({
  selector: "app-assets-dashboard",
  templateUrl: "./assets-dashboard.component.html",
  styleUrls: ["./assets-dashboard.component.scss"],
})
export class AssetsDashboardComponent implements OnInit {
  dashboardTiles: any = [
    {
      name: "Total Physical Assets",
      id: "1",
      normalImage: "../../../assets/assets img/Frame 33722 (1).png",
      image: "../../../assets/assets img/Frame 33722 (1).png",
      hoverImage: "../../../assets/assets img/Frame 33722.png",
    },
    {
      name: "Total Physical Available",
      id: "2",
      normalImage: "../../../assets/assets img/Frame 33722 (3).png",
      image: "../../../assets/assets img/Frame 33722 (3).png",
      hoverImage: "../../../assets/assets img/Frame 33722 (2).png",
    },
    {
      name: "Assets Physical Assigned",
      id: "3",
      normalImage: "../../../assets/assets img/Frame 33722 (5).png",
      image: "../../../assets/assets img/Frame 33722 (5).png",
      hoverImage: "../../../assets/assets img/Frame 33722 (4).png",
    },
    {
      name: "Assets Physical Under Repair",
      id: "4",
      normalImage: "../../../assets/assets img/Frame 33722 (7).png",
      image: "../../../assets/assets img/Frame 33722 (7).png",
      hoverImage: "../../../assets/assets img/Frame 33722 (6).png",
    },
    {
      name: "Damaged Assets",
      id: "5",
      normalImage: "../../../assets/assets img/Frame 33722 (9).png",
      image: "../../../assets/assets img/Frame 33722 (9).png",
      hoverImage: "../../../assets/assets img/Frame 33722 (8).png",
    },
    {
      name: "Total Degital Assets",
      id: "6",
      normalImage: "../../../assets/assets img/Frame 33722 (11).png",
      image: "../../../assets/assets img/Frame 33722 (11).png",
      hoverImage: "../../../assets/assets img/Frame 33722 (10).png",
    },
    {
      name: "Total Digital Availeble",
      id: "7",
      normalImage: "../../../assets/assets img/Frame 33722 (13).png",
      image: "../../../assets/assets img/Frame 33722 (13).png",
      hoverImage: "../../../assets/assets img/Frame 33722 (12).png",
    },
    {
      name: "Digital Assets Assigned",
      id: "8",
      normalImage: "../../../assets/assets img/Frame 33722 (15).png",
      image: "../../../assets/assets img/Frame 33722 (15).png",
      hoverImage: "../../../assets/assets img/Frame 33722 (14).png",
    },
  ];
  footerTiles: any = [
    {
      name: "Total Assets Amount",
      id: "1",
      normalImage: "../../../assets/assets img/Frame 33722 (16).png",
    },
    {
      name: "Total Unused Assets Amount",
      id: "2",
      normalImage: "../../../assets/assets img/Frame 33722 (17).png",
    },
    {
      name: "Total Physical Assets Amount",
      id: "3",
      normalImage: "../../../assets/assets img/Frame 33722 (1).png",
    },
    {
      name: "Total Digital Assets Amount",
      id: "4",
      normalImage: "../../../assets/assets img/Frame 33722 (11).png",
    },
    {
      name: "Total Under Repair Assets Amount",
      id: "5",
      normalImage: "../../../assets/assets img/Frame 33722 (7).png",
    },
  ];
  digitalAssetsReport: any;
  assetsReports: any;
  colorScheme = {
    domain: ["rgb(255, 97, 84)", "#01204C", "#2F80ED", "#EBBC2E"],
  };

  constructor(
    private assetsService: AssetsService,
    private CRUDFunction: CRUDFunction,
  ) { }

  ngOnInit(): void {
    this.assetsdashboard();
  }

  //#region function to chnage the image on hover
  hoverOnTiles(id) {
    this.dashboardTiles.map((tile) => {
      if (tile.id === id) {
        let image = tile.hoverImage;
        let text = "white";
        let background = id === "1" ? "#6c62ca" : id === "2" ? "#ff8730" : id === "3" ? "#ff5a5b" : id === "4" ? "#1d8ffa" : id === "5" ? "#008000" : id === "6" ? "#ebbc2e" : id === "7" ? "#2fcbed" : "#ed3a3a";
        tile.image = image;
        tile.text = text;
        tile.background = background;
      }
      return tile;
    });
  }
  //#endregion

  //#region function to chnage the image on leave
  hoverLeaveTiles(id) {
    this.dashboardTiles.map((tile) => {
      if (tile.id === id) {
        let image = tile.normalImage;
        let background = "white";
        let text = "black";
        tile.image = image;
        tile.background = background;
        tile.text = text;
      }
      return tile;
    });
  }
  //#endregion

  //#region function to get the information for the dashboard
  assetsdashboard() {
    this.assetsService.assetsdashboard().subscribe(
      (res: any) => {
        let dashboardData = this.CRUDFunction.responceBinding(res);

        this.dashboardTiles.map((tile) => {
          let assetCount = tile.id === "1" ? dashboardData["totalPhysicalAssets"] : tile.id === "2" ? dashboardData["totalPhysicalAvailable"] : tile.id === "3" ? dashboardData["totalPhysicalAssigned"] : tile.id === "4" ? dashboardData["totalPhysicalUnderRepaired"] : tile.id === "5" ? dashboardData["totalDamageAssets"] : tile.id === "6" ? dashboardData["totalDigitalAssets"] : tile.id === "7" ? dashboardData["totalDigitalAvailable"] : dashboardData["totalDigitalAssigned"];
          tile.assetCount = assetCount;
          return tile;
        });
        this.digitalAssetsReport = dashboardData["digitalAssetsReport"];
        this.assetsReports = dashboardData["assetsReports"];
        this.digitalAssetsReport.map((digitalAssets, index) => {
          let heading =
            index === 0 ? "Total Assets Availeble" : "Total Assets Assigned";
          digitalAssets.heading = heading;
          let color = index === 0 ? "rgb(255, 97, 84)" : "#01204C";
          digitalAssets.color = color;
          return digitalAssets;
        });
        this.assetsReports = dashboardData["assetsReports"];
        this.assetsReports.map((assets, index) => {
          let heading =
            index === 0
              ? "Physical Assets"
              : index === 1
                ? "Digital Assets"
                : index === 2
                  ? "Damaged Assets"
                  : "Under Repair Assets";
          assets.heading = heading;
          let color =
            index === 0
              ? "rgb(255, 97, 84)"
              : index === 1
                ? "#01204C"
                : index === 2
                  ? "#2F80ED"
                  : "#EBBC2E";
          assets.color = color;
          return assets;
        });


        this.footerTiles.map((footerTiles) => {
          let assetAmount =
            footerTiles.id === "1" ? dashboardData["totalAssetsAmount"] : footerTiles.id === "2" ? dashboardData["totalUnusedAssetsAmount"] : footerTiles.id === "3" ? dashboardData["totalPhysicalAssetsAmount"] : footerTiles.id == 4 ? dashboardData["totalDigitalAssetsAmount"] : dashboardData['totalAssetsUnderRepairedAmount'];
          footerTiles.assetAmount = assetAmount;
          return footerTiles;
        });
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region function to get the information for the dashboard
  filterDataForAssets(id) {
    this.CRUDFunction.routingWithData("assets-master/company-assets", id);
  }
  //#endregion
}
