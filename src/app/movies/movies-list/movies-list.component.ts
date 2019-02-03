import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, IonSearchbar, LoadingController } from '@ionic/angular';
import { Movie } from '../model/movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListcomponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonSearchbar) searchBar: IonSearchbar;
  public movies: Movie[] = [];
  private currentPage = 1;
  public isSearching = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
    public loadingController: LoadingController
  ) {}

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

  loadFromBegining(event) {
    this.isSearching = false;
    this.currentPage = 1;
    this.movieService.clearMovies();
    this.loadMovies(event);
  }

  loadMoreData(event) {
    if (event.cancelable) {
      event.preventDefault();
    }
    this.loadMovies(event);
  }

  refreshList(event) {
    if (event.cancelable) {
      event.preventDefault();
    }
    this.loadFromBegining(event);
    this.searchBar.value = null;
  }

  searchClear(event) {
    this.loadFromBegining(null);
  }

  searchChanged(event) {
    if (this.isSearchEvent(event)) {
      this.isSearching = true;
      console.log('searchChanged');
    }
  }

  isSearchEvent(event) {
    return event && event.detail && event.detail.value && event.detail.value != '';
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  openMovie(movie: Movie) {
    this.router.navigate(['/movies', movie.id]);
  }
}
