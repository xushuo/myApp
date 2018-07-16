import {Component} from '@angular/core';
import {
    IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController,
    ViewController
} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {BaseUI} from "../../common/baseui";
import {Storage} from "@ionic/storage";
import {RestProvider} from "../../providers/rest/rest";
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
                public rest: RestProvider,
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
                this.rest.getUserInfo(data)
                    .subscribe(
                        e => {
                            this.nickName = e["UserNickName"];
                            this.headface = e["UserHeadface"] + "?" + (new Date()).valueOf()
                            loading.dismiss()
                        },
                    );
            }
        })
    }

    updateInfo() {
        this.storage.get('UserId').then(data => {
            if (data != null) {
                var loading = super.showLoading(this.loadingCtrl, '修改中...')
                this.rest.updateInfo(data, this.nickName).subscribe(
                    e => {
                        if (e["Status"] == "OK") {
                            loading.dismiss()
                            super.showToast(this.toastCtrl, "昵称修改成功。");
                        } else {
                            loading.dismiss()
                            super.showToast(this.toastCtrl, e["StatusContent"]);
                        }
                    }
                )
            }
        })
    }

    logout() {
        this.storage.remove('UserId');
        this.viewCtr.dismiss()
    }

}
