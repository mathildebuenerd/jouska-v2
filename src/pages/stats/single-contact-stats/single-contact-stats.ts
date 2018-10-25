import {Component, OnInit} from '@angular/core';
import { NavParams } from 'ionic-angular';

/**
 * Generated class for the SingleContactStatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-contact-stats',
  templateUrl: 'single-contact-stats.html',
})
export class SingleContactStatsPage implements OnInit {

  contactInfos: {
    name: string,
    description: string[]
  };

  constructor(public navParams: NavParams) {
  }
  ngOnInit() {
    this.contactInfos = this.navParams.get('contactInfos');
  }

}
