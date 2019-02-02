import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GenresComponent } from './genres/genres.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesListcomponent } from './movies-list/movies-list.component';
import { MovieRoutingModule } from './movies.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieRoutingModule,
    HttpClientModule,
    TranslateModule
  ],
  declarations: [MoviesListcomponent, MovieDetailComponent, GenresComponent]
})
export class MoviesModule {}
