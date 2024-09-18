import TableItem, { TABLE_ITEM_STATES } from "../Items/TableItem";
import Betting from "./Betting";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {
  @property(Betting) private betting: Betting = null;

  /////////////////////////////////////////////////////

  /////////////////////////////////////////////////////

  /////////////////////////////////////////////////////

  public getBetting(){
    return this.betting;
  }

  public initNewGame() {}
}
