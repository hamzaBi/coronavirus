import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs/tab2/:newsId',
    loadChildren: () => import('./pages/news-detail/news-detail.module').then( m => m.NewsDetailPageModule)
  },
  {
    path: 'lang-popover',
    loadChildren: () => import('./pages/lang-popover/lang-popover.module').then( m => m.LangPopoverPageModule)
  },
  {
    path: 'tabs/tab1/:country',
    loadChildren: () => import('./pages/country-details/country-details.module').then( m => m.CountryDetailsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'news-language-chooser',
    loadChildren: () => import('./pages/news-language-chooser/news-language-chooser.module').then( m => m.NewsLanguageChooserPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
