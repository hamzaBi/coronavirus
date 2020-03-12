import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsLanguageChooserPageRoutingModule } from './news-language-chooser-routing.module';

import { NewsLanguageChooserPage } from './news-language-chooser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsLanguageChooserPageRoutingModule
  ],
  declarations: [NewsLanguageChooserPage]
})
export class NewsLanguageChooserPageModule {}
