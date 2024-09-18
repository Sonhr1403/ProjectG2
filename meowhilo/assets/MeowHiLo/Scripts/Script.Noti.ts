import { LanguageMgr } from "../../framework/localize/LanguageMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Noti extends cc.Component {
  public static instance: Noti = null;

  @property(cc.Label)
  private notiContent: cc.Label = null;

  @property(cc.Node)
  private closeBtn: cc.Node = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    Noti.instance = this;
  }

  public openNoti(num: number) {
    if (!this.node.active) {
      this.node.active = true;
  }

    let msg = "";
    switch (num) {
      case 0:
        msg = LanguageMgr.getString("connection_error");
        this.closeBtn.active = false;
        break;
        
      case 1:
        msg = LanguageMgr.getString("connection_error1");
        this.closeBtn.active = false;
        break;

      case 2:
        msg = LanguageMgr.getString("connection_end");
        this.closeBtn.active = false;
        break;

      case 3:
        msg = LanguageMgr.getString("not_enough_money");
        this.closeBtn.active = true;
        break;

      case 4:
        msg = LanguageMgr.getString("spin_error");
        this.closeBtn.active = false;
        break;

      case 5:
        msg = LanguageMgr.getString("confirm_error");
        this.closeBtn.active = false;
        break;

      case 6:
        msg = LanguageMgr.getString("skip_error2");
        this.closeBtn.active = true;
        break;
    }

    this.notiContent.string = msg;
  }

  private onClickClose(){
    this.node.active = false;
  }
}
