import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { MoviesModule } from './movies/movies.module';
import { genreProviderFactory, GenreService } from './movies/services/genre.service';
import {
  configurationProviderFactory,
  MoviesConfigurationService
} from './movies/services/movies-configuration.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), MoviesModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GenreService,
    {
      provide: APP_INITIALIZER,
      useFactory: genreProviderFactory,
      deps: [GenreService],
      multi: true
    },
    MoviesConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: configurationProviderFactory,
      deps: [MoviesConfigurationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
