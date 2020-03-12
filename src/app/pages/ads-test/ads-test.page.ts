import { Component, OnInit } from '@angular/core';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-ads-test',
  templateUrl: './ads-test.page.html',
  styleUrls: ['./ads-test.page.scss'],
})
export class AdsTestPage implements OnInit {


  error = 'no error yet';

  constructor(private admob: AdMobFree) { }

  ngOnInit() {
    const admobConfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-3864230680994667/3140931132',
      isTesting: true,
      autoShow: false
    };
    this.admob.interstitial.config(admobConfig);
    this.admob.interstitial.prepare().then(() => {

    }).catch(err => {
      this.error = err;
    });

  }

  showAd(){
    this.admob.interstitial.show();
  }

}
