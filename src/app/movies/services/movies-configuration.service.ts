import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MoviesConfiguration } from '../model/movies-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesConfigurationService {
  private configPath = '/configuration';
  private configUrl = `${environment.movies}${this.configPath}`;

  private configuration: MoviesConfiguration;

  constructor(private httpClient: HttpClient, private translate: TranslateService) {}

  getConfiguration(): MoviesConfiguration {
    return this.configuration;
  }

  load(): Promise<any> {
    return this.httpClient
      .get<MoviesConfiguration>(this.configUrl, {
        params: new HttpParams()
          .set('api_key', environment.token)
          .set('language', this.translate.currentLang)
      })
      .pipe(
        map(response => {
          this.configuration = response;
        })
      )
      .toPromise();
  }
}

export function configurationProviderFactory(configurationService: MoviesConfigurationService) {
  return () => configurationService.load();
}
