// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AudioManager, { SOUND_TYPE } from "./Script.Audio";
import HeadBar from "./Script.HeadBar";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WalletToggle extends cc.Component {
  @property(cc.Sprite)
  private logo: cc.Sprite = null;

  @property(cc.Label)
  private title: cc.Label = null;

  @property(cc.Label)
  private balance: cc.Label = null;

  // LIFE-CYCLE CALLBACKS:

  public updateToggle(wallet: string, balance: number) {
    switch (wallet) {
      case "MATIC":
        this.logo.spriteFrame = HeadBar.instance.walletIconSF[0];
        break;
 
      case "TON":
        this.logo.spriteFrame = HeadBar.instance.walletIconSF[1];
        break;
 
      case "BNB":
        this.logo.spriteFrame = HeadBar.instance.walletIconSF[2];
        break;

      case "USDT":
        this.logo.spriteFrame = HeadBar.instance.walletIconSF[3];
        break;

      case "TRX":
        this.logo.spriteFrame = HeadBar.instance.walletIconSF[4];
        break;

      case "GUSD":
        this.logo.spriteFrame = HeadBar.instance.walletIconSF[5];
        break;
 
      case "USDC":
        this.logo.spriteFrame = HeadBar.instance.walletIconSF[6];
        break;
 
      default:
        this.logo.spriteFrame = HeadBar.instance.walletIconSF[7];
        break;
    }

    this.balance.string = balance.toFixed(HeadBar.instance.getFixedNum2(wallet));
    this.title.string = wallet;
  }

  public onClickChangeWallet() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);
    
    HeadBar.instance.onClickChangeWallet(this.title.string);
  }
}
