import AudioManager, { SOUND_TYPE } from "./Script.Audio";
import { Cmd } from "./Script.Cmd";
import Common from "./Script.Common";
import { Connector } from "./Script.Connector";
import FootBar from "./Script.FootBar";
import HeadBar from "./Script.HeadBar";
import HistoryItem from "./Script.HistoryItem";
import Noti from "./Script.Noti";
import NumericalHelper from "./Script.UINumericalHelper";

const { ccclass, property } = cc._decorator;

// export class STATE_OF_GAME {
//   static BET_STAKE = 0;
//   static RESULT = 1;
//   static CHOOSING = 2;
//   static END = 3;
// }

@ccclass
export default class Controller extends cc.Component {
  public static instance: Controller = null;

  @property(cc.Node)
  private pnGame: cc.Node = null;

  @property(cc.Node)
  private pnBar: cc.Node = null;

  @property(cc.Prefab)
  private prfFootBar: cc.Prefab = null;

  @property(cc.Prefab)
  private prfHeadBar: cc.Prefab = null;

  @property(cc.Prefab)
  private prfNoti: cc.Prefab = null;

  @property(cc.Button)
  private listBtn: cc.Button[] = [];

  @property(cc.SpriteFrame)
  private cardsSF: cc.SpriteFrame[] = [];

  @property(cc.Label)
  private timerLbl: cc.Label = null;

  @property(cc.Node)
  private timer_frame: cc.Node = null;

  @property(cc.Label)
  private cardsNum: cc.Label = null;

  @property(cc.Node)
  private scrvHistoryContent: cc.Node = null;

  @property(cc.Prefab)
  private prfHistory: cc.Prefab = null;

  @property(cc.Node)
  private pnWin: cc.Node = null;

  @property(cc.Prefab)
  private prfMenu: cc.Prefab = null;

  @property(cc.Prefab)
  private prfRules: cc.Prefab = null;

  @property(cc.Prefab)
  private prfTutorial: cc.Prefab = null;

  @property(cc.Node)
  private resultCard: cc.Node = null;

  @property(cc.Label)
  private listBtnNum: cc.Label[] = [];

  @property(cc.Label)
  private listBtnMulti: cc.Label[] = [];

  @property(cc.Node)
  private scratchMask: cc.Node = null;

  @property(cc.Node)
  private newGame: cc.Node = null;

  @property(cc.Prefab)
  private prfWinPlus: cc.Prefab = null;

  @property(cc.Node)
  private winNoti: cc.Node = null;

  @property(cc.Prefab)
  private prfWinLabel: cc.Prefab = null;

  //////////////////////////////////

  private pnNoti: cc.Node = null;
  private pnHeadBar: cc.Node = null;
  private pnFootBar: cc.Node = null;
  private pnMenu: cc.Node = null;
  private pnRules: cc.Node = null;
  private pnTutorial: cc.Node = null;

  private _scheduler = null;
  private _isGameActive: boolean = true;
  private hideTime: number = null;

  public isMobile: boolean = false;

  public phase: number = 0;

  private currentCardId = -1;

  private isPressedCashOut = false;

  private isNext = true;

  // private listWinNoti: string[] = [];
  ///////////////////////////////////////////////////

  onLoad() {
    Controller.instance = this;
    this.initNoti();

    this.isMobile = cc.sys.isMobile;

    //1
    Connector.instance.addCmdListener(
      Cmd.Cmd.CMD_LOGIN,
      this.responseLogin,
      this
    );

    //5002
    Connector.instance.addCmdListener(
      Cmd.Cmd.CMD_GAME_INFO,
      this.responseGameInfo,
      this
    );

    //5004
    Connector.instance.addCmdListener(
      Cmd.Cmd.CMD_ROUND_RESULT,
      this.responseRoundResult,
      this
    );

    //5005
    Connector.instance.addCmdListener(
      Cmd.Cmd.CMD_TIME,
      this.responseTime,
      this
    );

    //5006
    Connector.instance.addCmdListener(
      Cmd.Cmd.CMD_SKIP_BET,
      this.responseSkipError,
      this
    );

    //5007
    Connector.instance.addCmdListener(
      Cmd.Cmd.CMD_CASH_OUT,
      this.responseCashOut,
      this
    );

    //5008
    Connector.instance.addCmdListener(
      Cmd.Cmd.CMD_HISTORY,
      this.responseHistory,
      this
    );

    //5011
    Connector.instance.addCmdListener(
      Cmd.Cmd.CMD_CONFIRM_JOIN_ROOM,
      this.responseConfirmJoinRoom,
      this
    );

    //5015
    Connector.instance.addCmdListener(
      Cmd.Cmd.CMD_WIN_NOTI,
      this.responseWinNoti,
      this
    );

    Connector.instance.connect();
  }

  onDestroy() {
    Connector.instance.disconnect();

    Connector.instance.removeCmdListener(this, Cmd.Cmd.CMD_LOGIN);

    Connector.instance.removeCmdListener(this, Cmd.Cmd.CMD_GAME_INFO);

    Connector.instance.removeCmdListener(this, Cmd.Cmd.CMD_ROUND_RESULT);

    Connector.instance.removeCmdListener(this, Cmd.Cmd.CMD_TIME);

    Connector.instance.removeCmdListener(this, Cmd.Cmd.CMD_CASH_OUT);

    Connector.instance.removeCmdListener(this, Cmd.Cmd.CMD_HISTORY);

    Connector.instance.removeCmdListener(this, Cmd.Cmd.CMD_CONFIRM_JOIN_ROOM);

    Connector.instance.removeCmdListener(this, Cmd.Cmd.CMD_WIN_NOTI);

    cc.director.getScheduler().unscheduleUpdate(this);
  }

  protected start(): void {
    this.initMusic();
    this.initHeadBar();
    this.initFootBar();
    this.initMenu();
    this.initRules();
    this.initTutorial();
    // this.initFake();
    this.initNewGame();

    this._scheduler = window.setInterval(
      this.updateOffline.bind(this),
      1000 / 60
    );
    cc.game.on(cc.game.EVENT_SHOW, this._onShowGame, this);
    cc.game.on(cc.game.EVENT_HIDE, this._onHideGame, this);
  }

  ////////////////////////////////////////////////////////////////////Init Start
  private initMusic() {
    AudioManager.instance.playMusic(0);
  }

  private initHeadBar() {
    this.pnHeadBar = cc.instantiate(this.prfHeadBar);
    this.pnHeadBar.zIndex = 999;
    this.pnHeadBar.active = true;
    this.pnBar.addChild(this.pnHeadBar);
  }

  private initFootBar() {
    this.pnFootBar = cc.instantiate(this.prfFootBar);
    this.pnFootBar.zIndex = 999;
    this.pnFootBar.active = true;
    this.pnBar.addChild(this.pnFootBar);
  }

  private initNoti() {
    this.pnNoti = cc.instantiate(this.prfNoti);
    this.pnNoti.zIndex = 999;
    this.pnNoti.active = true;
    this.pnGame.parent.addChild(this.pnNoti);
    this.pnNoti.active = false;
  }

  private initMenu() {
    this.pnMenu = cc.instantiate(this.prfMenu);
    this.pnMenu.zIndex = 999;
    this.pnGame.parent.addChild(this.pnMenu);
    this.pnMenu.active = false;
  }

  private initRules() {
    this.pnRules = cc.instantiate(this.prfRules);
    this.pnRules.zIndex = 999;
    this.pnGame.parent.addChild(this.pnRules);
    this.pnRules.active = false;
  }

  private initTutorial() {
    this.pnTutorial = cc.instantiate(this.prfTutorial);
    this.pnTutorial.zIndex = 999;
    this.pnGame.parent.addChild(this.pnTutorial);
    this.pnTutorial.active = false;
  }

  private initFake() {
    HeadBar.instance.setCurrentBalance(1000000);
    FootBar.instance.updateBet();
  }

  private initNewGame() {
    AudioManager.instance.playSound(SOUND_TYPE.NEW_GAME);
    for (let i = 0; i < 6; i++) {
      this.setInteractable(i, false);
    }
    this.updateCardNum(52);
    this.scratchMask.height = 0;
    this.timer_frame.active = false;
    this.resultCard.getComponent(cc.Sprite).spriteFrame = this.cardsSF[52];
    this.currentCardId = -1;
    FootBar.instance.startLight(true);
    FootBar.instance.setConfirmInteractable(true);
    FootBar.instance.updateBet();
    this.isPressedCashOut = false;
    this.scrvHistoryContent.removeAllChildren();
    this.timerLbl.string = "03:00";
    this.listBtnNum[0].string = "5";
    this.listBtnNum[1].string = "0";
    this.listBtnNum[2].string = "00.00%";
    this.listBtnNum[3].string = "00.00%";
    this.listBtnNum[4].string = "00.00%";
    this.listBtnNum[5].string = "00.00%";
    this.listBtnMulti[0].string = "x 0.00";
    this.listBtnMulti[1].string = "x 0.00";
    this.listBtnMulti[2].string = "x 0.00";
    this.listBtnMulti[3].string = "x 0.00";
    this.newGame.active = true;
    this.schedule(this.animNewGame, 0.1, 20);
    this.scheduleOnce(() => {
      this.newGame.active = false;
    }, 2.2);
    this.localRes5004 = {
      betAmount: -1,
      rateRed: -1,
      rateBlack: -1,
      rateHigher: -1,
      rateLower: -1,
      currentCardId: -1,
      currentCardRemain: -1,
      nextCardDrawId: -1,
      isEndGame: false,
      currentUserMoney: -1,
      skipRound: -1,
      cashoutWin: 0,
    };
  }

  /////////////////////////////////////////////////////////////////////////////Init End

  //////////////////////////////////////////////////////////////////////////Button Start

  public setInteractable(num: number, interactable: boolean) {
    this.listBtn[num].interactable = interactable;
    if (interactable) {
      this.listBtn[num].node.children[0].children.forEach((child) => {
        child.opacity = 255;
      });
    } else {
      this.listBtn[num].node.children[0].children.forEach((child) => {
        child.opacity = 140;
      });
    }
  }

  public setInteractableAll(bool: boolean) {
    this.listBtn.forEach((btn) => {
      btn.interactable = bool;
      if (bool) {
        btn.node.children[0].children.forEach((child) => {
          child.opacity = 255;
        });
      } else {
        btn.node.children[0].children.forEach((child) => {
          child.opacity = 140;
        });
      }
    });
  }

  private onClickSkip() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);
    this.setInteractableAll(false);
    Cmd.Send.skipBet();
  }

  private onClickCashOut() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);
    this.setInteractableAll(false);
    this.isPressedCashOut = true;
    Cmd.Send.cashOut();
  }

  private onClickSendBet(event, id: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);
    this.setInteractableAll(false);
    Cmd.Send.sendBet(parseInt(id));
  }

  /////////////////////////////////////////////////////////////////////////////Button End

  /////////////////////////////////////////////////////////////////////Response Start

  private showError(res) {
    let err = res.getError();
    if (err !== 0) {
      Common.runError("Error: ", err);
    }
  }

  private checkRes(name: string, cmdId: any, res: any) {
    Common.runError(
      name,
      new Date().toLocaleString() + " " + new Date().getMilliseconds(),
      cmdId,
      res
    );
  }

  //1
  private responseLogin(cmdId: any, data: Uint8Array) {
    let res = new Cmd.ReceiveLogin();
    res.unpackData(data);
    this.checkRes("responseLogin_GetUserInfor", cmdId, res);
    this.showError(res);
    ////////////////////////////////////////////
    let err = res.getError();
    switch (err) {
      case 0:
        HeadBar.instance.updateListWallet(res.wallets);
        this.scheduleOnce(() => {
          HeadBar.instance.onClickChangeWallet(
            HeadBar.instance.getCurrentWallet()
          );
        });
        Cmd.Send.sendCheckGame();
        break;

      default:
        Noti.instance.openNoti(1);
        break;
    }
  }

  // 5002
  protected responseGameInfo(cmdId: any, data: Uint8Array) {
    let res = new Cmd.ReceiveGameInfo();
    res.unpackData(data);
    this.checkRes("responseSubscribeGame", cmdId, res);
    this.showError(res);
    /////////////////////////////////////////////////////////////////////
    if (res.getError() === 0) {
      this.listBtnNum[0].string = res.data.skipRound.toString();
      this.listBtnNum[1].string = res.data.cashoutWin.toFixed(
        HeadBar.instance.getFixedNum()
      );
      if (res.data.rateRed === 0) {
        this.setInteractable(2, false);
      }
      this.listBtnNum[2].string = res.data.rateRed.toFixed(2) + "%";

      if (res.data.rateBlack === 0) {
        this.setInteractable(3, false);
      }
      this.listBtnNum[3].string = res.data.rateBlack.toFixed(2) + "%";

      if (res.data.rateHigher === 0) {
        this.setInteractable(4, false);
      }
      this.listBtnNum[4].string = res.data.rateHigher.toFixed(2) + "%";

      if (res.data.rateLower === 0) {
        this.setInteractable(5, false);
      }
      this.listBtnNum[5].string = res.data.rateLower.toFixed(2) + "%";

      this.listBtnMulti[0].string = "x " + res.data.multiRed.toFixed(2);
      this.listBtnMulti[1].string = "x " + res.data.multiBlack.toFixed(2);
      this.listBtnMulti[2].string = "x " + res.data.multiHigher.toFixed(2);
      this.listBtnMulti[3].string = "x " + res.data.multiLower.toFixed(2);

      this.resultCard.getComponent(cc.Sprite).spriteFrame =
        this.cardsSF[res.data.currentCardId];
      this.cardsNum.string = res.data.currentCardRemain.toString();

      FootBar.instance.setConfirmInteractable(false);
      FootBar.instance.startLight(false);

      this.setInteractableAll(true);

      if (res.data.isEndGame) {
        Cmd.Send.cashOut();
      }
    }
    if (res.getError() !== 0 && res.getError() !== 3) {
      Noti.instance.openNoti(5);
    }
  }

  // 5004
  public localRes5004: Cmd.ImpData = {
    betAmount: -1,
    rateRed: -1,
    rateBlack: -1,
    rateHigher: -1,
    rateLower: -1,
    currentCardId: -1,
    currentCardRemain: -1,
    nextCardDrawId: -1,
    isEndGame: false,
    currentUserMoney: -1,
    skipRound: -1,
    cashoutWin: 0,
    multiRed: -1,
    multiBlack: -1,
    multiHigher: -1,
    multiLower: -1,
  };

  protected responseRoundResult(cmdId: any, data: Uint8Array) {
    let res = new Cmd.ReceiveRoundResult();
    res.unpackData(data);
    this.checkRes("responseRoundResult", cmdId, res);
    this.showError(res);
    ////////////////////////////////////////////

    if (res.getError() != 0) {
      Noti.instance.openNoti(4);
      return;
    }

    HeadBar.instance.setCurrentBalance(res.data.currentUserMoney);
    HeadBar.instance.updateWallet(
      HeadBar.instance.getCurrentWallet(),
      res.data.currentUserMoney
    );
    this.setInteractableAll(true);
    this.listBtnNum[0].string = res.data.skipRound.toString();
    if (res.data.rateRed === 0) {
      this.setInteractable(2, false);
    }
    this.listBtnNum[2].string = res.data.rateRed.toFixed(2) + "%";

    if (res.data.rateBlack === 0) {
      this.setInteractable(3, false);
    }
    this.listBtnNum[3].string = res.data.rateBlack.toFixed(2) + "%";

    if (res.data.rateHigher === 0) {
      this.setInteractable(4, false);
    }
    this.listBtnNum[4].string = res.data.rateHigher.toFixed(2) + "%";

    if (res.data.rateLower === 0) {
      this.setInteractable(5, false);
    }
    this.listBtnNum[5].string = res.data.rateLower.toFixed(2) + "%";

    this.listBtnMulti[0].string = "x " + res.data.multiRed.toFixed(2);
    this.listBtnMulti[1].string = "x " + res.data.multiBlack.toFixed(2);
    this.listBtnMulti[2].string = "x " + res.data.multiHigher.toFixed(2);
    this.listBtnMulti[3].string = "x " + res.data.multiLower.toFixed(2);

    let time = 0;
    if (!res.data.isEndGame) {
      this.updateCardNum(res.data.currentCardRemain);
      if (res.data.nextCardDrawId !== -1) {
        this.animCard(res.data.nextCardDrawId);
      } else {
        this.animCard(res.data.currentCardId);
        if (
          res.data.currentCardId !== this.currentCardId &&
          this.currentCardId !== -1
        ) {
          this.updateCardNum(res.data.currentCardRemain);
        }
        if (this.currentCardId === -1) {
          let imp: Cmd.ImpHistory = {
            cardID: res.data.currentCardId,
            typeSelected: -1,
            multiple: 0,
            type: 0,
          };
          this.makeHistoryItem(imp);
        }
      }
      time = 1;
    } else {
      time = 2;
      this.animCard(res.data.nextCardDrawId);
      this.scheduleOnce(this.animScratch, 0.4);
      this.scheduleOnce(this.initNewGame, 4);
    }
    this.currentCardId = res.data.currentCardId;
    this.scheduleOnce(() => {
      if (this.localRes5004.cashoutWin !== res.data.cashoutWin) {
        this.animWinNum(res.data.cashoutWin);
      }
      this.localRes5004 = res.data;
    }, time);
  }

  //5005
  protected responseTime(cmdId: any, data: Uint8Array) {
    let res = new Cmd.ReceiveTime();
    res.unpackData(data);
    // this.checkRes("responseTime", cmdId, res);
    this.showError(res);

    ////////////////////////////////////////////
    const error = res.getError();
    // cc.log(res.time);
    switch (error) {
      case 0:
        let a = Math.floor(res.time / 60);
        let b =
          ((res.time % 60) + "").length === 2
            ? res.time % 60
            : "0" + (res.time % 60);
        this.timerLbl.string = "0" + a + ":" + b;
        if (res.time === 60) {
          this.timer_frame.active = true;
        }
        break;

      default:
        Common.runError("");
        break;
    }
  }

  //5006
  protected responseSkipError(cmdId: any, data: Uint8Array) {
    let res = new Cmd.ReceiveSkipError();
    res.unpackData(data);
    this.checkRes("responseSkipError", cmdId, res);
    this.showError(res);
    ///////////////////////
    switch (res.err) {
      case 1:
        Common.runError("Ko có dữ liệu join room");
        break;

      case 2:
        Common.runError("Đã hết số lần dùng skip");
        Noti.instance.openNoti(6);
        this.setInteractableAll(true);
        break;
    }
  }

  //5007
  protected responseCashOut(cmdId: any, data: Uint8Array) {
    let res = new Cmd.ReceiveCashOut();
    res.unpackData(data);
    this.checkRes("responseCashOut", cmdId, res);
    this.showError(res);

    ////////////////////////////////////////////
    const error = res.getError();
    switch (error) {
      case 0:
        if (res.winMoney > 0) {
          AudioManager.instance.playSound(SOUND_TYPE.WIN);

          this.pnWin.active = true;
          this.pnWin.children[1]
            .getComponent(sp.Skeleton)
            .setAnimation(0, "animation", true);
          this.pnWin.children[2].getComponent(cc.Label).string = "";

          let size = 80;
          if (
            res.winMoney.toFixed(HeadBar.instance.getFixedNum()).length > 4 &&
            res.winMoney.toFixed(HeadBar.instance.getFixedNum()).length <= 7
          ) {
            size = 45;
          } else if (
            res.winMoney.toFixed(HeadBar.instance.getFixedNum()).length > 7
          ) {
            size = 35;
          }
          this.pnWin.children[2].getComponent(cc.Label).fontSize = size;
          // NumericalHelper.scheduleForLabel(
          //   this.pnWin.children[2].getComponent(cc.Label),
          //   res.winMoney,
          //   4
          // );
          this.scheduleForLbl(
            0,
            res.winMoney,
            4,
            this.pnWin.children[2].getComponent(cc.Label),
            false
          );

          this.scheduleOnce(() => {
            this.pnWin.active = false;
            if (this.isPressedCashOut) {
              HeadBar.instance.setCurrentBalance(res.currentMoney);
              this.initNewGame();
            }
          }, 5);
        } else {
          if (this.isPressedCashOut) {
            HeadBar.instance.setCurrentBalance(res.currentMoney);
            this.initNewGame();
          }
        }

        break;

      default:
        // Noti.instance.openNoti(5);
        break;
    }
  }

  //5008
  private responseHistory(cmdId: any, data: Uint8Array) {
    let res = new Cmd.ReceiveHistory();
    res.unpackData(data);
    this.checkRes("responseHistory", cmdId, res);
    this.showError(res);

    /////////////////////////////////////////////////////////

    let err = res.getError();
    switch (err) {
      case 0:
        this.scrvHistoryContent.removeAllChildren();
        res.list.forEach((item)=>{
          this.makeHistoryItem(item);
        })
        break;

      default:
        Common.runError("History Error:", err);
        break;
    }
  }

  //5009
  private responseConfirmJoinRoom(cmdId: any, data: Uint8Array) {
    let res = new Cmd.receiveConfirmJoinRoom();
    res.unpackData(data);
    this.checkRes("responseConfirmJoinRoom", cmdId, res);
    this.showError(res);

    /////////////////////////////////////////////////////////

    let err = res.getError();
    switch (err) {
      case 0:
        break;

      default:
        Noti.instance.openNoti(5);
        Common.runError("responseConfirmJoinRoom err: ", err);
        break;
    }
  }

  //5015
  private responseWinNoti(cmdId: any, data: Uint8Array) {
    let res = new Cmd.receiveWinNoti();
    res.unpackData(data);
    this.checkRes("responseWinNoti", cmdId, res);
    this.showError(res);

    /////////////////////////////////////////////////////////

    let err = res.getError();
    switch (err) {
      case 0:
        let lbl = cc.instantiate(this.prfWinLabel);
        lbl.children[2].getComponent(cc.Label).string =
          res.userName.length <= 8
            ? res.userName
            : res.userName.substring(0, 2) +
              "***" +
              res.userName.substring(
                res.userName.length - 3,
                res.userName.length
              );
        lbl.children[3].getComponent(cc.Label).string =
          res.winAmount.toFixed(HeadBar.instance.getFixedNum2(res.wallet)) +
          " " +
          res.wallet;
        this.winNoti.addChild(lbl);
        if (this.winNoti.childrenCount > 10) {
          this.winNoti.children[0].removeFromParent();
        }
        break;

      default:
        break;
    }
  }

  /////////////////////////////////////////////////////////////////////Response End

  ///////////////////////////////////////////////////////////// other function

  private updateCardNum(num: number) {
    this.cardsNum.string = num.toString();
  }

  public menuActive() {
    this.pnMenu.active = true;
  }

  public rulesActive() {
    this.pnRules.active = true;
  }

  public tutorialActive() {
    this.pnTutorial.active = true;
  }

  private animCard(id: number) {
    let cardTemp = cc.instantiate(this.resultCard);
    cardTemp.getComponent(cc.Sprite).spriteFrame = this.cardsSF[52];
    cardTemp.setPosition(cc.v2(-30, 60));
    this.resultCard.addChild(cardTemp);
    cc.tween(cardTemp)
      .to(0.2, { position: cc.v3(0, 0, 0) })
      .call(() => {
        AudioManager.instance.playSound(SOUND_TYPE.FLIP_CARD);
        cc.tween(cardTemp)
          .to(0.1, { width: 0 })
          .call(() => {
            cc.tween(cardTemp)
              .to(0.1, { width: 68 })
              .call(() => {
                this.resultCard.getComponent(cc.Sprite).spriteFrame =
                  this.cardsSF[id];
                cardTemp.removeFromParent();
              })
              .start();
          })
          .start();
      })
      .start();
  }

  private animWinNum(total: number) {
    let numTemp = cc.instantiate(this.prfWinPlus);
    numTemp.setPosition(cc.v2(0, 100));
    numTemp.getComponent(cc.Label).string = (
      total - this.localRes5004.cashoutWin
    ).toFixed(2);
    this.listBtnNum[1].node.addChild(numTemp);
    cc.tween(numTemp)
      .to(0.5, { position: cc.v3(0, 0, 0) })
      .call(() => {
        numTemp.removeFromParent();
        AudioManager.instance.playSound(SOUND_TYPE.ADD_MONEY);
        this.listBtnNum[1].string = total.toFixed(2);
      })
      .start();
  }

  private makeHistoryItem(imp: Cmd.ImpHistory) {
    let item = cc.instantiate(this.prfHistory);
    item.getComponent(HistoryItem).createItem(imp);
    this.scrvHistoryContent.addChild(item);
  }

  private animScratch() {
    AudioManager.instance.playSound(SOUND_TYPE.FAIL);
    cc.tween(this.scratchMask).to(0.25, { height: 191 }).start();
  }

  private animNewGame() {
    if (this.isNext) {
      this.newGame.children[0].color = cc.color(255, 253, 198);
    } else {
      this.newGame.children[0].color = cc.color(255, 255, 255);
    }
    this.isNext = !this.isNext;
  }

  public scheduleForLbl(
    start: number,
    to: number,
    time: number,
    lbl: cc.Label,
    isSchedule: boolean
  ) {
    let current = start;
    let totalProfit = to;
    let profitStep = (totalProfit - current) / 100;

    if (isSchedule) {
      this.unschedule(increaseLbl);
    } else {
      this.schedule(increaseLbl, time * 0.01);
    }
    function increaseLbl() {
      current += profitStep;
      if (current >= totalProfit) {
        this.unschedule(increaseLbl);
        lbl.string = Common.numberWithCommas(
          totalProfit,
          HeadBar.instance.getFixedNum()
        );
      } else {
        lbl.string = Common.numberWithCommas(
          current,
          HeadBar.instance.getFixedNum()
        );
      }
    }
  }

  /////////////////// DMZ /////////////////////////

  updateOffline() {
    if (!this._isGameActive) {
      if (cc.sys.isBrowser) {
        cc.director.mainLoop();
      }
    }
  }

  _onShowGame() {
    this._isGameActive = true;
    if (cc.sys.isNative && cc.sys.isMobile && this.hideTime) {
      let curTime = performance.now();
      let delta = (curTime - this.hideTime) / 1000;
      let itr = 0;
      while (itr < delta) {
        let dt = Math.min(0.1, delta - itr);
        cc.director.getScheduler().update(dt);
        itr += dt;
      }
      this.hideTime = null;
    } else {
      cc.game.resume();
    }
  }

  _onHideGame() {
    this._isGameActive = false;
    if (cc.sys.isNative && cc.sys.isMobile) {
      this.hideTime = performance.now();
    } else {
      cc.game.pause();
    }
  }

  ///////////////////////////////////////////
}
