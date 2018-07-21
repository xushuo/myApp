import {Component} from '@angular/core';
import {
    LoadingController, ModalController, NavController, NavParams, Tabs, ToastController,
    ViewController
} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {QuestionPage} from "../question/question";
import {RestProvider} from "../../providers/rest/rest";
import {BaseUI} from "../../common/baseui";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends BaseUI {

    public feeds: string[];
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

    ionViewDidLoad(){
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
}
