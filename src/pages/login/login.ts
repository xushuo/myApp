import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
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
                public rest: RestProvider,
                public toastCtrl: ToastController,
                public storage: Storage) {
        super()
    }

    ionViewDidLoad() {
    }

    login() {
        var loading = super.showLoading(this.loadingCtrl, "登录中...");
        this.rest.login(this.mobile, this.password)
            .subscribe(
                e => {
                    if (e['Status'] == 'OK') {
                        this.storage.set('UserId', e['UserId']);
                        loading.dismiss();
                        this.dismiss();
                    } else {
                        loading.dismiss()
                        super.showToast(this.toastCtrl, e['StatusContent'])
                    }
                },
                error => this.errorMessage = <any>error)
    }

    pushRegister() {
        this.navCtrl.push(RegisterPage);
    }

    dismiss() {
        this.viewController.dismiss()
    }

}
