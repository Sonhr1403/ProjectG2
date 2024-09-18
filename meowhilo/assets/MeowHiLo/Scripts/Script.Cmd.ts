import Common from "./Script.Common";
import { Connector } from "./Script.Connector";

export namespace Cmd {
  export interface ImpData {
    betAmount?: number;
    rateRed?: number;
    rateBlack?: number;
    rateHigher?: number;
    rateLower?: number;
    currentCardId?: number;
    currentCardRemain?: number;
    nextCardDrawId?: number;
    isEndGame?: boolean;
    currentUserMoney?: number;
    skipRound?: number;
    cashoutWin?: number;
    multiRed?: number;
    multiBlack?: number;
    multiHigher?: number;
    multiLower?: number;
  }

  export interface ImpHistory {
    cardID: number;
    typeSelected: number;
    multiple: number;
    type: number;
  }

  export interface ImpWallet {
    key: string;
    value: number;
  }

  /////////////////////////////////
  export class Cmd {
    static CMD_LOGIN = 1;
    static CMD_LOGOUT = 2;
    static CMD_DISCONNECTED = 37;
    static CMD_CHECK_GAME = 5001;
    static CMD_GAME_INFO = 5002;
    static CMD_5003 = 5003;
    static CMD_ROUND_RESULT = 5004;
    static CMD_TIME = 5005;
    static CMD_SKIP_BET = 5006;
    static CMD_CASH_OUT = 5007;
    static CMD_HISTORY = 5008;
    static CMD_CONFIRM_JOIN_ROOM = 5009;
    static CMD_PLAYER_INFO = 5011;
    static CMD_WIN_NOTI = 5015;
  }

  export class DEFINE_CHARACTER {
    static CLUBS_TWO = 0;
    static CLUBS_THREE = 1;
    static CLUBS_FOUR = 2;
    static CLUBS_FIVE = 3;
    static CLUBS_SIX = 4;
    static CLUBS_SEVEN = 5;
    static CLUBS_EIGHT = 6;
    static CLUBS_NINE = 7;
    static CLUBS_TEN = 8;
    static CLUBS_JACK = 9;
    static CLUBS_QUEEN = 10;
    static CLUBS_KING = 11;
    static CLUBS_ACE = 12;
    static DIAMONDS_TWO = 13;
    static DIAMONDS_THREE = 14;
    static DIAMONDS_FOUR = 15;
    static DIAMONDS_FIVE = 16;
    static DIAMONDS_SIX = 17;
    static DIAMONDS_SEVEN = 18;
    static DIAMONDS_EIGHT = 19;
    static DIAMONDS_NINE = 20;
    static DIAMONDS_TEN = 21;
    static DIAMONDS_JACK = 22;
    static DIAMONDS_QUEEN = 23;
    static DIAMONDS_KING = 24;
    static DIAMONDS_ACE = 25;
    static HEARTS_TWO = 26;
    static HEARTS_THREE = 27;
    static HEARTS_FOUR = 28;
    static HEARTS_FIVE = 29;
    static HEARTS_SIX = 30;
    static HEARTS_SEVEN = 31;
    static HEARTS_EIGHT = 32;
    static HEARTS_NINE = 33;
    static HEARTS_TEN = 34;
    static HEARTS_JACK = 35;
    static HEARTS_QUEEN = 36;
    static HEARTS_KING = 37;
    static HEARTS_ACE = 38;
    static SPADES_TWO = 39;
    static SPADES_THREE = 40;
    static SPADES_FOUR = 41;
    static SPADES_FIVE = 42;
    static SPADES_SIX = 43;
    static SPADES_SEVEN = 44;
    static SPADES_EIGHT = 45;
    static SPADES_NINE = 46;
    static SPADES_TEN = 47;
    static SPADES_JACK = 48;
    static SPADES_QUEEN = 49;
    static SPADES_KING = 50;
    static SPADES_ACE = 51;
  }

  export class ReceiveLogin extends BGUI.BaseInPacket {
    public userId: number;
    public userName: string;
    public displayName: string;
    public avatar: string;
    public size: number;
    public wallets: Array<ImpWallet> = [];
    protected unpack(): void {
      
      if (this.getError() !== 0) {
        return;
      }
      this.userId = this.getInt();
      this.userName = this.getString();
      let isDN = this.getBool();
      if (isDN) {
        this.displayName = this.getString();
      } else {
        this.displayName = "";
      }
      let isAva = this.getBool();
      if (isAva) {
        this.avatar = this.getString();
      } else {
        this.avatar = "";
      }

      this.size = this.getShort();
      for (let i = 0; i < this.size; i++) {
        let item: ImpWallet = {
          key: this.getString(),
          value: this.getDouble(),
        };
        this.wallets.push(item);
      }
    }
  }

  //5002
  export class ReceiveGameInfo extends BGUI.BaseInPacket {
    public data: ImpData = {
      betAmount: -1,
      rateRed: -1,
      rateBlack: -1,
      rateHigher: -1,
      rateLower: -1,
      currentCardId: -1,
      currentCardRemain: -1,
      currentUserMoney: -1,
      cashoutWin: -1,
      skipRound: -1,
      multiRed: -1,
      multiBlack: -1,
      multiHigher: -1,
      multiLower: -1,
    };

    protected unpack(): void {
      if (this.getError() != 0) {
        return;
      }
      this.data.betAmount = this.getDouble();
      this.data.rateRed = this.getDouble();
      this.data.rateBlack = this.getDouble();
      this.data.rateHigher = this.getDouble();
      this.data.rateLower = this.getDouble();
      this.data.currentCardId = this.getInt();
      this.data.currentUserMoney = this.getDouble();
      this.data.currentCardRemain = this.getInt();
      this.data.cashoutWin = this.getDouble();
      this.data.skipRound = this.getInt();
      this.data.multiRed = this.getDouble();
      this.data.multiBlack = this.getDouble();
      this.data.multiHigher = this.getDouble();
      this.data.multiLower = this.getDouble();
    }
  }

  //5004
  export class ReceiveRoundResult extends BGUI.BaseInPacket {
    public data: ImpData = {
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
      cashoutWin: -1,
      multiRed: -1,
      multiBlack: -1,
      multiHigher: -1,
      multiLower: -1,
    };

    protected unpack(): void {
      if (this.getError() != 0) {
        return;
      }

      this.data.betAmount = this.getDouble();
      this.data.rateRed = this.getDouble();
      this.data.rateBlack = this.getDouble();
      this.data.rateHigher = this.getDouble();
      this.data.rateLower = this.getDouble();
      this.data.currentCardId = this.getInt();
      this.data.currentCardRemain = this.getInt();
      this.data.nextCardDrawId = this.getInt();
      this.data.isEndGame = this.getBool();
      this.data.currentUserMoney = this.getDouble();
      this.data.skipRound = this.getInt();
      this.data.cashoutWin = this.getDouble();
      this.data.multiRed = this.getDouble();
      this.data.multiBlack = this.getDouble();
      this.data.multiHigher = this.getDouble();
      this.data.multiLower = this.getDouble();
    }
  }

  //5005
  export class ReceiveTime extends BGUI.BaseInPacket {
    public err: number = -1;
    public time: number = -1;

    protected unpack(): void {
      this.err = this.getError();
      if (this.err !== 0) {
        return;
      }

      this.time = this.getInt();
    }
  }

  //5006
  export class ReceiveSkipError extends BGUI.BaseInPacket {
    public err: number = -1;

    protected unpack(): void {
      this.err = this.getError();
    }
  }

  //5007
  export class ReceiveCashOut extends BGUI.BaseInPacket {
    public symbol: string;
    public currentMoney: number;
    public winMoney: number;

    protected unpack(): void {
      this.symbol = this.getString();
      this.currentMoney = this.getDouble();
      this.winMoney = this.getDouble();
    }
  }

  //5008
  export class ReceiveHistory extends BGUI.BaseInPacket {
    public listSize: number = -1;
    public list: ImpHistory[] = [];

    protected unpack(): void {
      if (this.getError() != 0) {
        return;
      }

      this.listSize = this.getShort();
      for (let i = 0; i < this.listSize; i++) {
        let history: ImpHistory = {
          cardID: this.getInt(),
          /***
           * 0: RED
           * 1: BLACK
           * 2: HIGHER
           * 3: LOWER
           */
          typeSelected: this.getByte(),
          multiple: this.getDouble(),
          /***
           * 0: START
           * 1: WIN
           * 2: LOSE
           */
          type: this.getInt(),
        };
        this.list.push(history);
      }
    }
  }

  //5009
  export class receiveConfirmJoinRoom extends BGUI.BaseInPacket {
    protected unpack(): void {}
  }

  //5015
  export class receiveWinNoti extends BGUI.BaseInPacket {
    public userName: string = "";
    public winAmount: number = -1;
    public wallet: string = "";

    protected unpack(): void {
      if (this.getError() != 0) {
        return;
      }

      this.userName = this.getString();
      this.winAmount = this.getDouble();
      this.wallet = this.getString();
      
    }
  }

  export class Send {
    //5001
    public static sendCheckGame() {
      let pk = new SendCheckGame();
      Connector.instance.sendPacket(pk);
    }

    //5004
    public static sendBet(type: number) {
      let pk = new SendBet();
      pk.type = type;
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
    public static confirmJoinRoom(wallet: string, betAmount: string) {
      let pk = new ConfirmJoinRoom();
      pk.wallet = wallet;
      pk.betAmount = betAmount;
      cc.error("confirm join room", pk);
      Connector.instance.sendPacket(pk);
    }
  }

  //5001
  export class SendCheckGame extends BGUI.BaseOutPacket {
    getCmdId(): number {
      return Cmd.CMD_CHECK_GAME;
    }
    putData(): void {}
  }

  //5004
  export class SendBet extends BGUI.BaseOutPacket {
    public type: number;
    getCmdId(): number {
      return Cmd.CMD_ROUND_RESULT;
    }
    putData(): void {
      this.putByte(this.type);
    }
  }

  //5006
  export class SkipBet extends BGUI.BaseOutPacket {
    getCmdId(): number {
      return Cmd.CMD_SKIP_BET;
    }
    putData(): void {}
  }

  //5007
  export class CashOut extends BGUI.BaseOutPacket {
    getCmdId(): number {
      return Cmd.CMD_CASH_OUT;
    }
    putData(): void {}
  }

  //5009
  export class ConfirmJoinRoom extends BGUI.BaseOutPacket {
    public wallet: string;
    public betAmount: string;
    getCmdId(): number {
      return Cmd.CMD_CONFIRM_JOIN_ROOM;
    }
    putData(): void {
      this.putString(this.wallet);
      this.putString(this.betAmount);
    }
  }
}
