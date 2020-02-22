import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class EbOverviewService {

  static listUrl = 'http://localhost:8081/0/files.json';

  constructor(private readonly http: HttpClient) {
  }

  loadList(sectionIdx: number = 0): Observable<string[]> {
    const url = `http://localhost:8081/${sectionIdx}/files.json`;
    return this.http.get<string[]>(url);
  }

}
