import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";
import {DetailsPage} from "../details/details";

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-notification',
    templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI {

    public errorMessage
    public list

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public rest: RestProvider,
                public toastCtrl: ToastController,
                public storage: Storage,
                public navParams: NavParams) {
        super()
    }

    ionViewDidLoad() {
        this.storage.get("UserId").then(e => {
            if (e != null) {
                var loading = super.showLoading(this.loadingCtrl, "加载中...")
                this.rest.getUserNotifications(e).subscribe(e => {
                        this.list = e
                        loading.dismissAll();
                    },
                    error => this.errorMessage = <any>error)
            } else {
                super.showToast(this.toastCtrl, "请登录后浏览...")
            }
        })
    }

    gotoDetails(id) {
        this.navCtrl.push(DetailsPage, {id: id})
    }
}
