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
  private btnStake: cc.Button[] = []; // 0: 1/2, 1: x2

  @property(cc.Label)
  private stakeNum: cc.Label = null;

  @property(cc.Node)
  private light: cc.Node = null;

  @property(cc.Node)
  private popUp: cc.Node = null;

  @property(cc.Node)
  private arrow: cc.Node = null;

  @property(cc.Button)
  private btnConfirm: cc.Button = null;

  ///////////////////////////////////////////////////

  private popOn: boolean = true;

  private listBetGUSD = [1,2,3,5,10,20,50,100];
  private listBetUSDT = [1,2,3,5,10,20,50,100];
  private listBetTRX = [6,12,18,30,60,120,300,600];
  private listBetTON = [0.1,0.2,0.5,1.0,2.0,3.0,5.0,10.0];
  private listBetBTC = [0.00001,0.00002,0.00005,0.00010,0.00020,0.00050,0.00100,0.00200];
  private listBetBNB = [0.00175,0.00350,0.00525,0.00875,0.01750,0.03500,0.08750,0.17500];
  private listBetMATIC = [1.78,3.56,5.34,8.90,17.80,35.60,89.00,178.00];

  private listBet = [];

  private betOrdi: number = 0;

  onLoad() {
    FootBar.instance = this;

    this.listBet = this.listBetGUSD;
    this.updateBet();

    this.popupGuide(true);
    this.schedule(this.runArrow, 0.32, cc.macro.REPEAT_FOREVER);
    this.scheduleOnce(()=>{
      this.stopPopUp();
    }, 3)
    this.startLight(true);
  }

  private onClickIncStake() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);
    this.betOrdi += 1;
    this.updateBet();
    this.stopPopUp();
  }

  private onClickDecStake() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);
    this.betOrdi -= 1;
    this.updateBet();
    this.stopPopUp();
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

  public setConfirmInteractable(bool: boolean){
    this.btnConfirm.interactable = bool;
  }

  public startLight(start: boolean) {
    if (start) {
      this.runLight();
      this.schedule(this.runLight, 0.6, cc.macro.REPEAT_FOREVER);
    } else {
      this.unschedule(this.runLight);
    }
  }

  private runLight() {
    cc.tween(this.light)
      .to(0.25, { opacity: 255 }, { easing: "" })
      .call(() => {
        cc.tween(this.light).to(0.25, { opacity: 0 }, { easing: "" }).start();
      })
      .start();
  }

  private onClickConfirm() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);
    if (HeadBar.instance.getCurrentBalance() >= this.getStake()) {
      this.stopPopUp();
      this.startLight(false);
      Controller.instance.setInteractableAll(true);
      this.setInteractable(0, false);
      this.setInteractable(1, false);
      this.setConfirmInteractable(false);
      Cmd.Send.confirmJoinRoom(HeadBar.instance.getCurrentWallet(), this.listBet[this.betOrdi].toString());
    } else {
      Noti.instance.openNoti(3);
    }
  }

  public popupGuide(on: boolean) {
    this.popUp.active = on;
  }

  private runArrow() {
    cc.tween(this.arrow)
      .by(0.15, { position: cc.v3(0, 10, 0) })
      .call(() => {
        cc.tween(this.arrow)
          .by(0.15, { position: cc.v3(0, -10, 0) })
          .start();
      })
      .start();
  }

  private stopPopUp() {
    if (this.popOn) {
      this.popOn = false;
      this.unschedule(this.runArrow);
      this.popupGuide(false);
    }
  }

  public updateListBet(wallet: string){
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

    this.updateStake();
  }

  public getStake(){
    return this.listBet[this.betOrdi];
  }
}
