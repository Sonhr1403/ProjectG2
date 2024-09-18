const { ccclass, property } = cc._decorator;

export interface ImpData {
  betAmount: number;
  isEndGame: boolean;
  currentUserMoney: number;
  mine: number;
  currentHp: number;
  currentPayOut: number;
  nextPayOut: number;
  rate?: number;
  level: number;
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

export namespace Receive {
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
  export class GameInfo extends BGUI.BaseInPacket {
    public data: ImpData = {
      betAmount: -1,
      isEndGame: false,
      currentUserMoney: -1,
      mine: -1,
      currentHp: -1,
      currentPayOut: -1,
      nextPayOut: -1,
      level: -1,
    };

    public size: number = -1;
    public listPayOut: Array<number> = [];

    protected unpack(): void {
      let err = this.getError();
      if (err === 0) {
        this.data.level = this.getInt();
        this.data.betAmount = this.getDouble();
        this.data.isEndGame = this.getBool();
        this.data.currentUserMoney = this.getDouble();
        this.data.mine = this.getInt();
        this.data.currentHp = this.getInt();
        this.data.currentPayOut = this.getDouble();
        this.data.nextPayOut = this.getDouble();
        this.size = this.getShort();
        for (let i = 0; i < this.size; i++) {
          this.listPayOut.push(this.getDouble());
        }
      }
    }
  }

  //5004
  export class RoundResult extends BGUI.BaseInPacket {
    public data: ImpData = {
      betAmount: -1,
      isEndGame: false,
      currentUserMoney: -1,
      mine: -1,
      currentHp: -1,
      currentPayOut: -1,
      nextPayOut: -1,
      rate: -1,
      level: -1,
    };

    protected unpack(): void {
      if (this.getError() != 0) {
        return;
      }

      this.data.betAmount = this.getDouble();
      this.data.isEndGame = this.getBool();
      this.data.currentUserMoney = this.getDouble();
      this.data.mine = this.getInt();
      this.data.currentHp = this.getInt();
      this.data.currentPayOut = this.getDouble();
      this.data.nextPayOut = this.getDouble();
      this.data.rate = this.getDouble();
      this.data.level = this.getInt();
    }
  }

  //5005
  export class Time extends BGUI.BaseInPacket {
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
  export class SkipError extends BGUI.BaseInPacket {
    public err: number = -1;

    protected unpack(): void {
      this.err = this.getError();
    }
  }

  //5007
  export class CashOut extends BGUI.BaseInPacket {
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
  export class History extends BGUI.BaseInPacket {
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
  export class ConfirmJoinRoom extends BGUI.BaseInPacket {
    protected unpack(): void {}
  }

  //5015
  export class WinNoti extends BGUI.BaseInPacket {
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
}
