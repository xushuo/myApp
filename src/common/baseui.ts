import {Loading, LoadingController, Toast, ToastController} from "ionic-angular";
/**
 * Created by Administrator on 2018/7/6.
 */
export abstract class BaseUI {

  constructor() {
  }

  /**
   * 通用的展示 loading 的组件
   * @param loadingCtrl
   * @param message
   * @returns {Loading}
   */
  protected showLoading(loadingCtrl: LoadingController,
                        message: string): Loading {
    let loader = loadingCtrl.create({
      content: message,
      duration: 3000,
      dismissOnPageChange: true
    });
    loader.present();
    return loader
  }

  /**
   * 通用的展示 toast 的组件
   * @param toastCtrl
   * @param message
   * @returns {Toast}
   */
  protected showToast(toastCtrl: ToastController, message: string): Toast {
    let toast = toastCtrl.create({
      message: message,
      duration: 3000, //默认展示的时长
      position: 'bottom'
    });
    toast.present();
    return toast;
  }
}
