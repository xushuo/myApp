import {Component} from '@angular/core';
import {
    LoadingController, ModalController, NavController, NavParams, Tabs, ToastController,
    ViewController
} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {QuestionPage} from "../question/question";
import {RestProvider} from "../../providers/rest/rest";
import {BaseUI} from "../../common/baseui";
import {DetailsPage} from "../details/details";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends BaseUI {

    public feeds: any;
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
    }

    ionViewDidLoad() {
        this.feeds = [{
            IdentityId: 1,
            HeadFace: "assets/imgs/man.png",
            ContentTitle: "为什么天上会有星星",
            ContentSummary: "因为是各种流行彗星和太阳自然而然的就在上面了。",
            LickCount: "200",
            CommentContent: "真的不太确定",
        }];
        this.getFeeds()
    }

    gotoQuestion() {
        var modal = this.modalCtrl.create(QuestionPage)
        modal.present()
    }

    gotoChat() {
        this.selectTab(2)
    }

    //选定制定tab
    selectTab(index) {
        var t: Tabs = this.navCtrl.parent;
        t.select(index)
    }

    getFeeds() {
        var loading = super.showLoading(this.loadingCtrl, "加载中...");
        this.rest.getFeeds().subscribe(
            e => {
                this.feeds = e
                loading.dismiss();
            },
            error => this.errorMessage = <any>error);
    }

    gotoDetails(id) {
        this.navCtrl.push(DetailsPage, {id: id})

    }
}
