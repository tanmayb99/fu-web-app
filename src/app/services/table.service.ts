import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataClientService } from '../http/data-client.service';
import { HttpUrls } from '../http/http-urls';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private dataClientService: DataClientService) { }
  // TODO - Define modal interface and Remove 'any' type
  tableData(): Observable<any> {
    return this.dataClientService.get<any>(HttpUrls.GET_TABLE_DATA);
  }
}
