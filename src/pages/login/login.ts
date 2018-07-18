import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {Storage} from "@ionic/storage";
import {RegisterPage} from "../register/register";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

    public mobile: string;
    public password: string;
    public errorMessage: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewController: ViewController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public storage: Storage) {
        super()
    }

    ionViewDidLoad() {
    }

    login() {
        var loading = super.showLoading(this.loadingCtrl, "登录中...");
        this.storage.set('UserId', "1");
        loading.dismiss();
        this.dismiss();
    }

    pushRegister() {
        this.navCtrl.push(RegisterPage);
    }

    dismiss() {
        this.viewController.dismiss()
    }

}
