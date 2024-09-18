import { Receive } from "../Connection/Receive";
import { Send } from "../Connection/Send";
import AudioController, { SOUND_TYPE } from "../Controller/AudioController";
import GameController from "../Controller/GameController";
import { FOOTBAR_MODE } from "../UI/FootBar";
import Common from "../Utils/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Responses extends cc.Component {
  private noti = null;

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {
    this.noti = GameController.Instance.getNoti();
  }

  //1
  public responseLogin(cmdId: any, data: Uint8Array) {
    let res = new Receive.Login();
    res.unpackData(data);
    Common.checkRes("Login_GetUserInfor", cmdId, res);
    Common.showError(res);
    ////////////////////////////////////////////
    switch (res.getError()) {
      case 0:
        let headBar = GameController.Instance.getHeadBar();
        headBar.updateListWallet(res.wallets);
        headBar.onClickChangeWallet(headBar.getCurrentWallet());
        Send.sendCheckGame();
        break;

      case 1:
        this.noti.openNoti(1);
        Common.runError("Token Invalid");
        break;

      default:
        this.noti.openNoti(1);
        break;
    }
  }

  // 5002
  public responseGameInfo(cmdId: any, data: Uint8Array) {
    let res = new Receive.GameInfo();
    res.unpackData(data);
    Common.checkRes("GameInfo", cmdId, res);
    Common.showError(res);
    /////////////////////////////////////////////////////////////////////
    switch (res.getError()) {
      case 0:
        break;

      default:
        this.noti.openNoti(1);
        break;
    }
  }

  // 5004
  // public localRes5004: ImpData = null;

  public responseRoundResult(cmdId: any, data: Uint8Array) {
    let res = new Receive.RoundResult();
    res.unpackData(data);
    Common.checkRes("RoundResult", cmdId, res);
    Common.showError(res);
    ////////////////////////////////////////////

    switch (res.getError()) {
      case 0:
        AudioController.Instance.playSound(SOUND_TYPE.START);
        GameController.Instance.getFootBar().changeMode(
          FOOTBAR_MODE.START_GAME
        );
        GameController.Instance.getGamePlay().startMode();
        GameController.Instance.getHeadBar().setCurrentBalance(
          parseFloat(
            res.data.currentUserMoney.toFixed(
              GameController.Instance.getHeadBar().getFixedNum()
            )
          )
        );
        break;

      default:
        this.noti.openNoti(1);
        break;
    }
  }

  //5007
  public responseCashOut(cmdId: any, data: Uint8Array) {
    let res = new Receive.CashOut();
    res.unpackData(data);
    Common.checkRes("CashOut", cmdId, res);
    Common.showError(res);

    ////////////////////////////////////////////
    const error = res.getError();
    switch (error) {
      case 0:
        break;

      default:
        this.noti.openNoti(5);
        break;
    }
  }

  //5008;
  public responseHistory(cmdId: any, data: Uint8Array) {
    let res = new Receive.History();
    res.unpackData(data);
    Common.checkRes("History", cmdId, res);
    Common.showError(res);

    /////////////////////////////////////////////////////////

    let err = res.getError();
    switch (err) {
      case 0:
        break;

      default:
        Common.runError("History Error:", err);
        break;
    }
  }

  //5009
  public responseConfirmJoinRoom(cmdId: any, data: Uint8Array) {
    let res = new Receive.ConfirmJoinRoom();
    res.unpackData(data);
    Common.checkRes("ConfirmJoinRoom", cmdId, res);
    Common.showError(res);

    /////////////////////////////////////////////////////////

    let err = res.getError();
    switch (err) {
      case 0:
        break;

      default:
        Common.runError("ConfirmJoinRoom err:", err);
        break;
    }
  }

  //5015
  public responseWinNoti(cmdId: any, data: Uint8Array) {
    let res = new Receive.WinNoti();
    res.unpackData(data);
    Common.checkRes("WinNoti", cmdId, res);
    Common.showError(res);

    /////////////////////////////////////////////////////////

    let err = res.getError();
    switch (err) {
      case 0:
        break;

      default:
        break;
    }
  }
}
