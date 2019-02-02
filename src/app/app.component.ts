import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private allowedLanguages = ['en-US', 'pt-BR'];
  private defualtLanguge = 'en-US';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private globalization: Globalization,
    private toastController: ToastController,
    private androidPermissions: AndroidPermissions
  ) {
    this.initializeApp();
    translate.setDefaultLang(this.defualtLanguge);

    this.globalization
      .getPreferredLanguage()
      .then(res => {
        if (this.allowedLanguages.find(e => e == res.value)) {
          translate.use(res.value);
          console.log('language :', res.value);
        } else {
          console.log('Your language is not supported');
          this.presentLanguageError('LANG_NOT_SUPORTED');
        }
      })
      .catch(e => {
        console.log('Error to get preferred language: ', e);
        this.presentLanguageError('LANG_ERROR');
      });

    registerLocaleData(localePt);
    registerLocaleData(localeEn);

    if (this.platform.is('android')) {
      this.androidPermissions
        .checkPermission(this.androidPermissions.PERMISSION.INTERNET)
        .then(
          result => console.log('Has permission?', result.hasPermission),
          err =>
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
        );
    }

    /*
      Use this to set locale when runing with ionic serve
    */
    translate.use('en-US');
  }

  async presentLanguageError(message: string) {
    this.translate.get(message).subscribe(result => {
      this.toastController
        .create({
          message: result,
          showCloseButton: true,
          position: 'top',
          closeButtonText: 'OK'
        })
        .then(toast => toast.present());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
