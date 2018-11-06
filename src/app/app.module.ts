import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { StatsPage } from "../pages/stats/stats";
import { SingleContactStatsPage } from "../pages/stats/single-contact-stats/single-contact-stats";
import { SettingsPage } from "../pages/settings/settings";
import { TabsPage } from "../pages/tabs/tabs";
import {MessagesPage} from "../pages/messages/messages";
import {WritingPage} from "../pages/writing/writing";
import {DashboardPage} from "../pages/dashboard/dashboard";

import { TextAnalysisService } from "../services/textAnalysis.service";

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    MessagesPage,
    WritingPage,
    StatsPage,
    SingleContactStatsPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    MessagesPage,
    WritingPage,
    StatsPage,
    SingleContactStatsPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TextAnalysisService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
