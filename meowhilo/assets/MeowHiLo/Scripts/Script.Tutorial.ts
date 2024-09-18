import AudioManager, { SOUND_TYPE } from "./Script.Audio";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tutorial extends cc.Component {
  /////////////////////////////////////////

  ///////////////////////////////////////////

  private onClickClose() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = false;
  }
}
