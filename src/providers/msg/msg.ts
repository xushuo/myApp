import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the MsgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MsgProvider {

    ws: WebSocket;

    createObservableSocket(url: string): Observable<any> {
        this.ws = new WebSocket(url);
        return new Observable(
            observer => {
                this.ws.onmessage = (event) => observer.next(event.data);
                this.ws.onerror = (event) => observer.error(event);
                this.ws.onclose = (event) => observer.complete()
            }
        )
    }

}
