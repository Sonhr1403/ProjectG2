import Common from "../Utils/Common";
import { Commands } from "./Commands";
import { Connector } from "./Connector";

const { ccclass, property } = cc._decorator;

//5001
export class SendCheckGame extends BGUI.BaseOutPacket {
  getCmdId(): number {
    return Commands.CHECK_GAME;
  }
  putData(): void {}
}

//5004
export class SendBet extends BGUI.BaseOutPacket {
  public level: number;
  public position: number;
  getCmdId(): number {
    return Commands.ROUND_RESULT;
  }
  putData(): void {
    this.putInt(this.level);
    this.putInt(this.position);
  }
}

//5006
export class SkipBet extends BGUI.BaseOutPacket {
  getCmdId(): number {
    return Commands.SKIP_BET;
  }
  putData(): void {}
}

//5007
export class CashOut extends BGUI.BaseOutPacket {
  getCmdId(): number {
    return Commands.CASH_OUT;
  }
  putData(): void {}
}

//5009
export class ConfirmJoinRoom extends BGUI.BaseOutPacket {
  public level: number;
  public wallet: string;
  public betAmount: string;
  getCmdId(): number {
    return Commands.CONFIRM_JOIN_ROOM;
  }
  putData(): void {
    this.putInt(this.level);
    this.putString(this.wallet);
    this.putString(this.betAmount);
  }
}

export class Send {
  //5001
  public static sendCheckGame() {
    let pk = new SendCheckGame();
    Connector.instance.sendPacket(pk);
  }

  //5004
  public static sendBet(level: number, position: number) {
    let pk = new SendBet();
    pk.level = level;
    pk.position = position;
    Connector.instance.sendPacket(pk);
    Common.runError("send bet", pk);
  }

  //5006
  public static skipBet() {
    let pk = new SkipBet();
    Connector.instance.sendPacket(pk);
  }

  //5007
  public static cashOut() {
    let pk = new CashOut();
    Connector.instance.sendPacket(pk);
  }

  //5009
  public static confirmJoinRoom(
    level: number,
    wallet: string,
    betAmount: string
  ) {
    let pk = new ConfirmJoinRoom();
    pk.level = level;
    pk.wallet = wallet;
    pk.betAmount = betAmount;
    Common.runError("confirm join room", pk);
    Connector.instance.sendPacket(pk);
  }
}