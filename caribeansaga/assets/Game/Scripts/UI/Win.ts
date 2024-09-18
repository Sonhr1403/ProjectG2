import AudioController, { SOUND_TYPE } from "../Controller/AudioController";
import GameController from "../Controller/GameController";

const { ccclass, property } = cc._decorator;

export enum WIN_LEVEL {
  WIN = 0,
  BIG_WIN = 1,
  PERFECT_WIN = 2,
}

@ccclass
export default class Win extends cc.Component {
  @property(cc.Sprite)
  private iconWon: cc.Sprite = null;

  @property(cc.SpriteFrame)
  private listSFWon: cc.SpriteFrame[] = [];

  @property(cc.Label)
  private winNum: cc.Label = null;

  @property(cc.Label)
  private multiNum: cc.Label = null;

  // LIFE-CYCLE CALLBACKS:

  public openWin(lvl: number, win: number, multi: number) {
    this.node.active = true;
    AudioController.Instance.playSound(SOUND_TYPE.WIN);

    this.iconWon.spriteFrame = this.listSFWon[lvl];
    this.winNum.string = win.toFixed(
      GameController.Instance.getHeadBar().getFixedNum()
    );
    this.multiNum.string = multi.toFixed(2) + "x";

    this.scheduleOnce(() => {
      this.node.active = false;
      GameController.Instance.initNewGame();
    }, 3);
  }
}
