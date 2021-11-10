import { environment } from "src/environments/environment";


export class HttpUrls {
  // TABLE API URLS
  public static GET_TABLE_DATA = `${environment.apiUrl}/earthquakes/feed/v1.0/summary/all_day.geojson`;
}
