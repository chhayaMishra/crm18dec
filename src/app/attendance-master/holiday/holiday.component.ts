import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
  tabs: any = [
    { name: 'Holiday', id: 1 },
    { name: 'Holiday Group', id: 2 },
    { name: 'Assign Employee To Holiday Group', id: 3 }
  ]
  searchString: string = '';
  item: string;

  constructor() { }

  ngOnInit(): void {
  }

  //#region function for send the search string to the child components
  searchInput(value) {
    value.length > 2 ? (this.searchString = value, this.item = this.searchString) : this.searchString = '';
  }
  //#endregion

}
