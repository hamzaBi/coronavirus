import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lang-popover',
  templateUrl: './lang-popover.page.html',
  styleUrls: ['./lang-popover.page.scss'],
})
export class LangPopoverPage implements OnInit {


  languages = [];
  selected = '';


  constructor(
    private languageService: LanguageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.languages = this.languageService.getLangs(1);
    this.selected = this.languageService.selected;
  }

  select (lan){
    this.languageService.setLang(lan);
    this.router.navigate(['/tabs/tab4']);
  }

}
