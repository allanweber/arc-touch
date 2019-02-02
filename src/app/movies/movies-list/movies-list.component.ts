import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { Movie } from '../model/movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListcomponent implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public movies: Movie[] = [];
  private currentPage = 1;

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.loadMovies(null);
  }

  loadMovies(event) {
    this.movieService.getMovies(this.currentPage++).subscribe(response => {
      this.movies = response;
      if (event) {
        event.target.complete();
      }
    });
  }

  doRefresh(event) {
    if (event.cancelable) {
      event.preventDefault();
    }
    this.currentPage = 1;
    this.movieService.clearMovies();
    this.loadMovies(event);
  }

  loadData(event) {
    if (event.cancelable) {
      event.preventDefault();
    }
    this.loadMovies(event);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  openMovie(movie: Movie) {
    this.router.navigate(['/movies', movie.id]);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
