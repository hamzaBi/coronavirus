import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';


import { LangPopoverPage } from '../pages/lang-popover/lang-popover.page';
import { CoronaService } from '../services/corona.service';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {


  error = 'no Error';
  constructor(
    private popover: PopoverController,
    private corona: CoronaService
  ) { 
  }

  ngOnInit(): void {

  }


  async showPopover(ev){
    const popover = await this.popover.create({
      component: LangPopoverPage,
      event: ev
    });
    await popover.present();
  }



}
