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
  private betNum: cc.Label[] = [];

  @property(cc.Button)
  private btnConfirm: cc.Button = null;

  @property(cc.Node)
  private listPick: cc.Node[] = [];

  @property(cc.Node)
  private listStopAuto: cc.Node[] = [];

  ///////////////////////////////////////////////////

  private listBetGUSD = [1, 2, 3, 5, 10, 20, 50, 100];
  private listBetUSDT = [1, 2, 3, 5, 10, 20, 50, 100];
  private listBetTRX = [1, 2, 3, 5, 10, 20, 50, 100];
  private listBetTON = [0.1, 0.2, 0.5, 1.0, 2.0, 3.0, 5.0, 10.0];
  private listBetBTC = [
    0.00001, 0.00002, 0.00005, 0.0001, 0.0002, 0.0005, 0.001, 0.002,
  ];
  private listBetBNB = [
    0.00175, 0.0035, 0.00525, 0.00875, 0.0175, 0.035, 0.0875, 0.175,
  ];
  private listBetMATIC = [1.78, 3.56, 5.34, 8.9, 17.8, 35.6, 89.0, 178.0];

  private listBet = [];

  private normalOrdi: number = 0;
  private superOrdi: number = 0;
  private megaOrdi: number = 0;

  private autoTime: number = 0.4;
  private autoNormal: number = 0;
  private autoSuper: number = 0;
  private autoMega: number = 0;

  onLoad() {
    FootBar.instance = this;

    this.updateListBet("GUSD");

    this.schedule(this.spinIcon, 1.05, cc.macro.REPEAT_FOREVER);
  }

  private onClickIncBet(event, lvl: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);
    switch (lvl) {
      case "normal":
        this.normalOrdi += 1;
        break;

      case "super":
        this.superOrdi += 1;
        break;

      case "mega":
        this.megaOrdi += 1;
        break;
    }
    this.updateBet(lvl);
  }

  private onClickDecBet(event, lvl: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);
    switch (lvl) {
      case "normal":
        this.normalOrdi -= 1;
        break;

      case "super":
        this.superOrdi -= 1;
        break;

      case "mega":
        this.megaOrdi -= 1;
        break;
    }
    this.updateBet(lvl);
  }

  public updateBet(lvl: string) {
    switch (lvl) {
      case "normal":
        if (this.normalOrdi > 0 && this.normalOrdi < this.listBet.length - 1) {
          this.setInteractable(0, true);
          this.setInteractable(1, true);
        } else if (this.normalOrdi === 0) {
          this.setInteractable(0, false);
          this.setInteractable(1, true);
        } else if (this.normalOrdi === this.listBet.length - 1) {
          this.setInteractable(0, true);
          this.setInteractable(1, false);
        }
        break;

      case "super":
        if (this.superOrdi > 0 && this.superOrdi < this.listBet.length - 1) {
          this.setInteractable(2, true);
          this.setInteractable(3, true);
        } else if (this.superOrdi === 0) {
          this.setInteractable(2, false);
          this.setInteractable(3, true);
        } else if (this.superOrdi === this.listBet.length - 1) {
          this.setInteractable(2, true);
          this.setInteractable(3, false);
        }
        break;

      case "mega":
        if (this.megaOrdi > 0 && this.megaOrdi < this.listBet.length - 1) {
          this.setInteractable(4, true);
          this.setInteractable(5, true);
        } else if (this.megaOrdi === 0) {
          this.setInteractable(4, false);
          this.setInteractable(5, true);
        } else if (this.megaOrdi === this.listBet.length - 1) {
          this.setInteractable(4, true);
          this.setInteractable(5, false);
        }
        break;
    }

    this.updateBetNum(lvl);
  }

  private updateBetNum(lvl: string) {
    switch (lvl) {
      case "normal":
        this.betNum[0].string = this.listBet[this.normalOrdi].toString();
        break;

      case "super":
        this.betNum[1].string = this.listBet[this.superOrdi].toString();
        break;

      case "mega":
        this.betNum[2].string = this.listBet[this.megaOrdi].toString();
        break;
    }
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
        this.listBet = this.listBetUSDT;
        break;

      case "TRX":
        this.listBet = this.listBetTRX;
        break;

      case "GUSD":
        this.listBet = this.listBetGUSD;
        break;

      case "USDC":
        this.listBet = this.listBetUSDT;
        break;

      default:
        this.listBet = this.listBetGUSD;
        break;
    }

    this.updateBet("normal");
    this.updateBet("super");
    this.updateBet("mega");
  }

  public getBetAmount(lvl: string) {
    switch (lvl) {
      case "normal":
        return this.listBet[this.normalOrdi];

      case "super":
        return this.listBet[this.superOrdi];

      case "mega":
        return this.listBet[this.megaOrdi];
    }
  }

  private onClickConfirm(event, lvl: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CONFIRM);

    this.onClickBet(lvl);
  }

  private onClickBet(lvl: string) {
    let num = 0;
    switch (lvl) {
      case "normal":
        num = 0;
        break;

      case "super":
        num = 1;
        break;

      case "mega":
        num = 2;
        break;
    }
    if (HeadBar.instance.getCurrentBalance() >= this.getBetAmount(lvl)) {
      HeadBar.instance.decreaseBalance(lvl);
      Controller.instance.interactableRow(false);
      Cmd.Send.sendBet(
        num,
        Controller.instance.currentRow,
        this.getBetAmount(lvl),
        1,
        false,
        false,
        HeadBar.instance.getCurrentWallet()
      );
    } else {
      Noti.instance.openNoti(3);
    }
  }

  private spinIcon() {
    cc.tween(this.listStopAuto[0].children[0].children[0].children[0])
      .by(1, { angle: 360 })
      .start();
    cc.tween(this.listStopAuto[1].children[0].children[0].children[0])
      .by(1, { angle: 360 })
      .start();
    cc.tween(this.listStopAuto[2].children[0].children[0].children[0])
      .by(1, { angle: 360 })
      .start();
  }

  private onClickPickAutoNormal(event, id: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CONFIRM);

    this.listPick[0].active = false;
    this.listStopAuto[0].active = true;
    this.listStopAuto[0].children[0].children[1].getComponent(cc.Label).string =
      id;
    this.autoNormal = parseInt(id);
    this.onAuto();
  }

  private onClickPickAutoSuper(event, id: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CONFIRM);

    this.listPick[1].active = false;
    this.listStopAuto[1].active = true;
    this.listStopAuto[1].children[0].children[1].getComponent(cc.Label).string =
      id;
    this.autoSuper = parseInt(id);
    this.onAuto();
  }

  private onClickPickAutoMega(event, id: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CONFIRM);

    this.listPick[2].active = false;
    this.listStopAuto[2].active = true;
    this.listStopAuto[2].children[0].children[1].getComponent(cc.Label).string =
      id;
    this.autoMega = parseInt(id);
    this.onAuto();
  }

  private onAuto() {
    cc.log(this.autoNormal, this.autoSuper, this.autoMega)
    if (this.autoNormal !== 0 && this.autoSuper === 0 && this.autoMega === 0) {
      this.autoBetNormal();
    }

    if (this.autoNormal === 0 && this.autoSuper !== 0 && this.autoMega === 0) {
      this.autoBetSuper();
    }

    if (this.autoNormal === 0 && this.autoSuper === 0 && this.autoMega !== 0) {
      this.autoBetMega();
    }

    if (this.autoNormal !== 0 && this.autoSuper !== 0 && this.autoMega === 0) {
      let ran = BGUI.Utils.getRandomInt(1, 2);
      if (ran === 1) {
        this.autoBetNormal();
      } else {
        this.autoBetSuper();
      }
    }

    if (this.autoNormal !== 0 && this.autoSuper === 0 && this.autoMega !== 0) {
      let ran = BGUI.Utils.getRandomInt(1, 2);
      if (ran === 1) {
        this.autoBetNormal();
      } else {
        this.autoBetMega();
      }
    }

    if (this.autoNormal === 0 && this.autoSuper !== 0 && this.autoMega !== 0) {
      let ran = BGUI.Utils.getRandomInt(1, 2);
      if (ran === 1) {
        this.autoBetSuper();
      } else {
        this.autoBetMega();
      }
    }

    if (this.autoNormal !== 0 && this.autoSuper !== 0 && this.autoMega !== 0) {
      let ran = BGUI.Utils.getRandomInt(1, 3);
      if (ran === 1) {
        this.autoBetNormal();
      } else if (ran === 2) {
        this.autoBetSuper();
      } else {
        this.autoBetMega();
      }
    }

    if (this.autoNormal === 0) {
      this.onClickStopAuto("", "0");
    }

    if (this.autoSuper === 0) {
      this.onClickStopAuto("", "1");
    }

    if (this.autoMega === 0) {
      this.onClickStopAuto("", "2");
    }

    if (this.autoNormal !== 0 || this.autoSuper !== 0 || this.autoMega !== 0) {
      this.scheduleOnce(() => {
        this.onAuto();
      }, 0.4);
    }
  }

  private onClickStopAuto(event, id: string) {
    // AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.listStopAuto[id].children[0].children[1].getComponent(
      cc.Label
    ).string = "0";
    this.listStopAuto[parseInt(id)].active = false;
  }

  private autoBetNormal() {
    this.autoNormal -= 1;
    if (
      this.autoNormal >= 0 &&
      HeadBar.instance.getCurrentBalance() >= this.getBetAmount("normal")
    ) {
      this.onClickBet("normal");
      this.listStopAuto[0].children[0].children[1].getComponent(
        cc.Label
      ).string = this.autoNormal.toString();
    } else {
      this.onClickStopAuto("", "0");
      if (HeadBar.instance.getCurrentBalance() < this.getBetAmount("normal")) {
        Noti.instance.openNoti(3);
      }
    }
  }

  private autoBetSuper() {
    this.autoSuper -= 1;
    if (
      this.autoSuper >= 0 &&
      HeadBar.instance.getCurrentBalance() >= this.getBetAmount("super")
    ) {
      this.onClickBet("super");
      this.listStopAuto[1].children[0].children[1].getComponent(
        cc.Label
      ).string = this.autoSuper.toString();
    } else {
      this.onClickStopAuto("", "1");
      if (HeadBar.instance.getCurrentBalance() < this.getBetAmount("super")) {
        Noti.instance.openNoti(3);
      }
    }
  }

  private autoBetMega() {
    this.autoMega -= 1;
    if (
      this.autoMega >= 0 &&
      HeadBar.instance.getCurrentBalance() >= this.getBetAmount("mega")
    ) {
      this.onClickBet("mega");
      this.listStopAuto[2].children[0].children[1].getComponent(
        cc.Label
      ).string = this.autoMega.toString();
    } else {
      this.onClickStopAuto("", "2");
      if (HeadBar.instance.getCurrentBalance() < this.getBetAmount("mega")) {
        Noti.instance.openNoti(3);
      }
    }
  }

  private onClickOpenPick(event, id: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.listPick[parseInt(id)].active = !this.listPick[parseInt(id)].active;
  }
}
