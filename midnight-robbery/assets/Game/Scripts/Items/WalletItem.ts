import AudioController, { SOUND_TYPE } from "../Controller/AudioController";
import GameController from "../Controller/GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WalletItem extends cc.Component {
  @property(cc.Sprite)
  private logo: cc.Sprite = null;

  @property(cc.Label)
  private title: cc.Label = null;

  @property(cc.Label)
  private balance: cc.Label = null;

  // LIFE-CYCLE CALLBACKS:

  public updateToggle(wallet: string, balance: number) {
    let headBar = GameController.Instance.getHeadBar();
    switch (wallet) {
      case "MATIC":
        this.logo.spriteFrame = headBar.walletIconSF[0];
        this.balance.string = balance.toFixed(2);
        break;

      case "BNB":
        this.logo.spriteFrame = headBar.walletIconSF[1];
        this.balance.string = balance.toFixed(2);
        break;

      case "USDT":
        this.logo.spriteFrame = headBar.walletIconSF[2];
        this.balance.string = balance.toFixed(2);
        break;

      case "TRX":
        this.logo.spriteFrame = headBar.walletIconSF[3];
        this.balance.string = balance.toFixed(2);
        break;

      case "GUSD":
        this.logo.spriteFrame = headBar.walletIconSF[4];
        this.balance.string = balance.toFixed(2);
        break;

      default:
        this.logo.spriteFrame = headBar.walletIconSF[7];
        this.balance.string = balance.toFixed(2);
        break;
    }

    this.title.string = wallet;
  }

  public onClickChangeWallet() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    GameController.Instance.getHeadBar().onClickChangeWallet(this.title.string);
  }
}
