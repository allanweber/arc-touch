import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { MoviesModule } from './movies/movies.module';
import { genreProviderFactory, GenreService } from './movies/services/genre.service';
import {
  configurationProviderFactory,
  MoviesConfigurationService
} from './movies/services/movies-configuration.service';
import { languageProviderFactory, LanguageService } from './services/language.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    MoviesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GenreService,
    {
      provide: APP_INITIALIZER,
      useFactory: languageProviderFactory,
      deps: [LanguageService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: genreProviderFactory,
      deps: [GenreService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configurationProviderFactory,
      deps: [MoviesConfigurationService],
      multi: true
    },
    MoviesConfigurationService,
    Globalization,
    AndroidPermissions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
