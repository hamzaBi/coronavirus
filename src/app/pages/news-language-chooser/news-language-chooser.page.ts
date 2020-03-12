import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-language-chooser',
  templateUrl: './news-language-chooser.page.html',
  styleUrls: ['./news-language-chooser.page.scss'],
})
export class NewsLanguageChooserPage implements OnInit {


  languages = [];
  selected = 'en';

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) { 
    this.languageService.selectedNewsLanguageChange.subscribe(lang => {
      this.selected = lang;
    })
  }

  ngOnInit() {
    this.languages = this.languageService.getLangs(2);
    this.selected = this.languageService.selectedNewsLanguag;
  }

  select(lang) {
    this.languageService.setNewsLang(lang);
    this.router.navigate(['/tabs/tab4']);
  }

}
