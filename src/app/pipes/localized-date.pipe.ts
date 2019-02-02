import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate'
})
export class LocalizedDatePipe implements PipeTransform {
  private value: string | null;
  private lastDate: any;
  private lastLang: string;

  constructor(private translate: TranslateService) {}

  transform(date: any, pattern: string = 'mediumDate'): any {
    const currentLang = this.translate.currentLang;

    // if we ask another time for the same date & locale, return the last value
    if (date === this.lastDate && currentLang === this.lastLang) {
      return this.value;
    }

    this.value = new DatePipe(currentLang).transform(date, pattern);
    this.lastDate = date;
    this.lastLang = currentLang;

    return this.value;
  }
}
