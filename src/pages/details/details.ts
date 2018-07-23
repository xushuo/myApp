import {Component} from '@angular/core';
import {
    IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController,
    ViewController
} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";
import {AnswerPage} from "../answer/answer";

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-details',
    templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI {

    public id;
    public UserId;
    public question;
    public answers;
    public IsFavourite;
    public errorMessage;
    public isMyquestion;

    constructor(public navCtrl: NavController,
                public viewController: ViewController,
                public loadingCtrl: LoadingController,
                public rest: RestProvider,
                public toastCtrl: ToastController,
                public modalCtrl: ModalController,
                public storage: Storage,
                public navParams: NavParams) {
        super()
    }

    ionViewDidLoad() {
        this.id = this.navParams.get("id")
        this.loadQuestion();
    }

    saveFavourite() {
        this.storage.get("UserId").then(val => {
            if (val != null) {
                this.UserId = val;
                var loading = super.showLoading(this.loadingCtrl, "加载中...");
                this.rest.getQuestionWithUser(this.id, val).subscribe(
                    e => {
                        this.question = e;
                        this.answers = e["Answers"];
                        this.IsFavourite = e["IsFavourite"]
                        this.isMyquestion = (e["OwnUserId"] == val)
                        loading.dismiss();
                    },
                    error => this.errorMessage = <any>error);
            }
        })

    }

    loadQuestion() {
        var loading = super.showLoading(this.loadingCtrl, "加载中...");
        this.rest.getQuestionWithUser(this.id, this.UserId).subscribe(
            e => {
                if (e["Status"] == "OK") {
                    loading.dismiss();
                    super.showToast(this.toastCtrl, this.IsFavourite ? "取消关注成功" : "关注成功")
                    this.IsFavourite = !this.IsFavourite
                }
            },
            error => this.errorMessage = <any>error);
    }

    showAnswer() {
        const modal = this.modalCtrl.create(AnswerPage, {"id": this.id});
        modal.onDidDismiss(() => {
            this.loadQuestion();
        })
        modal.present()
    }

}
