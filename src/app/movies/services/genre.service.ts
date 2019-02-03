import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GenreResult } from '../model/genre-results.model';
import { Genre } from '../model/genre.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private genrePath = '/genre/movie/list';
  private genreUrl = `${environment.movies}${this.genrePath}`;
  private genres: Genre[] = [];

  constructor(private httpClient: HttpClient, private translate: TranslateService) {}

  getGenres(): Genre[] {
    return this.genres;
  }

  load(): Promise<any> {
    console.log(this.translate.currentLang);

    return this.httpClient
      .get<GenreResult>(this.genreUrl, {
        params: new HttpParams()
          .set('api_key', environment.token)
          .set('language', this.translate.currentLang)
      })
      .pipe(
        map(response => {
          this.genres = response.genres;
        })
      )
      .toPromise();
  }
}

export function genreProviderFactory(genreService: GenreService) {
  return () => genreService.load();
}
