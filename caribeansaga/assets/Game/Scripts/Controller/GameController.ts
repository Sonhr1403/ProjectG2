import { Commands } from "../Connection/Commands";
import { Connector } from "../Connection/Connector";
import GamePlay from "../Mechanics/GamePlay";
import Responses from "../Mechanics/Respones";
import FootBar, { FOOTBAR_MODE } from "../UI/FootBar";
import HeadBar from "../UI/HeadBar";
import Lose from "../UI/Lose";
import Menu from "../UI/Menu";
import Noti from "../UI/Noti";
import Rules from "../UI/Rules";
import Table from "../UI/Table";
import Win from "../UI/Win";
import AudioController, { MUSIC_TYPE } from "./AudioController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

  @property(cc.Node)
  private pnGame: cc.Node = null;

  @property(cc.Node)
  private pnBar: cc.Node = null;
  
  @property(cc.Node)
  private pnWinLose: cc.Node = null;

  @property(cc.Prefab)
  private prfFootBar: cc.Prefab = null;

  @property(cc.Prefab)
  private prfHeadBar: cc.Prefab = null;

  @property(cc.Prefab)
  private prfWin: cc.Prefab = null;

  @property(cc.Prefab)
  private prfLose: cc.Prefab = null;

  @property(cc.Prefab)
  private prfNoti: cc.Prefab = null;

  @property(cc.Prefab)
  private prfMenu: cc.Prefab = null;

  @property(cc.Prefab)
  private prfRules: cc.Prefab = null;
  
  @property(cc.Prefab)
  public chipItem: cc.Prefab = null;
  
  @property(cc.SpriteFrame)
  public listChipsSF: cc.SpriteFrame[] = [];

  //////////////////////////////////

  private static instance: GameController = null;
  private pnNoti: cc.Node = null;
  private pnHeadBar: cc.Node = null;
  private pnFootBar: cc.Node = null;
  private pnMenu: cc.Node = null;
  private pnRules: cc.Node = null;
  private pnWin: cc.Node = null;
  private pnLose: cc.Node = null;

  public static get Instance(){
    return this.instance;
  }

  public getNoti() {
    return this.pnNoti.getComponent(Noti);
  }

  public getHeadBar() {
    return this.pnHeadBar.getComponent(HeadBar);
  }

  public getFootBar() {
    return this.pnFootBar.getComponent(FootBar);
  }

  public getMenu() {
    return this.pnMenu.getComponent(Menu);
  }

  public getRules() {
    return this.pnRules.getComponent(Rules);
  }

  public getResponses(){
    return this.node.getComponent(Responses);
  }

  public getGamePlay(){
    return this.pnGame.getComponent(GamePlay);
  }

  public getWin(){
    return this.pnWin.getComponent(Win);
  }

  public getLose(){
    return this.pnLose.getComponent(Lose);
  }

  private _scheduler = null;
  private _isGameActive: boolean = true;
  private hideTime: number = null;

  ///////////////////////////////////////////////////

  onLoad() {
    GameController.instance = this;

    let connector = Connector.instance;
    //1
    connector.addCmdListener(Commands.LOGIN, this.getResponses().responseLogin, this);

    //5002
    connector.addCmdListener(
      Commands.GAME_INFO,
      this.getResponses().responseGameInfo,
      this
    );

    //5004
    connector.addCmdListener(
      Commands.ROUND_RESULT,
      this.getResponses().responseRoundResult,
      this
    );

    //5007
    connector.addCmdListener(
      Commands.CASH_OUT,
      this.getResponses().responseCashOut,
      this
    );

    5008;
    connector.addCmdListener(
      Commands.HISTORY,
      this.getResponses().responseHistory,
      this
    );

    //5009
    connector.addCmdListener(
      Commands.CONFIRM_JOIN_ROOM,
      this.getResponses().responseConfirmJoinRoom,
      this
    );

    //5015
    connector.addCmdListener(
      Commands.WIN_NOTI,
      this.getResponses().responseWinNoti,
      this
    );

    // connector.connect();
  }

  onDestroy() {
    let connector = Connector.instance;

    connector.disconnect();

    connector.removeCmdListener(this, Commands.LOGIN);

    connector.removeCmdListener(this, Commands.GAME_INFO);

    connector.removeCmdListener(this, Commands.ROUND_RESULT);

    connector.removeCmdListener(this, Commands.CASH_OUT);

    connector.removeCmdListener(this, Commands.HISTORY);

    connector.removeCmdListener(this, Commands.CONFIRM_JOIN_ROOM);

    connector.removeCmdListener(this, Commands.WIN_NOTI);

    cc.director.getScheduler().unscheduleUpdate(this);
  }

  protected start(): void {
    // this.initNoti();
    this.initMusic();
    this.initHeadBar();
    this.initFootBar();
    // this.initWin();
    // this.initLose();
    // this.initMenu();
    // this.initRules();
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
    AudioController.Instance.playMusic(MUSIC_TYPE.BGM);
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

  private initWin() {
    this.pnWin = cc.instantiate(this.prfWin);
    this.pnWin.zIndex = 0;
    this.pnWin.active = false;
    this.pnWinLose.addChild(this.pnWin);
  }

  private initLose() {
    this.pnLose = cc.instantiate(this.prfLose);
    this.pnLose.zIndex = 1;
    this.pnLose.active = false;
    this.pnWinLose.addChild(this.pnLose);
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

  public initNewGame() {
    // this.getGamePlay().initNewGame();
    this.getFootBar().changeMode(FOOTBAR_MODE.DISABLE);
  }

  /////////////////////////////////////////////////////////////////////////////Init End

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
