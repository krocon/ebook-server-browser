import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {EpOptionsService} from '../../ep-options/service/ep-options.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class EbOverviewService {

  constructor(private readonly http: HttpClient) {
  }

  loadList(sectionIdx: number = 0): Observable<string[]> {
    const base = environment.serverAddress;
    const url = `${base}/${sectionIdx}/files.json`;
    return this.http.get<string[]>(url);
  }

}
