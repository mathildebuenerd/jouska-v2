import { Component } from "@angular/core";
import { StatsPage } from "../stats/stats";
import {DashboardPage} from "../dashboard/dashboard";
import {MessagesPage} from "../messages/messages";
import {WritingPage} from "../writing/writing";
import {SettingsPage} from "../settings/settings";



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {
  dashboardPage = DashboardPage;
  messagesPage = MessagesPage;
  writingPage = WritingPage;
  statsPage = StatsPage;
  settingsPage = SettingsPage;
}
