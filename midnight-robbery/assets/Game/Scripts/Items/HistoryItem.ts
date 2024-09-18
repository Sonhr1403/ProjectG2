import { ImpHistory } from "../Connection/Receive";
import GameController from "../Controller/GameController";
import HeadBar from "../UI/HeadBar";

const { ccclass, property } = cc._decorator;

export enum HISTORY_ITEM_STATES {
  INIT = 0,
  WIN = 1,
  LOSE = 2,
}

@ccclass
export default class HistoryItem extends cc.Component {
    
  @property(cc.Label)
  public num: cc.Label = null;

  // LIFE-CYCLE CALLBACKS:

  public createItem(state: number, win?: number) {
    switch (state) {
      case HISTORY_ITEM_STATES.INIT:
        this.node.getComponent(cc.Animation).play("history_item").repeatCount =
          cc.macro.REPEAT_FOREVER;
        this.num.string = "1";
        this.num.node.color = cc.color(255, 255, 255);
        break;

      case HISTORY_ITEM_STATES.WIN:
        this.node.color = cc.color(229, 200, 7);
        this.num.string = win.toFixed(
          GameController.Instance.getHeadBar().getFixedNum()
        );
        this.num.node.color = cc.color(255, 255, 255);
        break;

      case HISTORY_ITEM_STATES.LOSE:
        this.node.color = cc.color(136, 136, 136);
        this.num.string = "0";
        this.num.node.color = cc.color(0, 0, 0);
        break;
    }
  }
}
