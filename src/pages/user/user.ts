import {Component} from '@angular/core';
import {
    IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController,
    ViewController
} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {Storage} from "@ionic/storage";
import {HeadfacePage} from "../headface/headface";

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: 'user.html',
})
export class UserPage extends BaseUI {

    public headface: string = 'assets/imgs/man.png';
    public nickName: string = '加载中...';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtr: ViewController,
                public modalCtrl: ModalController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public storage: Storage) {
        super()
    }

    ionViewDidEnter() {
        this.loadUserPage();
    }

    jumpToHeadface() {
        this.navCtrl.push(HeadfacePage)
    }

    loadUserPage() {
        this.storage.get('UserId').then(data => {
            if (data != null) {
                var loading = super.showLoading(this.loadingCtrl, "加载中...")
                this.nickName = "张三";
                this.headface = "assets/imgs/man.png"
                loading.dismiss()
            }
        })
    }

    updateInfo() {
        this.storage.get('UserId').then(data => {
            if (data != null) {
                var loading = super.showLoading(this.loadingCtrl, '修改中...')
                loading.dismiss()
                super.showToast(this.toastCtrl, "服务器正在维护。。。");
            }
        })
    }

    logout() {
        this.storage.remove('UserId');
        this.viewCtr.dismiss()
    }

}
