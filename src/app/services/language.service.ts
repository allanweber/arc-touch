import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localePt from '@angular/common/locales/pt';
import { Injectable } from '@angular/core';
import { Globalization } from '@ionic-native/globalization/ngx';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private allowedLanguages = ['en-US', 'pt-BR'];
  private defualtLanguge = 'en-US';

  constructor(
    private translate: TranslateService,
    private globalization: Globalization,
    private toastController: ToastController
  ) {}

  load() {
    console.log('setting lang');

    this.translate.setDefaultLang(this.defualtLanguge);

    this.globalization
      .getPreferredLanguage()
      .then(res => {
        if (this.allowedLanguages.find(e => e == res.value)) {
          this.translate.use(res.value);
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

    /*
      Use this to set locale when runing with ionic serve
    */
    this.translate.use('en-US');
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
}

export function languageProviderFactory(languageService: LanguageService) {
  return () => languageService.load();
}
