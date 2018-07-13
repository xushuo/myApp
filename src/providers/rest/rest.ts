import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
 Generated class for the RestProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class RestProvider {

    //feed
    /*  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';*/

    //account
    private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
    private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
    private apiUrlLoginWithMd5 = 'https://imoocqa.gugujiankong.com/api/account/loginwithmd5';
    private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
    private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
    //question
    private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
    private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
    private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
    private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";

    constructor(public http: Http) {
    }

    public login(mobile, password): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlLogin + "?mobile=" + mobile + "&password=" + password);
    }

    public register(mobile, password, nickname): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlRegister + "?mobile=" + mobile + "&password=" + password + "&nickname=" + nickname);
    }

    public getUserInfo(userId): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlUserInfo + "?userId=" + userId);
    }

    private getUrlReturn(url: string): Observable<string[]> {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return JSON.parse(body) || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
