import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {Storage} from "@ionic/storage";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {

    public mobile: string;
    public nickname: string;
    public password: string;
    public repassword: string;
    public errorMessage: any;

    constructor(public navCtrl: NavController,
                public viewController: ViewController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public storage: Storage,
                public navParams: NavParams) {
        super()
    }

    ionViewDidLoad() {
    }


    dismiss() {
        this.viewController.dismiss()
    }

    backLogin() {
        this.navCtrl.pop()
    }

    register() {
        if (this.password != this.repassword) {
            super.showToast(this.toastCtrl, "两次输入的密码不匹配。")
        } else {
            var loading = super.showLoading(this.loadingCtrl, "注册中...");
            super.showToast(this.toastCtrl, "服务器正在维护。。。")
            this.dismiss();
        }
    }
}
