import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class EbOverviewService {

  // static initUrl = 'http://localhost:8081/init.json';
  static listUrl = 'http://localhost:8081/0/files.json';

  constructor(private readonly http: HttpClient) {
  }

  loadList(): Observable<string[]> {
    return this.http.get<string[]>(EbOverviewService.listUrl);
  }

}
