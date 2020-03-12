import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

const LNG_KEY = 'SELECTED_LANGUAGE';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {


  selected = 'en';
  selectedNewsLanguag = 'en';

  selectedChange: Subject<string> = new Subject<string>();
  selectedNewsLanguageChange: Subject<string> = new Subject<string>();

  constructor(
    private translateService: TranslateService,
  ) {
    this.selectedChange.subscribe(lang => {
      this.selected = lang;
    });
    this.selectedNewsLanguageChange.subscribe(nLang => {
      this.selectedNewsLanguag = nLang;
    });
  }



  setInitialLang() {
    let language = this.translateService.getBrowserLang();
    this.translateService.setDefaultLang(language);
  }

  getLangs(type: number) {
    if (type === 1) {
      return [
        {
          text: this.translateService.instant('LANGUAGE.en'),
          value: 'en',
          img: 'assets/imgs/en.png'
        },
        {
          text: this.translateService.instant('LANGUAGE.ar'),
          value: 'ar',
          img: 'assets/imgs/ar.png'
        },
        {
          text: this.translateService.instant('LANGUAGE.fr'),
          value: 'fr',
          img: 'assets/imgs/fr.png'
        },
      ]
    }else if (type === 2){
      return [
        {
          text: this.translateService.instant('LANGUAGE.en'),
          value: 'en',
          img: 'assets/imgs/en.png'
        },
        {
          text: this.translateService.instant('LANGUAGE.ar'),
          value: 'ar',
          img: 'assets/imgs/ar.png'
        },
        {
          text: this.translateService.instant('LANGUAGE.fr'),
          value: 'fr',
          img: 'assets/imgs/fr.png'
        },
        {
          text: this.translateService.instant('LANGUAGE.all'),
          value: 'all',
          img: 'assets/imgs/all.png'
        }
      ]
    }
  }

  setLang(lang) {
    this.translateService.use(lang);
    this.selectedChange.next(lang);
    this.selectedNewsLanguageChange.next(lang);
  }


  setNewsLang(lang) {
    this.selectedNewsLanguageChange.next(lang);
  }
}
