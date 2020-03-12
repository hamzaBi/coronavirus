import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, IonList } from '@ionic/angular';
import { CoronaService } from '../services/corona.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';
import { LanguageService } from '../services/language.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  @ViewChild("list", { read: ElementRef, static: false }) list: ElementRef;

  data = [];
  classes = "highlighted";
  scrollTo = null;
  behaviour = 'smooth';
  block = 'center';
  error = 'no Error';
  lang = 'en';

  constructor(
    private afd: AngularFireDatabase,
    private admob: AdMobFree,
    private languageService: LanguageService,
    private coronaService: CoronaService
  ) {

    this.languageService.selectedChange.subscribe((lang) => {
      this.lang = lang;
    })
    this.afd.list('countries', ref => {
      return ref.orderByChild('cases');
    }).valueChanges().subscribe(items => {
      this.data = items.reverse();
    });


  }

  ngOnInit(){
    const bannerConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-3864230680994667/9855848453',
      isTesting: true,
      autoShow: true
    }

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {

    }).catch(err => {
      this.error = err;
      console.log(err);
    });
  }


  scrollListVisible() {
    let arr = this.list.nativeElement.children;
    let arrayOfelements = Object.values(arr);
    let item: any = arrayOfelements.find((it: any) => {
      const t = it.children[0].children[0].children[0].innerText.toLowerCase() === this.scrollTo.toLowerCase();
      return t;
    });
    item.classList.add(this.classes);
    item.scrollIntoView({ behavior: this.behaviour, block: this.block });
    setTimeout(() => {
      let item: any = arrayOfelements.find((it: any) => {
        return it.children[0].children[0].children[0].innerText.toLowerCase() === this.scrollTo.toLowerCase();
      });
      item.classList.remove(this.classes);
    }, 3500);
  }


}
