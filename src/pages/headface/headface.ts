import {Component} from '@angular/core';
import {
    ActionSheetController, LoadingController, ModalController, NavController, NavParams, Platform,
    ToastController, ViewController
} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {BaseUI} from "../../common/baseui";
/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-headface',
    templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {

    public userId: string;
    public lastImage: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public actionSheetCtrl: ActionSheetController,
                public modalCtrl: ModalController,
                public loadingCtrl: LoadingController,
                public viewCtrl: ViewController,
                public toastCtrl: ToastController,
                public storage: Storage,
                public platform: Platform) {
        super()
    }

    ionViewDidEnter() {
        this.storage.get('UserId').then((val) => {
            if (val != null) {
                this.userId = val;
            }
        });
    }
}
