import { Send } from "../Connection/Send";
import GameController from "../Controller/GameController";
import ChipItem from "../Items/ChipItem";

const { ccclass, property } = cc._decorator;

const RLT_DOOR_CONFIG = cc.Enum({
  T_0: 0,
  T_1: 1,
  T_2: 2,
  T_3: 3,
  T_4: 4,
  T_5: 5,
  T_6: 6,
  T_7: 7,
  T_8: 8,
  T_9: 9,
  T_10: 10,
  T_11: 11,
  T_12: 12,
  RED: 13,
  BLACK: 14,
  T_1_TO_6: 15,
  T_7_TO_12: 16,
  T0_1: 17,
  T0_2: 18,
  T0_3: 19,
  T1_2: 20,
  T1_4: 21,
  T2_3: 22,
  T2_5: 23,
  T3_6: 24,
  T4_5: 25,
  T4_7: 26,
  T5_6: 27,
  T5_8: 28,
  T6_9: 29,
  T7_8: 30,
  T7_10: 31,
  T8_9: 32,
  T8_11: 33,
  T9_12: 34,
  T10_11: 35,
  T11_12: 36,
  T0_1_2: 37,
  T0_2_3: 38,
  T1_2_4_5: 39,
  T2_3_5_6: 40,
  T4_5_7_8: 41,
  T5_6_8_9: 42,
  T7_8_10_11: 43,
  T8_9_11_12: 44,
});

@ccclass
export default class Door extends cc.Component {
  @property({ type: RLT_DOOR_CONFIG })
  private id: number = 0;

  @property(cc.Node)
  private pocket: cc.Node = null;

  // LIFE-CYCLE CALLBACKS:

  private onClickedChoose() {
    let ctrl = GameController.Instance;
    // if (
    //   ctrl.getHeadBar().getCurrentBalance() >
    //   ctrl.getGamePlay().getBetting().getTable().getPlayerSum() +
    //     ctrl.getFootBar().getStake()
    // ) {
      let chip = cc.instantiate(ctrl.chipItem);
      chip
        .getComponent(ChipItem)
        .createShowItem(true, ctrl.getFootBar().getStake(), this.pocket);
      this.pocket.addChild(chip);
    // } else {
    // }
  }
}
