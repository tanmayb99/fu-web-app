import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  allTableData;
  tableDataSub$ = new Subscription();
  columnDefs = [
    {headerName: 'ID', field: 'id', sortable: true},
    {headerName: 'Type', field: 'type', sortable: true},
    {headerName: 'Code', field: 'properties.code', sortable: true},
    {headerName: 'Place', field: 'properties.place', sortable: true},
    {headerName: 'Title', field: 'properties.title', sortable: true},
    {headerName: 'Type', field: 'properties.type', sortable: true},
    {headerName: 'Detail', field: 'properties.detail', sortable: true}
];
  constructor(private _tableService:TableService) { }

  ngOnInit(): void {
    this.getAllTableData();
  }
  getAllTableData() {
    this.tableDataSub$=this._tableService
      .tableData()
      .subscribe((data) => {
        this.allTableData = data['features'];
      });
  }
  ngOnDestroy() {
    this.tableDataSub$.unsubscribe();
  }
}
