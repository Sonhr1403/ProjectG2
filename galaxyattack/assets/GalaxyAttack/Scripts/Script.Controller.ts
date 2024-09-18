import AudioManager, { SOUND_TYPE } from "./Script.Audio";
import { Cmd } from "./Script.Cmd";
import Common, { FIGHTER_ANIMATION, MONSTER_ANIMATION } from "./Script.Common";
import { Connector } from "./Script.Connector";
import FootBar from "./Script.FootBar";
import HeadBar from "./Script.HeadBar";
import Monster from "./Script.Monster";
import Noti from "./Script.Noti";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Controller extends cc.Component {
  public static instance: Controller = null;

  @property(cc.Node)
  private pnGame: cc.Node = null;

  @property(cc.Node)
  private pnBar: cc.Node = null;

  @property(cc.Node)
  private pnPlay: cc.Node = null;

  @property(cc.Node)
  private monsterNode: cc.Node = null;

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
  private prfTutorial: cc.Prefab = null;

  @property(cc.Node)
  private listBtnMonster: cc.Node[] = [];

  @property(cc.Node)
  private listMonsterSkeleton: cc.Node[] = [];

  @property(cc.Label)
  private listLblDescribtion: cc.Label[] = [];

  @property(cc.Node)
  private listStar: cc.Node[] = [];

  @property(cc.Node)
  private listHpLost: cc.Node[] = [];

  @property(cc.Prefab)
  private listMonsterPrefab: cc.Prefab[] = [];

  @property(cc.Label)
  private mineNum: cc.Label = null;

  @property(cc.Label)
  private lblNextPayOut: cc.Label = null;

  @property(cc.Node)
  private currentPayOut: cc.Node = null;

  @property(sp.Skeleton)
  private playFighter: sp.Skeleton = null;

  @property(cc.Node)
  private listPlay: cc.Node[] = [];

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

  public currentMonster = 0;

  public currentTarget = -1;

  public getCurrentMonster() {
    return this.currentMonster;
  }

  ///////////////////////////////////////////////////

  onLoad() {
    cc.debug.setDisplayStats(false);
    Controller.instance = this;
    this.initNoti();

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

    //5007
    Connector.instance.addCmdListener(
      Cmd.Cmd.CMD_CASH_OUT,
      this.responseCashOut,
      this
    );

    //5008
    // Connector.instance.addCmdListener(
    //   Cmd.Cmd.CMD_HISTORY,
    //   this.responseHistory,
    //   this
    // );

    //5009
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

    Connector.instance.removeCmdListener(this, Cmd.Cmd.CMD_CASH_OUT);

    // Connector.instance.removeCmdListener(this, Cmd.Cmd.CMD_HISTORY);

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
    // this.initNewGame();

    this.updateMonsterWanted();

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

  private initNewGame() {}

  /////////////////////////////////////////////////////////////////////////////Init End

  //////////////////////////////////////////////////////////////////////////Button Start

  private onClickChooseMonster(event, id: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    if (this.currentMonster !== parseInt(id)) {
      this.listBtnMonster[this.currentMonster].opacity = 160;
      this.listMonsterSkeleton[this.currentMonster].active = false;
      this.currentMonster = parseInt(id);
      this.listBtnMonster[this.currentMonster].opacity = 255;
      this.listMonsterSkeleton[this.currentMonster].active = true;

      this.updateMonsterWanted();
    }
  }

  private updateMonsterWanted() {
    switch (this.currentMonster) {
      case 0:
        this.listLblDescribtion[0].string = "Easy";
        this.listLblDescribtion[1].string = "Dodge all 1 mine and get reward!";
        this.listLblDescribtion[2].string = "7.8";

        this.listStar[0].active = false;
        this.listStar[1].active = false;
        break;

      case 1:
        this.listLblDescribtion[0].string = "Normal";
        this.listLblDescribtion[1].string = "Dodge all 3 mines and get reward!";
        this.listLblDescribtion[2].string = "117";

        this.listStar[0].active = true;
        this.listStar[1].active = false;
        break;

      case 2:
        this.listLblDescribtion[0].string = "Hard";
        this.listLblDescribtion[1].string = "Dodge all 5 mines and get reward!";
        this.listLblDescribtion[2].string = "772.2";

        this.listStar[0].active = true;
        this.listStar[1].active = true;
        break;
    }
  }

  private onClickMonster() {
    let sound = -1;
    switch (this.currentMonster) {
      case 0:
        sound = SOUND_TYPE.ROAR_EASY;
        break;

      case 1:
        sound = SOUND_TYPE.ROAR_NORMAL;
        break;

      case 2:
        sound = SOUND_TYPE.ROAR_HARD;
        break;
    }
    AudioManager.instance.playSound(sound);

    let ske = this.listMonsterSkeleton[this.currentMonster].getComponent(
      sp.Skeleton
    );
    ske.setAnimation(0, MONSTER_ANIMATION.SHOUT, false);
    ske.setCompleteListener(() => {
      ske.setAnimation(0, MONSTER_ANIMATION.NORMAL2, true);
    });
  }

  private onClickRandom() {
    this.monsterNode.children[0].getComponent(Monster).onRandom();
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
        HeadBar.instance.onClickChangeWallet(
          HeadBar.instance.getCurrentWallet()
        );
        Cmd.Send.sendCheckGame();
        break;

      case 1:
        Noti.instance.openNoti(1);
        Common.runError("Token hết hạn");
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
    this.checkRes("responseGameInfo", cmdId, res);
    this.showError(res);
    /////////////////////////////////////////////////////////////////////
    if (res.getError() === 0) {
      this.localRes5004 = res.data;

      if (res.data.isEndGame) {
        Cmd.Send.cashOut();
      }

      this.startPlay(res.data);
      this.nextPlay(res.data);

      for (let i = 0; i < res.listPayOut.length; i++) {
        if (res.listPayOut[i] !== 0) {
          this.monsterNode.children[0]
          .getComponent(Monster)
          .turnTarget(true, i, res.listPayOut[i]);
        }
      }
    }
  }

  // 5004
  public localRes5004: Cmd.ImpData = null;

  protected responseRoundResult(cmdId: any, data: Uint8Array) {
    let res = new Cmd.ReceiveRoundResult();
    res.unpackData(data);
    this.checkRes("responseRoundResult", cmdId, res);
    this.showError(res);
    ////////////////////////////////////////////

    if (res.getError() !== 0) {
      Noti.instance.openNoti(4);
      return;
    }

    this.localRes5004 = res.data;

    HeadBar.instance.setCurrentBalance(res.data.currentUserMoney);

    if (res.data.currentPayOut === -1 && res.data.isEndGame === false) {
      this.startPlay(res.data);
    }

    if (res.data.currentPayOut !== -1 && res.data.isEndGame === false) {
      this.scheduleOnce(() => {
        this.nextPlay(res.data);
      }, 3);
    }

    if (res.data.isEndGame) {
      this.scheduleOnce(() => {
        this.endPlay(res.data);
      }, 3);
    }
  }

  // //5005
  // protected responseTime(cmdId: any, data: Uint8Array) {
  //   let res = new Cmd.ReceiveTime();
  //   res.unpackData(data);
  //   // this.checkRes("responseTime", cmdId, res);
  //   this.showError(res);

  //   ////////////////////////////////////////////
  //   const error = res.getError();
  //   switch (error) {
  //     case 0:
  //       break;

  //     default:
  //       Common.runError("");
  //       break;
  //   }
  // }

  // //5006
  // protected responseSkipError(cmdId: any, data: Uint8Array) {
  //   let res = new Cmd.ReceiveSkipError();
  //   res.unpackData(data);
  //   this.checkRes("responseSkipError", cmdId, res);
  //   this.showError(res);
  //   ///////////////////////
  //   switch (res.err) {
  //     case 1:
  //       Common.runError("Ko có dữ liệu join room");
  //       break;

  //     case 1:
  //       Common.runError("Đã hết số lần dùng skip");
  //       break;
  //   }
  // }

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
        AudioManager.instance.playSound(SOUND_TYPE.CASH_OUT);
        AudioManager.instance.stopPlayLoop();

        HeadBar.instance.setCurrentBalance(res.currentMoney);
        HeadBar.instance.updateWallet(
          HeadBar.instance.getCurrentWallet(),
          res.currentMoney
        );

        this.listPlay[0].active = false;
        this.listPlay[1].active = false;
        this.listPlay[2].active = false;
        this.listPlay[3].active = false;
        this.listPlay[4].active = true;
        this.listPlay[4].children[1].getComponent(cc.Label).string =
          res.winMoney.toFixed(HeadBar.instance.getFixedNum());

        this.scheduleOnce(() => {
          this.pnPlay.active = false;
          this.pnGame.active = true;
          FootBar.instance.changeMode(true);
        }, 3);
        break;

      default:
        Noti.instance.openNoti(5);
        break;
    }
  }

  //5008
  // private responseHistory(cmdId: any, data: Uint8Array) {
  //   let res = new Cmd.ReceiveHistory();
  //   res.unpackData(data);
  //   this.checkRes("responseHistory", cmdId, res);
  //   this.showError(res);

  //   /////////////////////////////////////////////////////////

  //   let err = res.getError();
  //   switch (err) {
  //     case 0:
  //       break;

  //     default:
  //       Common.runError("History Error:", err);
  //       break;
  //   }
  // }

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
        Common.runError("responseConfirmJoinRoom err:", err);
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

  private startPlay(data: Cmd.ImpData) {
    AudioManager.instance.playSound(SOUND_TYPE.BEGIN);

    this.pnGame.active = false;
    this.pnPlay.active = true;
    this.newPlay();

    let monster = cc.instantiate(this.listMonsterPrefab[data.level]);
    this.monsterNode.removeAllChildren();
    this.monsterNode.addChild(monster);
    let ske = this.monsterNode.children[0].children[0].getComponent(
      sp.Skeleton
    );
    ske.setAnimation(0, MONSTER_ANIMATION.DEBUT, false);
    ske.setCompleteListener(() => {
      ske.setAnimation(0, MONSTER_ANIMATION.NORMAL, true);
      ske.setCompleteListener(null);
    });

    this.playFighter.setAnimation(0, FIGHTER_ANIMATION.NORMAL, true);
    this.playFighter.setCompleteListener(null);

    FootBar.instance.changeMode(false);
    this.currentPayOut.active = false;
    FootBar.instance.cashOutInteractable(false);
    this.mineNum.string = data.mine.toString();
    this.listPlay[0].active = true;
    this.listPlay[1].active = true;
    this.listPlay[2].active = true;
    this.listPlay[3].active = false;
    this.listPlay[4].active = false;
    this.lblNextPayOut.string = data.nextPayOut.toFixed(
      HeadBar.instance.getFixedNum()
    );
  }

  private nextPlay(data: Cmd.ImpData) {
    this.currentPayOut.active = true;
    this.currentPayOut.children[1].getComponent(cc.Label).string =
      data.currentPayOut.toFixed(HeadBar.instance.getFixedNum());
    FootBar.instance.cashOutInteractable(true);

    cc.log(this.currentTarget)
    if (this.currentTarget !== -1) {
      this.monsterNode.children[0]
        .getComponent(Monster)
        .turnTarget(true, this.currentTarget, data.rate);
    }

    if (data.currentHp < 7) {
      for (let i = 1; i < 8; i++) {
        if (i > data.currentHp) {
          this.listHpLost[i - 1].active = true;
        }
      }
    }
    if (data.nextPayOut > 0) {
      this.lblNextPayOut.string = data.nextPayOut.toFixed(
        HeadBar.instance.getFixedNum()
      );
    }
    this.monsterNode.children[0].getComponent(Monster).targetInteractable();
  }

  private endPlay(data: Cmd.ImpData) {
    AudioManager.instance.playSound(SOUND_TYPE.MONSTER_EXPLOSION);
    AudioManager.instance.stopPlayLoop();

    this.listPlay[0].active = false;
    this.listPlay[1].active = false;
    this.listPlay[2].active = false;
    this.listPlay[3].active = false;
    this.monsterNode.children[0]
      .getComponent(Monster)
      .turnTarget(false, this.currentTarget, data.rate);

    let monster = null;
    if (this.monsterNode.children[0].children[0].active) {
      monster = this.monsterNode.children[0].children[0].getComponent(
        sp.Skeleton
      );
    } else {
      monster = this.monsterNode.children[0].children[1].getComponent(
        sp.Skeleton
      );
    }

    monster.setAnimation(0, MONSTER_ANIMATION.ATTACK, false);
    monster.setCompleteListener(() => {
      monster.setAnimation(0, MONSTER_ANIMATION.NORMAL, true);
      monster.setCompleteListener(null);
      this.playFighter.setAnimation(0, FIGHTER_ANIMATION.DEAD, false);
      this.playFighter.setCompleteListener(() => {
        this.listPlay[4].active = true;
        this.listPlay[4].children[1].getComponent(cc.Label).string =
          data.currentPayOut.toFixed(HeadBar.instance.getFixedNum());
        this.scheduleOnce(() => {
          this.pnPlay.active = false;
          this.pnGame.active = true;
          FootBar.instance.changeMode(true);
        }, 2);
      });
    });
  }

  public playAnim(id: number) {
    let animName = "afterBet_shot";
    switch (this.currentMonster) {
      case 0:
        animName += "A";
        switch (id) {
          case 0:
            animName += 5;
            break;

          case 1:
            animName += 6;
            break;

          case 2:
            animName += 7;
            break;

          case 3:
            animName += 4;
            break;

          case 4:
            animName += 3;
            break;

          case 5:
            animName += 2;
            break;

          case 6:
            animName += 1;
            break;

          case 7:
            animName += 8;
            break;
        }
        break;

      case 1:
        animName += "B";
        switch (id) {
          case 0:
            animName += 5;
            break;

          case 1:
            animName += 6;
            break;

          case 2:
            animName += 7;
            break;

          case 3:
            animName += 8;
            break;

          case 4:
            animName += 4;
            break;

          case 5:
            animName += 3;
            break;

          case 6:
            animName += 2;
            break;

          case 7:
            animName += 1;
            break;

          case 8:
            animName += 9;
            break;

          case 9:
            animName += 10;
            break;
        }
        break;

      case 2:
        animName += "C";
        switch (id) {
          case 0:
            animName += 5;
            break;

          case 1:
            animName += 6;
            break;

          case 2:
            animName += 7;
            break;

          case 3:
            animName += 8;
            break;

          case 4:
            animName += 9;
            break;

          case 5:
            animName += 4;
            break;

          case 6:
            animName += 3;
            break;

          case 7:
            animName += 2;
            break;

          case 8:
            animName += 1;
            break;

          case 9:
            animName += 10;
            break;

          case 10:
            animName += 12;
            break;

          case 11:
            animName += 11;
            break;
        }
        break;
    }

    let monster = null;
    if (this.monsterNode.children[0].children[0].active) {
      monster = this.monsterNode.children[0].children[0].getComponent(
        sp.Skeleton
      );
    } else {
      monster = this.monsterNode.children[0].children[1].getComponent(
        sp.Skeleton
      );
    }
    this.playFighter.setAnimation(0, animName, false);
    this.playFighter.setCompleteListener(() => {
      this.playFighter.setAnimation(0, FIGHTER_ANIMATION.NORMAL, true);
      this.playFighter.setCompleteListener(null);
    });

    this.scheduleOnce(() => {
      monster.setAnimation(0, MONSTER_ANIMATION.HURT, false);
      monster.setCompleteListener(() => {
        monster.setAnimation(0, MONSTER_ANIMATION.NORMAL, true);
        monster.setCompleteListener(null);
        if (this.localRes5004.currentHp === 3) {
          this.monsterNode.children[0].children[0].active = false;
          this.monsterNode.children[0].children[1].active = true;
          AudioManager.instance.playLoop(SOUND_TYPE.HEART_BEAT);
        }
      });
    }, 0.5);
  }

  private newPlay() {
    this.monsterNode.removeAllChildren();
    this.listHpLost.forEach((block) => {
      block.active = false;
    });
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
