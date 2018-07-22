import {Component} from '@angular/core';
import {
    IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController,
    ViewController
} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {BaseUI} from "../../common/baseui";
import {Storage} from "@ionic/storage";
import {DetailsPage} from "../details/details";

/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-discovery',
    templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI {

    public questions: any;
    public errorMessage: any

    constructor(public navCtrl: NavController,
                public viewController: ViewController,
                public loadingCtrl: LoadingController,
                public rest: RestProvider,
                public toastCtrl: ToastController,
                public modalCtrl: ModalController,
                public storage: Storage,
                public navParams: NavParams) {
        super()
        this.questions = [{
            IdentityId: 1,
            HeadFace: "assets/imgs/man.png",
            ContentTitle: "为什么天上会有星星",
            ContentSummary: "因为是各种流行彗星和太阳自然而然的就在上面了。",
            LickCount: "200",
            CommentContent: "真的不太确定",
        }];
    }

    ionViewDidLoad() {
        this.getQuestions()
    }

    doRefresh(event) {
        this.getQuestions()
        event.complete()
    }

    gotoDetails(id) {
        this.navCtrl.push(DetailsPage, {id: id})
    }

    getQuestions() {
        var loading = super.showLoading(this.loadingCtrl, "加载中...");
        this.rest.getQuestions().subscribe(
            e => {
                this.questions = e
                loading.dismiss();
            },
            error => this.errorMessage = <any>error);
    }


}
