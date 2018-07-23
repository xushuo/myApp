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
import {UserPage} from "../pages/user/user";
import {HeadfacePage} from "../pages/headface/headface";

//导入四个外部加载进来的组件，具体的安装方法在 09-01 章节
import {File} from '@ionic-native/file';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import {Camera} from '@ionic-native/camera';
import {QRScanner} from '@ionic-native/qr-scanner';
import {AppVersion} from '@ionic-native/app-version';

import {QuestionPage} from "../pages/question/question";
import {DetailsPage} from "../pages/details/details";
import {AnswerPage} from "../pages/answer/answer";
import {ComponentsModule} from "../components/components.module";
import {UserdatalistPage} from "../pages/userdatalist/userdatalist";
import {SettingsProvider} from "../providers/settings/settings";
import {ScanPage} from "../pages/scan/scan";
import {VersionPage} from "../pages/version/version";


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        UserPage,
        DiscoveryPage,
        ChatPage,
        UserdatalistPage,
        NotificationPage,
        MorePage,
        RegisterPage,
        HeadfacePage,
        QuestionPage,
        LoginPage,
        AnswerPage,
        ScanPage,
        DetailsPage,
        VersionPage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp, {backButtonText: '返回'}),
        ComponentsModule,
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AnswerPage,
        UserdatalistPage,
        UserPage,
        ScanPage,
        DetailsPage,
        QuestionPage,
        HeadfacePage,
        DiscoveryPage,
        RegisterPage,
        ChatPage,
        LoginPage,
        NotificationPage,
        MorePage,
        VersionPage,
        TabsPage
    ],
    providers: [
        SettingsProvider,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        RestProvider,
        File,
        Transfer,
        FilePath,
        Camera,
        QRScanner,
        AppVersion
    ]
})
export class AppModule {
}
