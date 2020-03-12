import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { LanguageService } from '../services/language.service';
import { NewsLanguageChooserPage } from '../pages/news-language-chooser/news-language-chooser.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  news = [];
  newLang = 'en';

  constructor(
    private afd: AngularFireDatabase,
    private afs: AngularFireStorage,
    private languageService: LanguageService
  ) {

    this.afd.list('news', ref=> {
      return ref.orderByChild('priority');
    }).valueChanges().subscribe(v => {
      this.news = v.filter(function(n: any) {
        return n.lang === 'en';
      });
      this.getDownloadUrl();
    });
    this.languageService.selectedNewsLanguageChange.subscribe(lang => {
      this.newLang = lang;
      this.afd.list('news', ref=> {
        return ref.orderByChild('priority');
      }).valueChanges().subscribe(v => {
        this.news = v.filter(function(n: any) {
          return n.lang === lang;
        });
        this.getDownloadUrl();
      });
    });
    
  }



  ngOnInit(){
    
  }

  getDownloadUrl(){
    this.news.forEach(n => {
      this.afs.ref(n.imageUrl).getDownloadURL().subscribe(imageUrl => {
        n.downUrl = imageUrl;
       });
    })
    
  }




}
