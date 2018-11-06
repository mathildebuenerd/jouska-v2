import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WritingPage } from './writing';
import {WritingAnalysisService} from "../../services/writingAnalysis.service";

@NgModule({
  declarations: [
    WritingPage,
  ],
  imports: [
    IonicPageModule.forChild(WritingPage),
  ],
  providers: [
    WritingAnalysisService
  ]
})
export class WritingPageModule {}
