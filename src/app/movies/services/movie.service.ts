import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Genre } from '../model/genre.model';
import { MovieResponse } from '../model/movie-response.model';
import { MovieResult } from '../model/movie-result.model';
import { Movie } from '../model/movie.model';
import { MoviesConfiguration } from '../model/movies-configuration.model';
import { GenreService } from './genre.service';
import { MoviesConfigurationService } from './movies-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [];

  private upcoming = '/movie/upcoming';
  private search = '/search/movie';
  private urlUpcomings = `${environment.movies}${this.upcoming}`;
  private urlSearch = `${environment.movies}${this.search}`;
  private configs: MoviesConfiguration;

  constructor(
    private httpClient: HttpClient,
    private genreService: GenreService,
    private configuration: MoviesConfigurationService,
    private translate: TranslateService
  ) {
    this.configs = this.configuration.getConfiguration();
  }

  clearMovies() {
    this.movies = [];
  }

  getMovie(id: number): Observable<Movie> {
    const movie = this.movies.find(mv => mv.id == id);

    return of(movie);
  }

  getMovies(page: number): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', environment.token)
      .set('language', this.translate.currentLang)
      .set('page', page.toString());

    return this.consumeMovie(this.urlUpcomings, params);
  }

  searchMovies(page: number, query: string): Observable<Movie[]> {
    const params = new HttpParams()
      .set('api_key', environment.token)
      .set('language', this.translate.currentLang)
      .set('page', page.toString())
      .set('query', query);

    return this.consumeMovie(this.urlSearch, params);
  }

  private consumeMovie(url: string, params: HttpParams): Observable<Movie[]> {
    return this.httpClient
      .get(url, {
        params: params
      })
      .pipe(
        map((res: MovieResponse) => {
          const movies: Movie[] = res.results.map(result => {
            return {
              id: result.id,
              title: result.title,
              overview: result.overview,
              genres: this.getGenres(result.genre_ids),
              smallImage: this.getSmallImage(result),
              image: this.getLargelImage(result),
              date: result.release_date
            };
          });

          this.movies.push(...movies);
          return this.movies;
        })
      );
  }

  getSmallImage(upcoming: MovieResult): string {
    return this.getImage(upcoming, this.configs.images.logo_sizes[0]);
  }

  getLargelImage(upcoming: MovieResult): string {
    return this.getImage(upcoming, this.configs.images.poster_sizes[1]);
  }

  getImage(upcoming: MovieResult, size: String) {
    if (upcoming.poster_path) {
      return `${this.configs.images.base_url}${size}${upcoming.poster_path}`;
    } else if (upcoming.backdrop_path) {
      return `${this.configs.images.base_url}${size}${upcoming.backdrop_path}`;
    }
    return './assets/icon/movie.png';
  }

  getGenres(ids: number[]): Genre[] {
    const genres = this.genreService.getGenres();
    return ids.map(id => ({ id: id, name: genres.find(genre => genre.id === id).name }));
  }
}
