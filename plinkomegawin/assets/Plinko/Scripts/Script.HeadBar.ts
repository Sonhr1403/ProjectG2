import AudioManager, { SOUND_TYPE } from "./Script.Audio";
import { Cmd } from "./Script.Cmd";
import Common from "./Script.Common";
import FootBar from "./Script.FootBar";
import WalletToggle from "./Script.WalletToggle";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HeadBar extends cc.Component {
  public static instance: HeadBar = null;

  @property(cc.Label)
  private lblBalance: cc.Label = null;

  @property(cc.Node)
  private maskWallet: cc.Node = null;

  @property(cc.Button)
  private btnPlus: cc.Button = null;

  @property(cc.Sprite)
  private walletIcon: cc.Sprite = null;

  @property(cc.SpriteFrame)
  public walletIconSF: cc.SpriteFrame[] = [];

  @property(cc.ToggleGroup)
  private toggleGroup: cc.ToggleGroup = null;

  @property(cc.Prefab)
  private prfToggle: cc.Prefab = null;

  @property(cc.Prefab)
  private winPlus: cc.Prefab = null;

  /////////////////////////////////////////////////

  private currentBalance: number = 0;

  private isHide: boolean = false;

  private currentWallet: string = "GUSD";

  private listWallet: Array<Cmd.ImpWallet> = [];

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    HeadBar.instance = this;
    this.maskWallet.height = 0;
  }

  public getCurrentBalance(): number {
    return this.currentBalance;
  }

  public setCurrentBalance(num: number) {
    this.currentBalance = num;
    this.updateBalance();
  }

  private updateBalance() {
    this.lblBalance.string =
      this.currentBalance < 0
        ? ""
        : Common.numberWithCommas(this.currentBalance, this.getFixedNum());
  }

  public decreaseBalance(lvl: string) {
    this.currentBalance -= FootBar.instance.getBetAmount(lvl);
    this.updateBalance();
  }

  public increaseBalance(num: number) {
    this.currentBalance += num;
    this.updateBalance();
  }

  private onClickPlus() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.btnPlusInteractable(false);
    if (this.isHide) {
      cc.tween(this.maskWallet)
        .to(0.5, { height: 263 })
        .call(() => {
          this.btnPlusInteractable(true);
        })
        .start();
    } else {
      cc.tween(this.maskWallet)
        .to(0.5, { height: 0 })
        .call(() => {
          this.btnPlusInteractable(true);
        })
        .start();
    }
    this.isHide = !this.isHide;
  }

  private btnPlusInteractable(bool: boolean) {
    this.btnPlus.interactable = bool;
  }

  public onClickChangeWallet(wallet: string) {
    this.currentWallet = wallet;
    this.setWalletIcon(wallet);
    this.setCurrentBalance(this.getWalletBalance(wallet));
    FootBar.instance.updateListBet(wallet);
    this.onClickPlus();
  }

  private setWalletIcon(wallet: string) {
    switch (wallet) {
      case "MATIC":
        this.walletIcon.spriteFrame = this.walletIconSF[0];
        break;
 
      case "TON":
        this.walletIcon.spriteFrame = this.walletIconSF[1];
        break;
 
      case "BNB":
        this.walletIcon.spriteFrame = this.walletIconSF[2];
        break;

      case "USDT":
        this.walletIcon.spriteFrame = this.walletIconSF[3];
        break;

      case "TRX":
        this.walletIcon.spriteFrame = this.walletIconSF[4];
        break;

      case "GUSD":
        this.walletIcon.spriteFrame = this.walletIconSF[5];
        break;
 
      case "USDC":
        this.walletIcon.spriteFrame = this.walletIconSF[6];
        break;
 
      default:
        this.walletIcon.spriteFrame = this.walletIconSF[7];
        break;
    }
  }

  private createToggles() {
    this.listWallet.forEach((wallet) => {
      let toggle = cc.instantiate(this.prfToggle);
      toggle.getComponent(cc.Toggle).toggleGroup = this.toggleGroup;
      toggle.getComponent(WalletToggle).updateToggle(wallet.key, wallet.value);
      this.toggleGroup.node.addChild(toggle);
      toggle.getComponent(cc.Toggle).isChecked = true;
    });
  }

  public updateListWallet(list: Array<Cmd.ImpWallet>) {
    this.listWallet = list;
    this.createToggles();
  }

  public updateWallet(key: string, value: number) {
    this.listWallet.forEach((wallet) => {
      if (wallet.key === key) {
        wallet.value = value;
        return;
      }
    });
  }

  public getCurrentWallet() {
    return this.currentWallet;
  }

  private onClickDeposit() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    cc.sys.openURL("https://t.me/buble_live_bot/deposit");
  }

  // public setWalletBalance() {
  //   this.listBalance.forEach((lbl) => {
  //     lbl.string = this.getWalletBalance(lbl.node.parent.name).toFixed(2);
  //   });
  // }

  public getWalletBalance(wallet: string) {
    let bal = 0;
    this.listWallet.forEach((wal) => {
      if (wal.key === wallet) {
        bal = wal.value;
      }
    });
    return bal;
  }

  public getFixedNum() {
    switch (this.currentWallet) {
      case "MATIC":
        return 2;

      case "BNB":
        return 5;

      case "USDT":
        return 2;

      case "TRX":
        return 2;

      case "GUSD":
        return 2;

      default:
        return 2;
    }
  }

  public getFixedNum2(wallet: string) {
    switch (wallet) {
      case "MATIC":
        return 2;

      case "BNB":
        return 5;

      case "USDT":
        return 2;

      case "TRX":
        return 2;

      case "GUSD":
        return 2;

      default:
        return 2;
    }
  }

  public showWinPlus(profit: number) {
    let win = cc.instantiate(this.winPlus);
    win.children[0].getComponent(cc.Label).string =
      profit > 0
        ? "+" + profit.toFixed(this.getFixedNum())
        : profit.toFixed(this.getFixedNum());
    win.opacity = 0;
    this.node.children[1].addChild(win);
    cc.tween(win)
      .to(0.25, { opacity: 255 })
      .call(() => {
        cc.tween(win)
          .to(0.25, { scale: 1.2 })
          .call(() => {
            this.increaseBalance(profit);
            this.scheduleOnce(() => {
              cc.tween(win)
                .to(0.25, { scale: 1 })
                .call(() => {
                  cc.tween(win)
                    .to(0.25, { opacity: 0 })
                    .call(() => {
                      win.removeFromParent();
                    })
                    .start();
                })
                .start();
            }, 0.5);
          })
          .start();
      })
      .start();
  }
}
