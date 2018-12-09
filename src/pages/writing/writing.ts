import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TextAnalysisService } from "../../services/textAnalysis.service";
import { WritingAnalysisService } from "../../services/writingAnalysis.service";

/**
 * Generated class for the WritingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-writing',
  templateUrl: 'writing.html',
})
export class WritingPage {
  messageInput: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private writingAnalysis: WritingAnalysisService) {

    console.log("construct Writing page")

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WritingPage');

    // We get the textarea where the message is written
    const textArea = <HTMLElement>document.querySelector('#message-area textarea')

    // As keypress doesn't work with a android keyboard, we use keyup
    textArea.addEventListener("keyup", () => {
      this.writingAnalysis.analyzeText(this.messageInput)
    })
  }

}
