import Common from "./Script.Common";
import { Connector } from "./Script.Connector";

export namespace Cmd {
  export class CmdNum {
    static CMD_LOGIN = 1;
    static CMD_LOGOUT = 2;
    static CMD_JOINGAME = 4000;
    static CMD_EXITGAME = 4001;
    static CMD_BET = 4002;
    static CMD_RESULT = 4003;
    static CMD_WIN_NOTI = 5015;
  }

  export interface ImpWallet {
    key: string;
    value: number;
  }

  export class Send {
    public static sendBet(
      riskLevel: number,
      row: number,
      amount: number,
      numberBall: number,
      allAtOnce: boolean,
      isAuto: boolean,
      wallet: string
    ) {
      let pk = new Cmd.SendBet();
      pk.riskLevel = riskLevel;
      pk.row = row;
      pk.amount = amount;
      pk.numberBall = numberBall;
      pk.allAtOnce = allAtOnce;
      pk.isAuto = isAuto;
      pk.wallet = wallet;
      Connector.instance.sendPacket(pk);
      Common.runLog(pk);
    }

    public static sendJoinGame() {
      let pk = new Cmd.PlinkoSendJoinGame();
      Connector.instance.sendPacket(pk);
    }

    // public static sendPlinkoExitGame(username) {
    //   let pk = new PlinkoCmd.PlinkoSendExitGame();
    //   pk.userName = username
    //   Connector.instance.sendPacket(pk);
    // }
  }

  // export class PlinkoSendExitGame extends BGUI.BaseOutPacket {
  //   //4001
  //   public userName: string;

  //   getCmdId(): number {
  //     return Cmd.CMD_EXITGAME;
  //   }
  //   putData(): void {
  //     this.putString(this.userName);
  //   }
  // }

  export class PlinkoSendJoinGame extends BGUI.BaseOutPacket {
    //4000

    getCmdId(): number {
      return CmdNum.CMD_JOINGAME;
    }
    putData(): void {}
  }

  export class SendBet extends BGUI.BaseOutPacket {
    //4002
    public riskLevel: number;
    public row: number;
    public amount: number;
    public numberBall: number;
    public allAtOnce: boolean;
    public isAuto: boolean;
    public wallet: string;

    getCmdId(): number {
      return CmdNum.CMD_BET;
    }
    putData(): void {
      this.putInt(this.riskLevel);
      this.putInt(this.row);
      this.putString(this.amount);
      this.putInt(this.numberBall);
      this.putByte(this.allAtOnce);
      this.putByte(this.isAuto);
      this.putString(this.wallet);
    }
  }

  //Receive Start

  export class ReceivedLogin extends BGUI.BaseInPacket {
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

  export class ReceivedJoinGame extends BGUI.BaseInPacket {
    //4000

    public userName: string = "";
    public displayName: string = "";
    public avatar: string = "";
    public gold: number = 0;
    protected unpack(): void {
      if (this.getError() !== 0) {
        return;
      }

      this.userName = this.getString();
      this.displayName = this.getString();
      this.avatar = this.getString();
      this.gold = this.getDouble();
    }
  }

  export class ReceivedBetError extends BGUI.BaseInPacket {
    //4002
    public betAmount: number;
    protected unpack(): void {
      this.betAmount = this.getDouble();
    }
  }

  export class ReceiveBetResult extends BGUI.BaseInPacket {
    //4003
    public betSize: number = null;
    public betResults: Array<BetResults> = [];
    public betAmount: number = null;
    protected unpack(): void {
      if (this.getError() !== 0) {
        return;
      }
      this.betSize = this.getShort();
      for (let i = 0; i < this.betSize; i++) {
        let itemBet: BetResults = {
          profit: this.getDouble(),
          payout: this.getDouble(),
          currentMoney: this.getDouble(),
          risk: this.getInt(),
          totalMoney: this.getDouble(),
        };
        this.betResults.push(itemBet);
      }
      this.betAmount = this.getDouble();
    }
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

  export interface BetResults {
    profit: number;
    payout: number;
    currentMoney: number;
    risk: number;
    totalMoney: number;
  }
}
