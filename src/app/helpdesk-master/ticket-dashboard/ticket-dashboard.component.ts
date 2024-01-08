import { Component, OnInit } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
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
@Component({
  selector: "app-ticket-dashboard",
  templateUrl: "./ticket-dashboard.component.html",
  styleUrls: ["./ticket-dashboard.component.scss"],
})
export class TicketDashboardComponent implements OnInit {
  public areaChartOptions: Partial<ChartOptions>;
  ticketdetail: any = [
    {
      totalCount: 3,
      description: "Total Number of Ticket Open (30 Days)",
      img: "../../../assets/images/Vector 3.png",
    },
    {
      totalCount: 1,
      description: "Total Number of Ticket Open (30 Days)",
      img: "../../../assets/images/Vector 3 (3).png",
    },
    {
      totalCount: 14,
      description: "Total Number of Ticket Open (30 Days)",
      img: "../../../assets/images/Vector 3 (2).png",
    },
    {
      totalCount: 2,
      description: "Total Number of Ticket Open (30 Days)",
      img: "../../../assets/images/Vector 3 (1).png",
    },
    {
      totalCount: 40,
      description: "Total Number of Ticket Open (30 Days)",
      img: "../../../assets/images/Vector 3 (1).png",
    },
  ];
  colorScheme = {
    domain: ["rgba(229, 204, 255, 1)", "rgba(211, 229, 255, 1)"],
  };
  colorScheme1 = {
    domain: ["rgba(211, 229, 255, 1)", "rgba(146, 190, 255, 1)"],
  };
  series = [
    {
      name: "High",
      value: 70,
      label: "70%",
    },
    {
      name: "Low ",
      value: 20,
      label: "20%",
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.chart1();
  }

  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: "New Patients",
          data: [1, 40, 28, 51, 42, 85, 77, 50, 78, 58, 25, 37],
        },
      ],
      chart: {
        height: 250,
        type: "area",
        toolbar: {
          show: false,
        },
        foreColor: "#9aa0ac",
      },
      colors: ["#4691FF"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        title: {
          text: "Month",
        },
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 0,
      },

      tooltip: {
        theme: "dark",
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }

  pieChartLabel(series: any[], name: string): string {
    const item = series.filter((data) => data.name === name);
    if (item.length > 0) {
      return item[0].label;
    }
    return name;
  }

  onSelect(event) {}
}
