import { Component, OnInit, ViewChild } from "@angular/core";
import { DeleteAssetsComponent } from "../delete-assets/delete-assets.component";
import { ArchiveAssetsComponent } from "../archive-assets/archive-assets.component";
import { PopupFunctionService } from '../../shared/global-functions/popup-function.service';
import { ExportExcelComponent } from "src/app/shared/components/export-excel/export-excel.component";

@Component({
  selector: "app-delete-and-archive-assets",
  templateUrl: "./delete-and-archive-assets.component.html",
  styleUrls: ["./delete-and-archive-assets.component.scss"],
})
export class DeleteAndArchiveAssetsComponent implements OnInit {
  @ViewChild(DeleteAssetsComponent, { static: false }) DeleteAssetsComponent: DeleteAssetsComponent;
  @ViewChild(ArchiveAssetsComponent, { static: false }) ArchiveAssetsComponent: ArchiveAssetsComponent;
  pageName: any = [
    { name: "Deleted Assets", id: "1", class: "activeButton" },
    { name: "Archive Assets", id: "2", class: "releaseButton" },
  ];
  activePageId: any = "1";
  searchString: string = "";
  item: string;

  constructor(private popupFunctionService: PopupFunctionService) { }

  ngOnInit(): void { }

  //#region function for make the active button change
  activePageSelectoin(id) {
    this.activePageId = id;
    this.pageName.map((pageName) => {
      if (pageName.id == id) {
        pageName.class = "activeButton";
      } else {
        pageName.class = "releaseButton";
      }
    });
  }
  //#endregion

  //#region function for send the search string to the child components
  searchInput(value) {
    value.length > 2 ? (this.searchString = value, this.item = this.searchString) : this.searchString = '';
  }
  //#endregion

  //#region function to get the data from the child components after export button clicked
  exportAssetsList(activePageId) {
    if (activePageId == '1') {
      if (this.DeleteAssetsComponent) {
        let data = this.DeleteAssetsComponent.getData();

        let deleteAssetsArray = [
          { name: "Asset Name", bindableValue: "itemName", isDate: false },
          { name: "Asset Status", bindableValue: "assetsStatus", isDate: false },
          { name: "Location", bindableValue: "assetsLocation", isDate: false },
          { name: "Condition", bindableValue: "assetsCondition", isDate: false },
          { name: "Serial Number", bindableValue: "assetsSerialNo", isDate: false },
          { name: "Item Code", bindableValue: "assetsItemCode", isDate: false },
          { name: "Reason", bindableValue: "deleteReason", isDate: false },
          { name: "Deleted By", bindableValue: "deletedByName", isDate: false },
          { name: "Deleted On", bindableValue: "deletedOn", isDate: true },
        ];
        let post = {
          checkBoxArray: deleteAssetsArray,
          visibleTableList: data,
        }
        this.popupFunctionService.matDialogBoxPopup(ExportExcelComponent, post, '1000px');
      }
    } else {
      if (this.ArchiveAssetsComponent) {
        let data = this.ArchiveAssetsComponent.getData();

        let archivedAssetsArray = [
          { name: "Asset Name", bindableValue: "itemName", isDate: false },
          { name: "Asset Status", bindableValue: "assetsStatus", isDate: false },
          { name: "Location", bindableValue: "location", isDate: false },
          { name: "Condition", bindableValue: "assetsCondition", isDate: false },
          { name: "Serial Number", bindableValue: "serialNumber", isDate: false },
          { name: "Item Code", bindableValue: "itemCode", isDate: false },
          { name: "Reason", bindableValue: "archiveReason", isDate: false },
          { name: "Archived By", bindableValue: "updatedBy", isDate: false },
          { name: "Archived On", bindableValue: "updateOn", isDate: true },
        ];
        let post = {
          checkBoxArray: archivedAssetsArray,
          visibleTableList: data,
        }
        this.popupFunctionService.matDialogBoxPopup(ExportExcelComponent, post, '1000px');
      }
    }
  }
  //#endregion

  //#region function to reset the search filter
  resetFilters() {
    this.searchString = '';
  }
  //#endregion
}
