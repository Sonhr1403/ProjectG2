import AudioManager, { SOUND_TYPE } from "./Script.Audio";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Rules extends cc.Component {
  @property(cc.Node)
  private listContents: cc.Node[] = [];

  @property(cc.ScrollView)
  private scrollView: cc.ScrollView = null;

  /////////////////////////////////////////

  private currentRule: number = 0;

  ///////////////////////////////////////////

  private onClickToogle(event, id: string) {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.listContents[this.currentRule].active = false;
    this.currentRule = parseInt(id);
    this.listContents[this.currentRule].active = true;
    this.scrollView.content = this.listContents[this.currentRule];
  }

  private onClickClose() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = false;
  }
}
