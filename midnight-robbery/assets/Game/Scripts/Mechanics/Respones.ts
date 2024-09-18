import { Receive, ImpData } from "../Connection/Receive";
import { Send } from "../Connection/Send";
import GameController from "../Controller/GameController";
import Common from "../Utils/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Responses extends cc.Component {
  private noti = null;

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {
    this.noti = GameController.Instance.getNoti();
  }

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
  public responseLogin(cmdId: any, data: Uint8Array) {
    let res = new Receive.ReceiveLogin();
    res.unpackData(data);
    this.checkRes("responseLogin_GetUserInfor", cmdId, res);
    this.showError(res);
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
    this.checkRes("responseGameInfo", cmdId, res);
    this.showError(res);
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
    this.checkRes("responseRoundResult", cmdId, res);
    this.showError(res);
    ////////////////////////////////////////////

    switch (res.getError()) {
      case 0:
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
    this.checkRes("responseCashOut", cmdId, res);
    this.showError(res);

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
    this.checkRes("responseHistory", cmdId, res);
    this.showError(res);

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
  public responseWinNoti(cmdId: any, data: Uint8Array) {
    let res = new Receive.WinNoti();
    res.unpackData(data);
    this.checkRes("responseWinNoti", cmdId, res);
    this.showError(res);

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
