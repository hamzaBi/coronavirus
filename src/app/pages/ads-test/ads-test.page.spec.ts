import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdsTestPage } from './ads-test.page';

describe('AdsTestPage', () => {
  let component: AdsTestPage;
  let fixture: ComponentFixture<AdsTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdsTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
