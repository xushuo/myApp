import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
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
                public rest: RestProvider,
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
            this.rest.register(this.mobile, this.password, this.nickname)
                .subscribe(
                    e => {
                        if (e['Status'] == 'OK') {
                            //this.storage.set('UserId', e['UserId']);
                            loading.dismiss();
                            super.showToast(this.toastCtrl, "注册成功。")
                            this.dismiss();
                        } else {
                            loading.dismiss()
                            super.showToast(this.toastCtrl, e['StatusContent'])
                        }
                    },
                    error => this.errorMessage = <any>error)
        }
    }
}
