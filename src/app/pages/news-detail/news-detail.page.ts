import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { News } from 'src/app/models/News.model';
import { Platform } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {



  dirClass = '';

  item: any ={
    id : 0,
    title : '',
    content : '',
    content_0 : '',
    priority : -1,
    date : '',
    imageUrl: '',
    source : '',
    downUrl: ''
  };

  constructor(
    private afd: AngularFireDatabase,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private afs: AngularFireStorage
  ) { 
    
    
     
  }


  ngOnInit() {
    this.activeRoute.paramMap.subscribe(paramMap => {
      if(! paramMap.has('newsId')){
        this.router.navigate(['tabs/tab2']);
      }
      const newsId = paramMap.get('newsId');
      this.afd.list('news').valueChanges().subscribe(news => {
        this.item = news.find( function(n: News){ return n.id ===  parseInt(newsId) });
        this.afs.ref(this.item.imageUrl).getDownloadURL().subscribe(imageUrl => {
          this.item.downUrl = imageUrl;
         });
       });
    });
    
   }


}
