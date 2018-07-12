import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {DiscoveryPage} from "../pages/discovery/discovery";
import {ChatPage} from "../pages/chat/chat";
import {NotificationPage} from "../pages/notification/notification";
import {MorePage} from "../pages/more/more";
import {RestProvider} from '../providers/rest/rest';
import {LoginPage} from "../pages/login/login";
import {HttpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";
import {RegisterPage} from "../pages/register/register";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        DiscoveryPage,
        ChatPage,
        NotificationPage,
        MorePage,
        RegisterPage,
        LoginPage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp, {backButtonText: '返回'}),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        DiscoveryPage,
        RegisterPage,
        ChatPage,
        LoginPage,
        NotificationPage,
        MorePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        RestProvider,
        RestProvider
    ]
})
export class AppModule {
}
