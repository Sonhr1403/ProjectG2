import { Send } from "../Connection/Send";
import AudioController, { SOUND_TYPE } from "../Controller/AudioController";
import GameController from "../Controller/GameController";
import { FOOTBAR_MODE } from "../UI/FootBar";

const { ccclass, property } = cc._decorator;

export enum TABLE_ITEM_STATES {
  INIT = 0,
  START = 1,
  OPEN_CANDY = 2,
  OPEN_SPIDER = 3,
  REVEAL_CANDY = 4,
  REVEAL_SPIDER = 5,
}

@ccclass
export default class TableItem extends cc.Component {
  @property(cc.Sprite)
  private bg: cc.Sprite = null;

  @property(cc.Sprite)
  private icon: cc.Sprite = null;

  @property(cc.SpriteFrame)
  private listBgs: cc.SpriteFrame[] = [];

  @property(cc.SpriteFrame)
  private listIcon: cc.SpriteFrame[] = [];

  ///////////////////////////////////////////////////////////////

  public index: number = -1;
  ///////////////////////////////////////////////////////////////

  public setItem(state: number) {
    switch (state) {
      case TABLE_ITEM_STATES.INIT:
        this.bg.spriteFrame = this.listBgs[0];
        this.icon.spriteFrame = null;
        this.node.getComponent(cc.Button).interactable = false;
        break;

      case TABLE_ITEM_STATES.START:
        this.bg.spriteFrame = this.listBgs[1];
        this.node.getComponent(cc.Button).interactable = true;
        break;

      case TABLE_ITEM_STATES.OPEN_CANDY:
        this.bg.spriteFrame = this.listBgs[2];
        this.icon.spriteFrame = this.listIcon[0];
        this.icon.node.width = 75;
        this.icon.node.height = 76.5;
        this.icon.node.x = -37.5;
        this.node.getComponent(cc.Button).interactable = false;
        AudioController.Instance.playSound(SOUND_TYPE.CANDY);
        break;

      case TABLE_ITEM_STATES.OPEN_SPIDER:
        this.bg.spriteFrame = this.listBgs[3];
        this.icon.spriteFrame = this.listIcon[2];
        this.icon.node.width = 1010;
        this.icon.node.height = 82;
        this.icon.node.x = -126.26;
        this.schedule(this.runAnim, 0.025, 9);
        this.scheduleOnce(() => {
          this.icon.node.x = -42;
        }, 0.3);
        this.node.getComponent(cc.Button).interactable = false;
        AudioController.Instance.playSound(SOUND_TYPE.BOMB);
        break;

      case TABLE_ITEM_STATES.REVEAL_CANDY:
        this.bg.spriteFrame = this.listBgs[4];
        this.icon.spriteFrame = this.listIcon[0];
        this.icon.node.width = 75;
        this.icon.node.height = 76.5;
        this.icon.node.x = -37.5;
        this.node.getComponent(cc.Button).interactable = false;
        break;

      case TABLE_ITEM_STATES.REVEAL_SPIDER:
        this.bg.spriteFrame = this.listBgs[4];
        this.icon.spriteFrame = this.listIcon[1];
        this.icon.node.width = 75;
        this.icon.node.height = 76.5;
        this.icon.node.x = -37.5;
        this.node.getComponent(cc.Button).interactable = false;
        break;
    }
  }

  public onClickItem() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    Send.sendBet(this.index);

    // let ran = BGUI.Utils.getRandomInt(1, 25);
    // if (ran < 24) {
    //   this.setItem(TABLE_ITEM_STATES.OPEN_CANDY);
    //   GameController.Instance.getFootBar().updateCurrentHit();
    // } else {
    //   this.setItem(TABLE_ITEM_STATES.OPEN_SPIDER);
    //   this.scheduleOnce(() => GameController.Instance.getLose().startAnim(), 1);
    //   AudioController.Instance.playSound(SOUND_TYPE.SPIDER);
    // }

    // let list = GameController.Instance.getGamePlay().listItemAlive;
    // let index = list.indexOf(this.index);
    // list.splice(index, 1);

    // GameController.Instance.getFootBar().changeMode(FOOTBAR_MODE.PLAYING);
  }

  private runAnim() {
    this.icon.node.x -= 84.17;
  }
}
