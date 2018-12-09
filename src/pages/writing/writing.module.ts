import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WritingPage } from './writing';
import { WritingAnalysisService } from "../../services/writingAnalysis.service";
import { TextAnalysisService } from "../../services/textAnalysis.service";

@NgModule({
  declarations: [
    WritingPage,
  ],
  imports: [
    IonicPageModule.forChild(WritingPage),
  ],
  providers: [
    TextAnalysisService,
    WritingAnalysisService
  ]
})
export class WritingPageModule {}
