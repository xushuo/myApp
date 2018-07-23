import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs";

/*
 Generated class for the SettingProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class SettingsProvider {

    public theme: BehaviorSubject<string>

    constructor(public http: Http) {
        this.theme = new BehaviorSubject("light-theme");
    }

    public  setActiveTheme(val) {
        this.theme.next(val)
    }

    public  getActiveTheme() {
        return this.theme.asObservable();
    }

}
