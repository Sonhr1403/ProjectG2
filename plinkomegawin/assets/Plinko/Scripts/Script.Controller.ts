import AudioManager, { MUSIC_TYPE, SOUND_TYPE } from "./Script.Audio";
import Ball from "./Script.Ball";
import { Cmd } from "./Script.Cmd";
import Common from "./Script.Common";
import { Connector } from "./Script.Connector";
import Goal from "./Script.Goal";
import HeadBar from "./Script.HeadBar";
import BallPos from "./Script.ListBallPos";
import Menu from "./Script.Menu";
import Noti from "./Script.Noti";
import PinLine from "./Script.PinLine";

const { ccclass, property } = cc._decorator;

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

  @property(cc.Prefab)
  private prfMenu: cc.Prefab = null;

  @property(cc.Prefab)
  private prfRules: cc.Prefab = null;

  @property(cc.Prefab)
  private prfPinLine: cc.Prefab = null;

  @property(cc.Prefab)
  private prfBall: cc.Prefab = null;

  @property(cc.Prefab)
  private prfGoal: cc.Prefab = null;

  @property(cc.Node)
  private pinNode: cc.Node = null;

  @property(cc.Node)
  private ballNode: cc.Node = null;

  @property(cc.Layout)
  private goalLayout: cc.Layout = null;

  @property(cc.Node)
  private listLineGoal: cc.Node[] = [];

  @property(cc.Node)
  private pinSprite: cc.Node = null;

  @property(cc.Sprite)
  private BG: cc.Sprite = null;

  @property(cc.SpriteFrame)
  private bgSF: cc.SpriteFrame[] = [];

  @property(cc.Node)
  private listCheckMark: cc.Node[] = [];

  @property(cc.Node)
  private listGoalLine: cc.Node[] = [];

  @property(cc.Node)
  private pnWin: cc.Node = null;

  @property(cc.Node)
  private rowChoose: cc.Node = null;

  @property(cc.Node)
  private winNoti: cc.Node = null;

  @property(cc.Prefab)
  private prfWinNoti: cc.Prefab = null;

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

  public currentRow: number = 16;

  private listNumGoal12 = {
    normal: [250, 50, 8, 3, 1.5, 0.5, 0, 0.5, 1.5, 3, 8, 50, 250],
    super: [500, 100, 10, 5, 2, 0, 0, 0, 2, 5, 10, 100, 500],
    mega: [1000, 175, 20, 8, 2, 0, 0, 0, 2, 8, 20, 175, 1000],
  };

  private listNumGoal14 = {
    normal: [300, 80, 15, 8, 2.5, 1.2, 0.3, 0, 0.3, 1.2, 2.5, 8, 15, 80, 300],
    super: [550, 125, 20, 10, 3, 2, 0, 0, 0, 2, 3, 10, 20, 125, 550],
    mega: [1000, 200, 35, 14, 5, 2.5, 0, 0, 0, 2.5, 5, 14, 35, 200, 1000],
  };

  private listNumGoal16 = {
    normal: [
      350, 100, 20, 10, 3, 1.8, 0.6, 0, 0, 0, 0.6, 1.8, 3, 10, 20, 100, 350,
    ],
    super: [700, 150, 30, 12, 4, 2, 0.2, 0, 0, 0, 0.2, 2, 4, 12, 30, 150, 700],
    mega: [
      1250, 250, 40, 14, 4.5, 2.5, 0, 0, 0, 0, 0, 2.5, 4.5, 14, 40, 250, 1250,
    ],
  };

  public listPosTemp = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
  };

  private gameScale: number = 0;

  ///////////////////////////////////////////////////

  onLoad() {
    Controller.instance = this;
    this.initNoti();

    //1
    Connector.instance.addCmdListener(
      Cmd.CmdNum.CMD_LOGIN,
      this.responseLogin,
      this
    );

    //4000
    Connector.instance.addCmdListener(
      Cmd.CmdNum.CMD_JOINGAME,
      this.responseGameInfo,
      this
    );

    //4002
    Connector.instance.addCmdListener(
      Cmd.CmdNum.CMD_BET,
      this.responseBetError,
      this
    );

    //4003
    Connector.instance.addCmdListener(
      Cmd.CmdNum.CMD_RESULT,
      this.responseRoundResult,
      this
    );
    
    //5015
    Connector.instance.addCmdListener(
      Cmd.CmdNum.CMD_WIN_NOTI,
      this.responseWinNoti,
      this
    );

    Connector.instance.connect();

  }

  onDestroy() {
    Connector.instance.disconnect();

    Connector.instance.removeCmdListener(this, Cmd.CmdNum.CMD_LOGIN);

    Connector.instance.removeCmdListener(this, Cmd.CmdNum.CMD_JOINGAME);

    Connector.instance.removeCmdListener(this, Cmd.CmdNum.CMD_BET);

    Connector.instance.removeCmdListener(this, Cmd.CmdNum.CMD_RESULT);

    cc.director.getScheduler().unscheduleUpdate(this);
  }

  protected start(): void {
    let os = cc.sys.os;
    let fps = 61;
    switch (os) {
      case cc.sys.OS_IOS:
        fps = 60;
        break;

      case cc.sys.OS_ANDROID:
        fps = 60;
        break;
    }
    cc.game.setFrameRate(fps);
    var collisionManager = cc.director.getCollisionManager();
    collisionManager.enabled = true;
    let physicsManager = cc.director.getPhysicsManager();
    physicsManager.enabled = true;
    this.initMusic();
    this.initHeadBar();
    this.initFootBar();
    this.initMenu();
    this.initRules();

    this.onClickChooseRow("", "16");
    this.gameScale = this.node.parent.scale;
    BGUI.ZLog.log("scale", this.gameScale);

    this._scheduler = window.setInterval(
      this.updateOffline.bind(this),
      1000 / 60
    );
    cc.game.on(cc.game.EVENT_SHOW, this._onShowGame, this);
    cc.game.on(cc.game.EVENT_HIDE, this._onHideGame, this);

  }

  ////////////////////////////////////////////////////////////////////Init Start
  private initMusic() {
    AudioManager.instance.playMusic(MUSIC_TYPE.BASEGAME_BGM);
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

  /////////////////////////////////////////////////////////////////////////////Init End

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
    let res = new Cmd.ReceivedLogin();
    res.unpackData(data);
    this.checkRes("responseLogin", cmdId, res);
    this.showError(res);
    ////////////////////////////////////////////
    let err = res.getError();
    switch (err) {
      case 0:
        HeadBar.instance.updateListWallet(res.wallets);
        Cmd.Send.sendJoinGame();
        break;

      default:
        Noti.instance.openNoti(1);
        break;
    }
  }

  // 4000
  protected responseGameInfo(cmdId: any, data: Uint8Array) {
    let res = new Cmd.ReceivedJoinGame();
    res.unpackData(data);
    this.checkRes("responseGameInfo", cmdId, res);
    this.showError(res);
    /////////////////////////////////////////////////////////////////////
    if (res.getError() === 0) {
      HeadBar.instance.onClickChangeWallet("GUSD");
    }
    if (res.getError() !== 0 && res.getError() !== 3) {
      Noti.instance.openNoti(5);
    }
  }

  //4002
  private responseBetError(cmdId: any, data: Uint8Array) {
    let res = new Cmd.ReceivedBetError();
    res.unpackData(data);
    this.checkRes("responseBetError", cmdId, res);
    this.showError(res);
    ///////////////////////////////////////////////////

    if (res.getError() !== 0) {
      // cc.log(res.betAmount);
      // Noti.instance.openNoti(4);
      HeadBar.instance.increaseBalance(res.betAmount);
      return;
    }
  }

  // 4003
  public currentMoney: number = 0;

  protected responseRoundResult(cmdId: any, data: Uint8Array) {
    let res = new Cmd.ReceiveBetResult();
    res.unpackData(data);
    this.checkRes("responseRoundResult", cmdId, res);
    this.showError(res);
    ////////////////////////////////////////////

    if (res.getError() !== 0) {
      Noti.instance.openNoti(4);
      HeadBar.instance.increaseBalance(res.betAmount);
      return;
    } else {
      if (res.betResults[0]) {
        let lvl = "";
        switch (res.betResults[0].risk) {
          case 0:
            lvl = "normal";
            break;

          case 1:
            lvl = "super";
            break;

          case 2:
            lvl = "mega";
            break;
        }

        let listPosibleGoalIndex = [];
        switch (this.currentRow) {
          case 12:
            listPosibleGoalIndex = this.getAllIndexOfPayout(
              this.listNumGoal12[lvl],
              res.betResults[0].payout
            );
            break;

          case 14:
            listPosibleGoalIndex = this.getAllIndexOfPayout(
              this.listNumGoal14[lvl],
              res.betResults[0].payout
            );
            break;

          case 16:
            listPosibleGoalIndex = this.getAllIndexOfPayout(
              this.listNumGoal16[lvl],
              res.betResults[0].payout
            );
            break;
        }

        let ran = BGUI.Utils.getRandomInt(0, listPosibleGoalIndex.length - 1);

        this.createBall(
          lvl,
          listPosibleGoalIndex[ran],
          res.betResults[0].totalMoney
        );
        this.currentMoney = res.betResults[0].currentMoney;
      }
    }
  }

  private getAllIndexOfPayout(arr: number[], num: number) {
    let indexs: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === num) {
        indexs.push(i);
      }
    }
    return indexs;
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
        let lbl = cc.instantiate(this.prfWinNoti);
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

  //////////////////////////////////////////////////////////////////////////Button Start

  private onClickChooseRow(event, id: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.currentRow = parseInt(id);
    this.turnCMBtnRow();
    this.updateBG();
    this.updatePin();
    this.updateGoal();
    this.updateSpritePin();
  }

  private onClickMenu() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    Menu.instance.open();
  }
  /////////////////////////////////////////////////////////////////////////////Button End

  ///////////////////////////////////////////////////////////// other function

  public menuActive() {
    this.pnMenu.active = true;
  }

  public rulesActive() {
    this.pnRules.active = true;
  }

  public tutorialActive() {
    this.pnTutorial.active = true;
  }

  private turnCMBtnRow() {
    switch (this.currentRow) {
      case 12:
        this.listCheckMark[0].active = false;
        this.listCheckMark[1].active = true;
        this.listCheckMark[2].active = true;
        break;

      case 14:
        this.listCheckMark[0].active = true;
        this.listCheckMark[1].active = false;
        this.listCheckMark[2].active = true;
        break;

      case 16:
        this.listCheckMark[0].active = true;
        this.listCheckMark[1].active = true;
        this.listCheckMark[2].active = false;
        break;
    }
  }

  private updateBG() {
    switch (this.currentRow) {
      case 12:
        this.BG.spriteFrame = this.bgSF[0];
        break;

      case 14:
        this.BG.spriteFrame = this.bgSF[1];
        break;

      case 16:
        this.BG.spriteFrame = this.bgSF[2];
        break;
    }
  }

  private updateSpritePin() {
    switch (this.currentRow) {
      case 12:
        this.pinSprite.y = 201;
        this.pinSprite.height = 393;
        this.pinSprite.children[0].scaleX = 1.06;
        this.pinSprite.children[0].scaleY = 1;
        break;

      case 14:
        this.pinSprite.y = 213.75;
        this.pinSprite.height = 415;
        this.pinSprite.children[0].scaleX = 0.97;
        this.pinSprite.children[0].scaleY = 0.918;
        break;

      case 16:
        this.pinSprite.y = 221.5;
        this.pinSprite.height = 435;
        this.pinSprite.children[0].scaleX = 0.883;
        this.pinSprite.children[0].scaleY = 0.835;
        break;
    }
  }

  private updateGoal() {
    this.listLineGoal[0].removeAllChildren();
    this.listLineGoal[1].removeAllChildren();
    this.listLineGoal[2].removeAllChildren();

    for (let i = 0; i < this.currentRow + 1; i++) {
      let goal = cc.instantiate(this.prfGoal);
      let goal1 = cc.instantiate(this.prfGoal);
      let goal2 = cc.instantiate(this.prfGoal);

      goal.zIndex = i;
      goal1.zIndex = i;
      goal2.zIndex = i;

      switch (this.currentRow) {
        case 12:
          if ((i >= 0 && i < 5) || (i >= 8 && i < 13)) {
            goal
              .getComponent(Goal)
              .createGoal(
                1,
                this.listNumGoal12["normal"][i],
                this.getGoalScale()
              );
            goal1
              .getComponent(Goal)
              .createGoal(
                3,
                this.listNumGoal12["super"][i],
                this.getGoalScale()
              );
            goal2
              .getComponent(Goal)
              .createGoal(
                5,
                this.listNumGoal12["mega"][i],
                this.getGoalScale()
              );
          }

          if (i === 5 || i === 7) {
            goal
              .getComponent(Goal)
              .createGoal(
                2,
                this.listNumGoal12["normal"][i],
                this.getGoalScale()
              );
            goal1
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal12["super"][i],
                this.getGoalScale()
              );
            goal2
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal12["mega"][i],
                this.getGoalScale()
              );
          }

          if (i === 6) {
            goal
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal12["normal"][i],
                this.getGoalScale()
              );
            goal1
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal12["super"][i],
                this.getGoalScale()
              );
            goal2
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal12["mega"][i],
                this.getGoalScale()
              );
          }

          break;

        case 14:
          if ((i >= 0 && i < 6) || (i >= 9 && i < 15)) {
            goal
              .getComponent(Goal)
              .createGoal(
                1,
                this.listNumGoal14["normal"][i],
                this.getGoalScale()
              );
            goal1
              .getComponent(Goal)
              .createGoal(
                3,
                this.listNumGoal14["super"][i],
                this.getGoalScale()
              );
            goal2
              .getComponent(Goal)
              .createGoal(
                5,
                this.listNumGoal14["mega"][i],
                this.getGoalScale()
              );
          }

          if (i === 6 || i === 8) {
            goal
              .getComponent(Goal)
              .createGoal(
                2,
                this.listNumGoal14["normal"][i],
                this.getGoalScale()
              );
            goal1
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal14["super"][i],
                this.getGoalScale()
              );
            goal2
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal14["mega"][i],
                this.getGoalScale()
              );
          }

          if (i === 7) {
            goal
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal14["normal"][i],
                this.getGoalScale()
              );
            goal1
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal14["super"][i],
                this.getGoalScale()
              );
            goal2
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal14["mega"][i],
                this.getGoalScale()
              );
          }
          break;

        case 16:
          if ((i >= 0 && i < 6) || (i >= 11 && i < 17)) {
            goal
              .getComponent(Goal)
              .createGoal(
                1,
                this.listNumGoal16["normal"][i],
                this.getGoalScale()
              );
            goal1
              .getComponent(Goal)
              .createGoal(
                3,
                this.listNumGoal16["super"][i],
                this.getGoalScale()
              );
            goal2
              .getComponent(Goal)
              .createGoal(
                5,
                this.listNumGoal16["mega"][i],
                this.getGoalScale()
              );
          }

          if (i === 6 || i === 10) {
            goal
              .getComponent(Goal)
              .createGoal(
                2,
                this.listNumGoal16["normal"][i],
                this.getGoalScale()
              );
            goal1
              .getComponent(Goal)
              .createGoal(
                4,
                this.listNumGoal16["super"][i],
                this.getGoalScale()
              );
            goal2
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal16["mega"][i],
                this.getGoalScale()
              );
          }

          if (i === 7 || i === 8 || i === 9) {
            goal
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal16["normal"][i],
                this.getGoalScale()
              );
            goal1
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal16["super"][i],
                this.getGoalScale()
              );
            goal2
              .getComponent(Goal)
              .createGoal(
                0,
                this.listNumGoal16["mega"][i],
                this.getGoalScale()
              );
          }
          break;
      }

      this.listLineGoal[0].addChild(goal);
      this.listLineGoal[1].addChild(goal1);
      this.listLineGoal[2].addChild(goal2);
    }

    this.goalLayout.spacingY = this.getGoalRowSpacing();
    this.listLineGoal[0].getComponent(cc.Layout).spacingX =
      this.getGoalSpacing();
    this.listLineGoal[1].getComponent(cc.Layout).spacingX =
      this.getGoalSpacing();
    this.listLineGoal[2].getComponent(cc.Layout).spacingX =
      this.getGoalSpacing();

    this.ballNode.parent.getComponent(cc.Layout).paddingBottom =
      this.getBottom();
    this.pinNode.parent.getComponent(cc.Layout).spacingY =
      this.getGoalAndPinSpacing();
  }

  private getGoalAndPinSpacing() {
    switch (this.currentRow) {
      case 12:
        return 20;

      case 14:
        return 7.5;

      case 16:
        return -4;
    }
  }

  private getBottom() {
    switch (this.currentRow) {
      case 12:
        return 6;

      case 14:
        return 0;

      case 16:
        return 0;
    }
  }

  private getGoalScale() {
    switch (this.currentRow) {
      case 12:
        return 1;

      case 14:
        return 0.9;

      case 16:
        return 0.82;
    }
  }

  private getGoalRowSpacing() {
    switch (this.currentRow) {
      case 12:
        return 20.5;

      case 14:
        return 9.5;

      case 16:
        return -2;
    }
  }

  private getGoalSpacing() {
    switch (this.currentRow) {
      case 12:
        return 4.75;

      case 14:
        return 1.25;

      case 16:
        return -2.25;
    }
  }

  private updatePin() {
    this.pinNode.removeAllChildren();
    for (let i = 0; i < this.currentRow; i++) {
      let line = cc.instantiate(this.prfPinLine);
      line
        .getComponent(PinLine)
        .createPin(i + 3, this.getPinSpacing(), this.getPinLineScale());
      this.pinNode.addChild(line);
    }
    this.pinNode.getComponent(cc.Layout).spacingY = this.getLineSpacing();
  }

  private getPinSpacing() {
    switch (this.currentRow) {
      case 12:
        return 32.75;

      case 14:
        return 29.1;

      case 16:
        return 25.6;
    }
  }

  private getPinLineScale() {
    switch (this.currentRow) {
      case 12:
        return 1;

      case 14:
        return 1;

      case 16:
        return 0.8;
    }
  }

  private getLineSpacing() {
    switch (this.currentRow) {
      case 12:
        return 21.75;

      case 14:
        return 19;

      case 16:
        return 16.15;
    }
  }

  public createBall(lvl: string, goalId: number, totalMoney: number) {
    let ball = cc.instantiate(this.prfBall);
    ball
      .getComponent(Ball)
      .initBall(lvl, goalId, this.getBallPos(goalId), totalMoney);
    if (this.currentRow === 16) {
      ball.scale = 0.8;
    }
    this.ballNode.addChild(ball);
  }

  private listPos = {
    1.0: [BallPos.listPos12_10, BallPos.listPos14_10, BallPos.listPos16_10],
    2.3: [BallPos.listPos12_23, BallPos.listPos14_23, BallPos.listPos16_23],
    2.6: [BallPos.listPos12_26, BallPos.listPos14_26, BallPos.listPos16_26],
    2.7: [BallPos.listPos12_27, BallPos.listPos14_27, BallPos.listPos16_27],
    2.8: [BallPos.listPos12_28, BallPos.listPos14_28, BallPos.listPos16_28],
    2.9: [BallPos.listPos12_29, BallPos.listPos14_29, BallPos.listPos16_29],
    3.0: [BallPos.listPos12_30, BallPos.listPos14_30, BallPos.listPos16_30],
  };

  private testBallFall() {
    for (let i = 0; i < 40.1; i += 0.1) {
      let ball = cc.instantiate(this.prfBall);
      ball
        .getComponent(Ball)
        .initBall("normal", 0, parseFloat(i.toFixed(1)), 0);
      if (this.currentRow === 16) {
        ball.scale = 0.8;
      }
      this.ballNode.addChild(ball);
    }

    this.scheduleOnce(() => {
      cc.log(Controller.instance.listPosTemp);
    }, 10);
  }

  private testBallFirst() {
    let rowId = 0;
    switch (this.currentRow) {
      case 12:
        rowId = 0;
        break;

      case 14:
        rowId = 1;
        break;

      case 16:
        rowId = 2;
        break;
    }

    // let goalId = 0; //change
    let goalId = 9; //change

    let list = this.listPos[this.gameScale][rowId][goalId];
    let delay = 1;
    for (let i = 0; i < list.length; i++) {
      this.scheduleOnce(() => {
        let ball = cc.instantiate(this.prfBall);
        ball.getComponent(Ball).initBall("normal", goalId, list[i], 0);
        if (this.currentRow === 16) {
          ball.scale = 0.8;
        }
        this.ballNode.addChild(ball);
      }, delay);
      delay++;
    }
  }

  private testBallLast() {
    let rowId = 0;
    switch (this.currentRow) {
      case 12:
        rowId = 0;
        break;

      case 14:
        rowId = 1;
        break;

      case 16:
        rowId = 2;
        break;
    }
    
    // let goalId = this.currentRow; //change
    let goalId = this.currentRow - 1; //change

    let list = this.listPos[this.gameScale][rowId][goalId];
    let delay = 0;
    for (let i = 0; i < list.length; i++) {
      this.scheduleOnce(() => {
        let ball = cc.instantiate(this.prfBall);
        ball.getComponent(Ball).initBall("normal", goalId, list[i], 0);
        if (this.currentRow === 16) {
          ball.scale = 0.8;
        }
        this.ballNode.addChild(ball);
      }, delay);
      delay++;
    }
  }

  private getBallPos(goalId: number) {
    switch (this.currentRow) {
      case 12:
        let random = BGUI.Utils.getRandomInt(
          0,
          this.listPos[this.gameScale][0][goalId].length - 1
        );
        return this.listPos[this.gameScale][0][goalId][random];

      case 14:
        let random1 = BGUI.Utils.getRandomInt(
          0,
          this.listPos[this.gameScale][1][goalId].length - 1
        );
        return this.listPos[this.gameScale][1][goalId][random1];

      case 16:
        let random2 = BGUI.Utils.getRandomInt(
          0,
          this.listPos[this.gameScale][2][goalId].length - 1
        );
        return this.listPos[this.gameScale][2][goalId][random2];
    }
  }

  public animGoal(lvl: string, goalId: number) {
    switch (lvl) {
      case "normal":
        this.listGoalLine[0].children[goalId].getComponent(Goal).animGoal();
        break;

      case "super":
        this.listGoalLine[1].children[goalId].getComponent(Goal).animGoal();
        break;

      case "mega":
        this.listGoalLine[2].children[goalId].getComponent(Goal).animGoal();
        break;
    }
  }

  private closeWin() {
    this.pnWin.active = false;
  }

  public openWin(lvl: string, goalId: number, profit: number) {
    let active = false;
    let name = "";
    switch (this.currentRow) {
      case 12:
        switch (lvl) {
          case "normal":
            switch (goalId) {
              case 0:
              case 12:
                active = true;
                name = "megaWin";
                break;

              case 1:
              case 2:
              case 10:
              case 11:
                active = true;
                name = "bigWin";
                break;
            }
            break;

          case "super":
          case "mega":
            switch (goalId) {
              case 0:
              case 1:
              case 11:
              case 12:
                active = true;
                name = "megaWin";
                break;

              case 2:
              case 10:
                active = true;
                name = "bigWin";
                break;
            }
            break;
        }
        break;

      case 14:
        switch (lvl) {
          case "normal":
            switch (goalId) {
              case 0:
              case 14:
                active = true;
                name = "megaWin";
                break;

              case 1:
              case 2:
              case 12:
              case 13:
                active = true;
                name = "bigWin";
                break;
            }
            break;

          case "super":
          case "mega":
            switch (goalId) {
              case 0:
              case 1:
              case 13:
              case 14:
                active = true;
                name = "megaWin";
                break;

              case 2:
              case 3:
              case 11:
              case 12:
                active = true;
                name = "bigWin";
                break;
            }
            break;
        }
        break;

      case 16:
        switch (lvl) {
          case "normal":
            switch (goalId) {
              case 0:
              case 16:
                active = true;
                name = "megaWin";
                break;

              case 1:
              case 2:
              case 14:
              case 15:
                active = true;
                name = "bigWin";
                break;
            }
            break;

          case "super":
          case "mega":
            switch (goalId) {
              case 0:
              case 1:
              case 15:
              case 16:
                active = true;
                name = "megaWin";
                break;

              case 2:
              case 3:
              case 13:
              case 14:
                active = true;
                name = "bigWin";
                break;
            }
            break;
        }
        break;
    }
    if (active) {
      this.pnWin.active = true;
      this.pnWin.children[1]
        .getComponent(sp.Skeleton)
        .setAnimation(0, name, true);
      this.pnWin.children[2].getComponent(cc.Label).string = profit.toString();
      switch (name) {
        case "bigWin":
          this.pnWin.children[2].color = cc.color(234, 60, 150);
          AudioManager.instance.playSound(SOUND_TYPE.BIG_WIN);
          break;

        case "megaWin":
          this.pnWin.children[2].color = cc.color(51, 218, 101);
          AudioManager.instance.playSound(SOUND_TYPE.MEGA_WIN);
          break;
      }
      this.unschedule(this.closeWin);
      this.scheduleOnce(this.closeWin, 3);
    }
  }

  public interactableRow(interactable: boolean) {
    if (interactable) {
      if (this.ballNode.childrenCount === 0) {
        this.rowChoose.children.forEach((child) => {
          child.getComponent(cc.Button).interactable = true;
        });
      }
    } else {
      this.rowChoose.children.forEach((child) => {
        child.getComponent(cc.Button).interactable = false;
      });
    }
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
        lbl.string = Common.numberWithCommas(totalProfit, 2);
      } else {
        lbl.string = Common.numberWithCommas(current, 2);
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
