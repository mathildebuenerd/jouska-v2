import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import { SingleContactStatsPage } from "./single-contact-stats/single-contact-stats";
import {TextAnalysisService} from "../../services/textAnalysis.service";

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage implements OnInit {

  contactList = [
    {
      name: 'Pauline',
      description: [
        '0635527684',
        'France',
        'Contacté occasionnellement',
      ]
    },
    {
      name: 'Maman',
      description: [
        '0685947852',
        'France',
        'Contacté fréquemment',
      ]
    },
    {
      name: 'Justine',
      description: [
        '0602859632',
        'Suisse',
        'Contacté rarement',
      ]
    }
  ];

  constructor(private navCtrl: NavController,
              private textAnalysisService: TextAnalysisService) // inject the textAnalysis service
  {
    let myVar = this.textAnalysisService.selfishnessAnalysis('tu vas bien?');
    console.log(myVar);
  }

  onLoadContactStats(contactInfos: {name: string, description: string[]}) {
    this.navCtrl.push(SingleContactStatsPage, {contactInfos: contactInfos});
  }

  ngOnInit(): void {

  }
}
