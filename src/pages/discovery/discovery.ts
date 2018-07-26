import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var  html2canvas:any;
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
export class DiscoveryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	
  	
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoveryPage');
  }
  saveImg(){
　　　　　　　　var shareContent = document.body;
　　　　　　　　html2canvas( shareContent,{
　　　　　　　　　　onrendered: function(canvas){
　　　　　　　　　　var img = new Image();
　　　　　　　　　　img.src = canvas.toDataURL() ;
　　　　　　　　　　document.getElementById("photo").appendChild(img);
　　　　　　　　　　
　　　　　　　　}
　　　　　　})
}

}
