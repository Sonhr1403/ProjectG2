import { ImpWallet } from "../Connection/Receive";
import AudioController, { SOUND_TYPE } from "../Controller/AudioController";
import GameController from "../Controller/GameController";
import WalletItem from "../Items/WalletItem";
import Common from "../Utils/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HeadBar extends cc.Component {
  @property(cc.Label)
  private lblBalance: cc.Label = null;

  @property(cc.Button)
  private btnMenu: cc.Button = null;

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

  @property(cc.Label)
  private nums: cc.Label[] = [];

  //////////////////////////////////////////////////

  private currentBalance: number = 0;

  private isHide: boolean = false;

  private currentWallet: string = "GUSD";

  private listWallet: Array<ImpWallet> = [];

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.maskWallet.height = 0;
  }

  private onClickMenu() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);
    GameController.Instance.getMenu().open();
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

  public decreaseBalance() {
    this.currentBalance -= GameController.Instance.getFootBar().getStake();
    this.updateBalance();
  }

  public increaseBalance(num: number) {
    this.currentBalance += num;
    this.updateBalance();
  }

  public setMenuInteractive(bool: boolean) {
    this.btnMenu.interactable = bool;
  }

  private onClickPlus() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

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
    GameController.Instance.getFootBar().updateListBet(wallet);
    this.onClickPlus();
  }

  private setWalletIcon(wallet: string) {
    switch (wallet) {
      case "MATIC":
        this.walletIcon.spriteFrame = this.walletIconSF[0];
        break;

      case "BNB":
        this.walletIcon.spriteFrame = this.walletIconSF[1];
        break;

      case "USDT":
        this.walletIcon.spriteFrame = this.walletIconSF[2];
        break;

      case "TRX":
        this.walletIcon.spriteFrame = this.walletIconSF[3];
        break;

      case "GUSD":
        this.walletIcon.spriteFrame = this.walletIconSF[4];
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
      toggle.getComponent(WalletItem).updateToggle(wallet.key, wallet.value);
      this.toggleGroup.node.addChild(toggle);
    });
  }

  public updateListWallet(list: Array<ImpWallet>) {
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
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    cc.sys.openURL("https://t.me/buble_live_bot/deposit");
  }

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

  public updateStakeNum(num: number){
    this.nums[0].string = num.toString();
  }

  public updateWonNum(num: number){
    this.nums[1].string = num.toString();
  }
}
