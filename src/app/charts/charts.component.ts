import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  tableDataSub$ = new Subscription();
  responseData;
  chartData = [];
  constructor(private _tableService: TableService) {}
  dataSource: Object;
  ngOnInit(): void {
    this.getAllTableData();
  }
  getAllTableData() {
    this.tableDataSub$ = this._tableService.tableData().subscribe((data) => {
      this.responseData = data['features'];
      this.responseData.map((ele) => {
        ele['properties']['place'] = ele['properties']['place']
          .split(',')
          .pop();
      });
      let newArray = this.responseData.reduce(
        (item, array) =>
          Object.assign(item, {
            [array.properties.place]: (
              item[array.properties.place] || []
            ).concat(array),
          }),
        {}
      );
      for (var i in newArray) {
        this.chartData.push({ label: i, value: i.length });
      }
      console.log(this.chartData, 'newAthis.chartDatarray');
      // Chart Configuration
      if(this.chartData.length>0){
        const dataSource = {
          chart: {
            caption: 'Places with number of earthquakes', //Set the chart caption
            xAxisName: 'Places', //Set the x-axis name
            yAxisName: 'Number of Earthquakes', //Set the y-axis name
            theme: 'fusion', //Set the theme for your chart
          },
          // Chart Data - from step 2
          data: this.chartData,
        };
        this.dataSource = dataSource;
      }

    });
  }
  ngOnDestroy() {
    this.tableDataSub$.unsubscribe();
  }
}
