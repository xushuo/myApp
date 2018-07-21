import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-question',
    templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI {

    public title: string
    public content: string
    public errorMessage: any

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public storage: Storage,
                public loadCtr: LoadingController,
                public toastCtr: ToastController,
                public rest: RestProvider) {
        super()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad QuestionPage');
    }

    dismiss() {
        this.viewCtrl.dismiss()
    }

    submitQuestion() {
        this.storage.get("UserId").then(e => {
            if (e != null) {
                var loading = super.showLoading(this.loadCtr, "问题正在发表中...")
                this.rest.saveQuestion(e, this.title, this.content).subscribe(e => {
                        if (e["Status"] == "OK") {
                            loading.dismissAll();
                            this.dismiss()
                        } else {
                            loading.dismissAll();
                            super.showToast(this.toastCtr, e["StatusContent"])
                        }
                    },
                    error => this.errorMessage = <any>error)
            }else {
                super.showToast(this.toastCtr,"请登录后发布提问...")
            }
        })
    }

}
