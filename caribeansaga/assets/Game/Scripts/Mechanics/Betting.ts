import Table from "../UI/Table";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Betting extends cc.Component {
  @property(Table) private table: Table = null;

  @property(cc.Label) private onlineNum: cc.Label = null;

  // LIFE-CYCLE CALLBACKS:

  public getTable() {
    return this.table;
  }

  public updateOnlineNum(num: number) {
    this.onlineNum.string = num.toString();
  }
}
