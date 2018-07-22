import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {RestProvider} from "../../providers/rest/rest";
import {BaseUI} from "../../common/baseui";

/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-answer',
    templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI {

    public id;
    public errorMessage;
    public contentInfo

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public storage: Storage,
                public loadCtr: LoadingController,
                public toastCtr: ToastController,
                public rest: RestProvider) {
        super()
        this.id = this.navParams.get("id")
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AnswerPage');
    }

    dismiss() {
        this.viewCtrl.dismiss()
    }

    submitInfo() {
        this.storage.get("UserId").then(e => {
            if (e != null) {
                var loading = super.showLoading(this.loadCtr, "回答中...")
                this.rest.answer(e, this.id, this.contentInfo).subscribe(e => {
                        if (e["Status"] == "OK") {
                            loading.dismissAll();
                            this.dismiss()
                        } else {
                            loading.dismissAll();
                            super.showToast(this.toastCtr, e["StatusContent"])
                        }
                    },
                    error => this.errorMessage = <any>error)
            } else {
                super.showToast(this.toastCtr, "请登录后回答...")
            }
        })
    }
}
