import TableItem, { TABLE_ITEM_STATES } from "../Items/TableItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {
  @property(cc.Node) public table: cc.Node = null;

  @property(cc.Prefab) private tableItem: cc.Prefab = null;

  @property(cc.Label) private candyNum: cc.Label = null;

  @property(cc.Label) private spiderNum: cc.Label = null;

  /////////////////////////////////////////////////////
  public listItemAlive: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24,
  ];
  /////////////////////////////////////////////////////

  /////////////////////////////////////////////////////

  private initTable() {
    this.table.removeAllChildren();
    for (let i = 0; i < 25; i++) {
      let item = cc.instantiate(this.tableItem);
      item.getComponent(TableItem).setItem(TABLE_ITEM_STATES.INIT);
      item.getComponent(TableItem).index = i;
      this.table.addChild(item);
    }
  }

  public startMode() {
    this.table.children.forEach((item) => {
      item.getComponent(TableItem).setItem(TABLE_ITEM_STATES.START);
    });
  }

  public initNewGame() {
    this.initTable();
    this.listItemAlive = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24,
    ];
  }

  public updateNums(mine: number){
    this.spiderNum.string = mine.toString();
    this.candyNum.string = `${25 - mine}`;
  }
}
