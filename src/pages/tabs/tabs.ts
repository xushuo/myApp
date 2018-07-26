import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {DiscoveryPage} from "../discovery/discovery";
import {ChatPage} from "../chat/chat";
import {MorePage} from "../more/more";
import {NotificationPage} from "../notification/notification";
import {MsgProvider} from "../../providers/msg/msg";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabDiscovery = DiscoveryPage;
  tabChat = ChatPage;
  tabNotification = NotificationPage;
  tabMore = MorePage;
  public msgCount=1;

  constructor(public msg:MsgProvider) {
      this.msg.createObservableSocket("ws://10.0.0.12:8085")
          .map(event => JSON.parse(event))
          .subscribe(event => this.msgCount = event.msgCount)
  }
}
