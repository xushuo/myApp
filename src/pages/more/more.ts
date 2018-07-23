import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {UserPage} from "../user/user";
import {UserdatalistPage} from "../userdatalist/userdatalist";
import {SettingsProvider} from "../../providers/settings/settings";
import {ScanPage} from "../scan/scan";

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-more',
    templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

    public notLogin: boolean = true
    public logined: boolean = false
    public headface: string = '';
    public userinfo: string[] = [];
    public errorMessage: any;
    selectTheme: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public loadingCtrl: LoadingController,
                public rest: RestProvider,
                public toastCtrl: ToastController,
                public storage: Storage,
                private settings: SettingsProvider) {
        super();
        this.settings.getActiveTheme().subscribe(val => this.selectTheme = val)
    }

    ionViewDidLoad() {
    }

    ionViewDidEnter() {
        this.loadUserPage();
    }

    jumpToUser() {
        this.navCtrl.push(UserPage)
    }

    loadUserPage() {
        this.storage.get('UserId').then(data => {
            if (data != null) {
                var loading = super.showLoading(this.loadingCtrl, "加载中...")
                this.rest.getUserInfo(data)
                    .subscribe(
                        e => {
                            this.userinfo = e;
                            this.headface = e["UserHeadface"] + "?" + (new Date()).valueOf()
                            this.notLogin = false;
                            this.logined = true;
                            loading.dismiss()
                        },
                    );
            } else {
                this.notLogin = true;
                this.logined = false;
            }
        })
    }

    showModal() {
        const modal = this.modalCtrl.create(LoginPage);
        //modal关闭触发回调
        modal.onDidDismiss(() => {
            this.loadUserPage();
        })
        modal.present();
    }

    gotoDataList(type) {
        this.navCtrl.push(UserdatalistPage, {"dataType": type})
    }

    toggleChangeTheme() {
        if (this.selectTheme == "dark-theme") {
            this.settings.setActiveTheme('light-theme')
        } else {
            this.settings.setActiveTheme('dark-theme')
        }
    }

    //跳转到扫描二维码，加上动画false，为了相机能在屏幕中显示。
    gotoScanQRCode() {
        this.navCtrl.push(ScanPage, null, {"animate": false})
    }
}
