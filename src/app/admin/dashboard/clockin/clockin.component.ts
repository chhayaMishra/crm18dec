import { Component, OnInit } from "@angular/core";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexResponsive,
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
};
const single = [
  {
    name: "Germany",
    value: 8940000,
  },
  {
    name: "USA",
    value: 5000000,
  },
];

@Component({
  selector: "app-clockin",
  templateUrl: "./clockin.component.html",
  styleUrls: ["./clockin.component.scss"],
})
export class ClockinComponent implements OnInit {
  text: string = "";
  buttonstyle: object;
  single: any[];
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  selectedDate: any;
  isBirthday: boolean = true;
  isAnniversary: boolean = false;
  isJoinee: boolean = false;
  colorScheme = {
    domain: ["#4691FF", "#D4D4D4"],
  };
  currentDate = new Date();
  isActive: boolean = false;
  eventList: any = ["Rakhi", "Ganesh Chaturti", "Independence day"];
  // recentJob:any=[]
  // recentJob = ["Dot Net", "Angular", "Node", "React"].map((n) => `${n}`);

  recentJobnew = [["Dot Net"], ["UX"], ["PM"], "Angular", "Node"].map(
    (n) => `${n}`,
  );

  series = [
    {
      name: "Leaves used",
      value: 70,
      label: "70%",
    },
    {
      name: "Leaves Available ",
      value: 20,
      label: "20%",
    },
  ];
  constructor(config: NgbCarouselConfig) {
    Object.assign(this, { single });
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
  ngOnInit() {}

  ngAfterViewInit() {}
  onSelect(event) {
    this.selectedDate = event;
  }
  changeData() {}

  showSpecialdays(data: any) {
    if (data === "BD") {
      this.isBirthday = true;
      this.isAnniversary = false;
      this.isJoinee = false;
    }
    if (data === "WA") {
      this.isAnniversary = true;
      this.isBirthday = false;
      this.isJoinee = false;
    }
    if (data === "NJ") {
      this.isBirthday = false;
      this.isAnniversary = false;
      this.isJoinee = true;
    }
  }
}
