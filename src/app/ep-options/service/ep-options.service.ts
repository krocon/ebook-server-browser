import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {OptionsIf} from '../data/options.if';
import {environment} from '../../../environments/environment';

@Injectable()
export class EpOptionsService {

  static initUrl = '/init.json';

  constructor(private readonly http: HttpClient) {
  }

  getOptions(): Observable<OptionsIf> {
    return this.http.get<OptionsIf>(environment.serverAddress + EpOptionsService.initUrl);
  }

}
