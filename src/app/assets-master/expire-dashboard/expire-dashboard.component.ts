import { Component, OnInit } from "@angular/core";
import { CRUDFunction } from "src/app/shared/global-functions/crudFunctions.service";
import { AssetsService } from "../Service/assets.service";

@Component({
  selector: "app-expire-dashboard",
  templateUrl: "./expire-dashboard.component.html",
  styleUrls: ["./expire-dashboard.component.scss"],
})
export class ExpireDashboardComponent implements OnInit {
  expireTile: any = [
    {
      name: "Total License Expired",
      id: "1",
      normalImage: "../../../assets/assets img/Frame 33722 (9).png",
      image: "../../../assets/assets img/Frame 33722 (9).png",
      hoverImage: "../../../assets/assets img/Frame 33722 (8).png",
    },
    {
      name: "Total Warranty Expired",
      id: "2",
      normalImage: "../../../assets/assets img/Frame 33722 (7).png",
      image: "../../../assets/assets img/Frame 33722 (7).png",
      hoverImage: "../../../assets/assets img/Frame 33722 (6).png",
    },
    {
      name: "Total Assets Expired",
      id: "3",
      normalImage: "../../../assets/assets img/Frame 33722 (11).png",
      image: "../../../assets/assets img/Frame 33722 (11).png",
      hoverImage: "../../../assets/assets img/Frame 33722 (10).png",
    },
    {
      name: "Next 10 Days Expire Assets",
      id: "4",
      normalImage: "../../../assets/assets img/Frame 33722 (13).png",
      image: "../../../assets/assets img/Frame 33722 (13).png",
      hoverImage: "../../../assets/assets img/Frame 33722 (12).png",
    },
  ];
  expireGraph: any = [];
  constructor(
    private assetsService: AssetsService,
    private CRUDFunction: CRUDFunction,
  ) {}

  ngOnInit(): void {
    this.expiredashboard();
  }

  //#region function to chnage the image on hover
  hoverOnTiles(id) {
    this.expireTile.map((tile) => {
      if (tile.id === id) {
        let image = tile.hoverImage;
        let text = "white";
        let background =
          id === "1"
            ? "#008000"
            : id === "2"
              ? "#1d8ffa"
              : id === "3"
                ? "#ebbc2e"
                : "#2fcbed";
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
    this.expireTile.map((tile) => {
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

  //#region api to get the expire dashboard data
  expiredashboard() {
    this.assetsService.expiredashboard().subscribe(
      (res: any) => {
        let expireData = this.CRUDFunction.responceBinding(res);
        this.expireTile.map((tile) => {
          let assetCount =
            tile.id === "1"
              ? expireData["totalLicenseExpired"]
              : tile.id === "2"
                ? expireData["totalWarrantyExpAssets"]
                : tile.id === "3"
                  ? expireData["totalAssetsExpired"]
                  : expireData["nextTenDayAssetsExpired"];
          tile.assetCount = assetCount;
          return tile;
        });
        this.expireGraph = expireData["expireAssetsReport"];
        this.expireGraph.map((assets, index) => {
          let heading = index === 0 ? "Physical Assets" : "Digital Assets";
          assets.heading = heading;
          let color = index === 0 ? "rgb(255, 97, 84)" : "#EBBC2E";
          assets.color = color;
          return assets;
        });
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region api to route to the expire assets page
  expireAssetsReport(id) {
    this.CRUDFunction.routingWithData("assets-master/expire-assets", id);
  }
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion

  //#region api to
  //#endregion
}
