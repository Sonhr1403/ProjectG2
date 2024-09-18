import AudioManager, { SOUND_TYPE } from "./Script.Audio";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rules extends cc.Component {
  public static instance = null;

  @property(cc.Node)
  private listContents: cc.Node[] = [];

  @property(cc.Label)
  private visibleSize: cc.Label = null;

  /////////////////////////////////////////

  private currentRule: number = -1;

  ///////////////////////////////////////////

  protected onLoad(): void {
    Rules.instance = this;
    this.updateSize();
  }

  private onClickToogle(event, id: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    let num = parseInt(id);
    if (num !== this.currentRule) {
      if (this.currentRule !== -1) {
        this.listContents[this.currentRule].active = false;
      }
      this.currentRule = num;
      this.listContents[this.currentRule].active = true;
    } else {
      this.listContents[this.currentRule].active = false;
      this.currentRule = -1;
    }
  }

  private onClickClose() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = false;
  }

  public onClickOpen() {
    this.node.active = true;
  }

  private updateSize() {
    // let visibleSize = cc.view.getVisibleSize();
    this.visibleSize.string =
      this.node.parent.scale.toFixed(1) + " " + cc.sys.os;
  }
}
