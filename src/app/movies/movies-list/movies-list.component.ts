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
    this.loadUpcomings(null);
  }

  loadUpcomings(event) {
    this.movieService.getMovies(this.currentPage++).subscribe(response => {
      this.movies = response;
      if (event) {
        event.target.complete();
      }
    });
  }

  loadSearching(event) {
    this.movieService.searchMovies(this.currentPage++, this.searchBar.value).subscribe(response => {
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
    this.loadUpcomings(event);
  }

  loadMoreData(event) {
    if (event.cancelable) {
      event.preventDefault();
    }
    if (!this.isSearching) {
      this.loadUpcomings(event);
    } else {
      this.loadSearching(event);
    }
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
      this.currentPage = 1;
      this.movieService.clearMovies();
      this.loadSearching(null);
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
