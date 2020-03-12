import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsLanguageChooserPage } from './news-language-chooser.page';

describe('NewsLanguageChooserPage', () => {
  let component: NewsLanguageChooserPage;
  let fixture: ComponentFixture<NewsLanguageChooserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLanguageChooserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsLanguageChooserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
