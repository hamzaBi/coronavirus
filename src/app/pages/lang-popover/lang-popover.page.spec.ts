import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LangPopoverPage } from './lang-popover.page';

describe('LangPopoverPage', () => {
  let component: LangPopoverPage;
  let fixture: ComponentFixture<LangPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LangPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
