import { LanguageMgr } from "../../../framework/localize/LanguageMgr";
import AudioController, { SOUND_TYPE } from "../Controller/AudioController";

const { ccclass, property } = cc._decorator;

export enum notis {
  connection_unstable = 0,
  connection_failed = 1,
  connection_end = 2,
  not_enough_money = 3,
  spin_error = 4,
  confirm_error = 5,
  something_wrong = 6,
}

@ccclass
export default class Noti extends cc.Component {

  @property(cc.Label)
  private notiContent: cc.Label = null;

  @property(cc.Node)
  private closeBtn: cc.Node = null;

  ////////////////////////////////////////////

  private listNotis = [
    "Connection is unstable!\nPlease check your wifi/3g connection again.",
    "Game connection failed.\nPlease try again",
    "You have been disconnected.\nPlease try again",
    "You don't have enough money.\nPlease add more or reduce your bet",
    "Unsuccessful bet.\nPlease try again",
    "Unsuccessful start game.\nPlease try again",
    "Something went wrong.\nPlease try again",
  ]

  // LIFE-CYCLE CALLBACKS:

  public openNoti(num: number) {
    if (!this.node.active) {
      this.node.active = true;
    }

    let msg = this.listNotis[num];
    switch (num) {
      case notis.connection_unstable:
      case notis.connection_failed:
      case notis.connection_end:
        case notis.spin_error:
        case notis.confirm_error:
          this.closeBtn.active = false;
          break;

      case notis.not_enough_money:
      case notis.something_wrong:
        this.closeBtn.active = true;
        break;
    }

    this.notiContent.string = msg;
  }

  private onClickClose() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = false;
  }
}
