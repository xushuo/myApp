import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";
import {UserPage} from "../user/user";

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
    public userinfo =null;
    public errorMessage: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public modalCtrl: ModalController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public storage: Storage) {
        super();
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
                this.userinfo = {UserNickName: '张三'};
                this.headface = "assets/imgs/man.png"
                this.notLogin = false;
                this.logined = true;
                loading.dismiss()
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
}
