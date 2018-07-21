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

    private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

    //account
    private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
    private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
    private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
    private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';

    private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

    //question
    private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
    private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
    private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
    private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
    private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
    private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";


    //notification
    private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";


    constructor(public http: Http) {
    }

    public login(mobile, password): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlLogin + "?mobile=" + mobile + "&password=" + password);
    }

    public getUserInfo(userId): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlUserInfo + "?userId=" + userId);
    }

    public updateInfo(userId, nickname): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlUpdateNickName + "?userId=" + userId + "&nickname=" + nickname);
    }

    /**
     * 保存提问
     *
     * @param {any} userId
     * @param {any} title
     * @param {any} content
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    saveQuestion(userId, title, content): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlQuestionSave + "?userid=" + userId + "&title=" + title + "&content=" + content);
    }

    /**
     * 获取问题的详情
     *
     * @param {any} id
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    getQuestion(id): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlGetQuestion + "?id=" + id);
    }

    /**
     * 获取问题的详情，传递 userid 获取到当前用户有没有关注此问题
     *
     * @param {any} questionId
     * @param {any} userId
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    getQuestionWithUser(questionId, userId): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlGetQuestionWithUser + "?id=" + questionId + "&userid=" + userId);
    }

    saveFavourite(questionId, userId): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlSaveFavourite + "?questionid=" + questionId + "&userid=" + userId);
    }

    answer(userId, questionId, content): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlAnswer + "?userid=" + userId + "&questionid=" + questionId + "&content=" + content);
    }

    /**
     * 注册请求
     *
     * @param {any} mobile
     * @param {any} nickname
     * @param {any} password
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    register(mobile, nickname, password): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlRegister + "?mobile=" + mobile + "&nickname=" + nickname + "&password=" + password)
    }

    /**
     * 请求首页的 feeds 流
     *
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    getFeeds(): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlFeeds);
    }

    /**
     * 获取所有的新问题
     *
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    getQuestions(): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlQuestionList);
    }

    /**
     * 获取用户的提醒消息
     *
     * @param {any} userId
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    getUserNotifications(userId): Observable<string[]> {
        return this.getUrlReturn(this.apiUrlUserNotifications + "?userid=" + userId);
    }

    /**
     * 获取用户的相关问题列表
     *
     * @param {any} userId
     * @param {any} type  question/answer/favourite
     * @returns {Observable<string[]>}
     * @memberof RestProvider
     */
    getUserQuestionList(userId, type): Observable<string[]> {
        return this.getUrlReturn(this.apiGetUserQuestionList + "?userid=" + userId + "&type=" + type);
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
