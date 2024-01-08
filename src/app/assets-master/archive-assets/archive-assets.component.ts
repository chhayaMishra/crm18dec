import { Component, Input, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { CRUDFunction } from "src/app/shared/global-functions/crudFunctions.service";
import { AssetsService } from "../Service/assets.service";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-archive-assets",
  templateUrl: "./archive-assets.component.html",
  styleUrls: ["./archive-assets.component.scss"],
})
export class ArchiveAssetsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() item: any = "";
  searchString: string = '';
  config: { itemsPerPage: number; currentPage: number; totalItems: string };
  startDate: any;
  endDate: any;
  archiveAssetList: any = [];
  dataToSend: string;

  constructor(
    private assetsService: AssetsService,
    private CRUDFunction: CRUDFunction,
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: "",
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchString = changes.item.currentValue;
    this.getarchiveassetsitem();
    this.paginator.firstPage();
  }

  ngOnInit(): void {
    this.getarchiveassetsitem();
  }

  //#region function to get all the archives assets
  getarchiveassetsitem() {
    let post = {
      startDate: this.startDate,
      endDate: this.endDate,
      searchString: this.searchString,
      page: this.config.currentPage,
      count: this.config.itemsPerPage,
    };
    this.assetsService.getarchiveassetsitem(post).subscribe(
      (res: any) => {
        let data = this.CRUDFunction.responceBindingInPagination(res);
        this.archiveAssetList = data["tableData"];
        this.config.totalItems = data["totalLength"];
      },
      (error) => {
        this.CRUDFunction.handleHttpError(error);
      },
    );
  }
  //#endregion

  //#region fuicntion to change the page in the ticket report
  pageChanged(e) {
    this.config.itemsPerPage = e.pageSize;
    this.config.currentPage = e.pageIndex + 1;
    this.getarchiveassetsitem();
  }
  //#endregion

  //#region function to send the data to the parent component when export button click
  getData(): any[] {
    return this.archiveAssetList;
  }
  //#endregion
}
