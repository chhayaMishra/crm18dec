import { Component, Input, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { CRUDFunction } from "src/app/shared/global-functions/crudFunctions.service";
import { AssetsService } from "../Service/assets.service";
import Swal from "sweetalert2";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-delete-assets",
  templateUrl: "./delete-assets.component.html",
  styleUrls: ["./delete-assets.component.scss"],
})
export class DeleteAssetsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() item: any = "";
  searchString: string = '';
  config: { itemsPerPage: number; currentPage: number; totalItems: string };
  deletedAssetsList: any = [];

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
    this.getdeletedassets();
    this.paginator.firstPage();
  }

  ngOnInit(): void {
    this.getdeletedassets();
  }

  //#region function for get the list of deleted assets
  getdeletedassets() {
    let post = {
      searchString: this.searchString,
      page: this.config.currentPage,
      count: this.config.itemsPerPage,
    };
    this.assetsService.getdeletedassets(post).subscribe(
      (res: any) => {
        let data = this.CRUDFunction.responceBindingInPagination(res);
        this.deletedAssetsList = data["tableData"];
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
    this.getdeletedassets();
  }
  //#endregion

  //#region function to send the data to the parent component when export button click
  getData(): any[] {
    return this.deletedAssetsList;
  }
  //#endregion

  //#region function to restore the deleted asset
  restoreDeletedAsset(itemId) {
    Swal.fire({
      title: "Are you sure?",
      text: "This asset will move to All Assets..",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#FA543D",
      confirmButtonText: "Yes, restore it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.assetsService.restoredeleteassets(itemId).subscribe((data: any) => {
          if (data.status) {
            Swal.fire(
              "Restored!",
              "Your file has been Restored.",
              "success",
            ).then(() => {
              this.ngOnInit();
            });
          } else {
          }
        });
      }
    });
  }
  //#endregion
}
