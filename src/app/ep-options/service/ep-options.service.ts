import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {OptionsIf} from '../data/options.if';

@Injectable()
export class EpOptionsService {

  static initUrl = 'http://localhost:8081/init.json';

  constructor(private readonly http: HttpClient) {
  }

  getOptions(): Observable<OptionsIf> {
    return this.http.get<OptionsIf>(EpOptionsService.initUrl);
  }

}
