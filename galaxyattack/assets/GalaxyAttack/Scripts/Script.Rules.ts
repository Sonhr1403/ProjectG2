import AudioManager, { SOUND_TYPE } from "./Script.Audio";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rules extends cc.Component {
  public static instance = null;
  @property(cc.Node)
  private listContents: cc.Node[] = [];

  /////////////////////////////////////////

  private currentRule: number = 0;

  ///////////////////////////////////////////

  protected onLoad(): void {
      Rules.instance = this;
  }

  private onClickToogle(event, id: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    let num = parseInt(id);
    if(num !== this.currentRule ){
      if (this.currentRule >= 0) {
        this.listContents[this.currentRule].active = false;
      }
      this.currentRule = num;
      this.listContents[this.currentRule].active = true;
    } else {
      this.listContents[this.currentRule].active = !this.listContents[this.currentRule].active;
    }
  }

  private onClickClose() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = false;
  }

  public onClickOpen(){
    this.node.active = true;
  }
}
