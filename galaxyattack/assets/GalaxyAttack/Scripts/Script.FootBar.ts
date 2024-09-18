import AudioManager, { SOUND_TYPE } from "./Script.Audio";
import { Cmd } from "./Script.Cmd";
import Controller from "./Script.Controller";
import HeadBar from "./Script.HeadBar";
import Noti from "./Script.Noti";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FootBar extends cc.Component {
  public static instance: FootBar = null;

  @property(cc.Button)
  private btnStake: cc.Button[] = []; // 0: -, 1: +

  @property(cc.Label)
  private stakeNum: cc.Label = null;

  @property(cc.Button)
  private btnConfirm: cc.Button = null;

  @property(cc.Button)
  private btnCashOut: cc.Button = null;

  @property(cc.Node)
  private listNode: cc.Node[] = [];

  ///////////////////////////////////////////////////

  private popOn: boolean = true;

  private listBetGUSD = [1, 2, 3, 5, 10, 20, 50, 100];
  private listBetUSDT = [1, 2, 3, 5, 10, 20, 50, 100];
  private listBetTRX = [6, 12, 18, 30, 60, 120, 300, 600];
  private listBetTON = [0.1, 0.2, 0.5, 1.0, 2.0, 3.0, 5.0, 10.0];
  private listBetBTC = [
    0.00001, 0.00002, 0.00005, 0.0001, 0.0002, 0.0005, 0.001, 0.002,
  ];
  private listBetBNB = [
    0.00175, 0.0035, 0.00525, 0.00875, 0.0175, 0.035, 0.0875, 0.175,
  ];
  private listBetMATIC = [1.78, 3.56, 5.34, 8.9, 17.8, 35.6, 89.0, 178.0];

  private listBet = [];

  private betOrdi: number = 0;

  onLoad() {
    FootBar.instance = this;

    this.listBet = this.listBetGUSD;
    this.updateBet();
  }

  private onClickIncStake() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.betOrdi += 1;
    this.updateBet();
  }

  private onClickDecStake() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.betOrdi -= 1;
    this.updateBet();
  }

  public updateBet() {
    if (this.betOrdi > 0 && this.betOrdi < 4) {
      this.setInteractable(0, true);
      this.setInteractable(1, true);
    } else if (this.betOrdi === 0) {
      this.setInteractable(0, false);
      this.setInteractable(1, true);
    } else if (this.betOrdi === 7) {
      this.setInteractable(0, true);
      this.setInteractable(1, false);
    }

    this.updateStake();
  }

  private updateStake() {
    this.stakeNum.string = this.listBet[this.betOrdi].toString();
  }

  public setInteractable(num: number, interactable: boolean) {
    this.btnStake[num].interactable = interactable;
    if (interactable) {
      this.btnStake[num].node.children[0].children[0].opacity = 255;
    } else {
      this.btnStake[num].node.children[0].children[0].opacity = 140;
    }
  }

  public setConfirmInteractable(bool: boolean) {
    this.btnConfirm.interactable = bool;
  }

  private onClickConfirm() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    if (HeadBar.instance.getCurrentBalance() >= this.getStake()) {
      Cmd.Send.confirmJoinRoom(
        Controller.instance.getCurrentMonster(),
        HeadBar.instance.getCurrentWallet(),
        parseFloat(this.getStake()).toString()
      );
    } else {
      Noti.instance.openNoti(3);
    }
  }

  public getStake() {
    return this.listBet[this.betOrdi];
  }

  private onClickCashOut() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    Cmd.Send.cashOut();
  }

  public changeMode(normal: boolean) {
    if (normal) {
      this.listNode[0].active = true;
      this.listNode[1].active = true;
      this.listNode[2].active = false;
    } else {
      this.listNode[0].active = false;
      this.listNode[1].active = false;
      this.listNode[2].active = true;
    }
  }

  public cashOutInteractable(bool: boolean) {
    this.btnCashOut.interactable = bool;
  }

  public updateListBet(wallet: string) {
    switch (wallet) {
      case "MATIC":
        this.listBet = this.listBetMATIC;
        break;

      case "TON":
        this.listBet = this.listBetTON;
        break;

      case "BNB":
        this.listBet = this.listBetBNB;
        break;

      case "USDT":
      case "USDC":
        this.listBet = this.listBetUSDT;
        break;

      case "TRX":
        this.listBet = this.listBetTRX;
        break;

      case "GUSD":
        this.listBet = this.listBetGUSD;
        break;

      default:
        this.listBet = this.listBetGUSD;
        break;
    }

    this.updateStake();
  }
}
