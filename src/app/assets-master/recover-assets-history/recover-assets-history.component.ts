import { Component, OnInit } from '@angular/core';
import { CRUDFunction } from '../../shared/global-functions/crudFunctions.service';
import { AssetsService } from '../Service/assets.service';

@Component({
  selector: 'app-recover-assets-history',
  templateUrl: './recover-assets-history.component.html',
  styleUrls: ['./recover-assets-history.component.scss']
})
export class RecoverAssetsHistoryComponent implements OnInit {
  itemId: any;
  config: { itemsPerPage: number; currentPage: number; totalItems: string; };
  recoveryHistoryList: any = [

  ];

  constructor(
    private CRUDFunction: CRUDFunction,
    private assetsService: AssetsService,
  ) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: "",
    };
  }

  ngOnInit(): void {
    this.dataFromUrl();
    this.gethistorybyitemid();
  }

  //#region function to get the data from the url
  dataFromUrl() {
    this.itemId = this.CRUDFunction.dataDecoding();
  }
  //#endregion

  //#region function to get the history of the item
  gethistorybyitemid() {
    let post = {
      itemId: this.itemId,
      page: this.config.currentPage,
      count: this.config.currentPage,
    }
    this.assetsService.gethistorybyitemid(post).subscribe((res: any) => {
      let data = this.CRUDFunction.responceBindingInPagination(res);

      this.recoveryHistoryList = data['tableData'];
      this.config.totalItems = data['totalLength'];
    }, (error) => {
      this.CRUDFunction.handleHttpError(error);
    });
  }
  //#endregion

  //#region fuicntion to change the page in the ticket report
  pageChanged(e) {
    this.config.itemsPerPage = e.pageSize;
    this.config.currentPage = e.pageIndex + 1;
    this.gethistorybyitemid();
  }
  //#endregion
}
