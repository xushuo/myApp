import {Component, Input} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from "ionic-angular";
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";
import {DetailsPage} from "../../pages/details/details";
import {BaseUI} from "../../common/baseui";

/**
 * Generated class for the QuestionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'question-list',
    templateUrl: 'question-list.html'
})
export class QuestionListComponent extends BaseUI {

    public errorMessage;
    public list;
    @Input("dataType") dataSourceType;

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public rest: RestProvider,
                public toastCtrl: ToastController,
                public storage: Storage,
                public navParams: NavParams) {
        super()
    }

    ngAfterContentInit() {
        this.storage.get("UserId").then(e => {
            if (e != null) {
                var loading = super.showLoading(this.loadingCtrl, "加载中...")
                this.rest.getUserQuestionList(e, this.dataSourceType).subscribe(e => {
                        this.list = e
                        loading.dismissAll();
                    },
                    error => this.errorMessage = <any>error)
            } else {
                super.showToast(this.toastCtrl, "请登录后浏览...")
            }
        })
    }


    gotoDetails(id) {
        this.navCtrl.push(DetailsPage, {id: id})
    }

}
