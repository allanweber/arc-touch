import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../model/movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  private movieId: number;
  public movie: Movie;

  constructor(
    private movieService: MovieService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params['id']) {
        this.movieId = params['id'];
        this.movieService.getMovie(this.movieId).subscribe(movie => {
          this.movie = movie;
          if (!this.movie) {
            this.back();
          }
        });
      } else {
        this.back();
      }
    });
  }

  back() {
    this.route.navigate(['/movies']);
  }
}
