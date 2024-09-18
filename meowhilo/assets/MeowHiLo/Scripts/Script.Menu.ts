import AudioManager, { SOUND_TYPE } from "./Script.Audio";
import Controller from "./Script.Controller";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Menu extends cc.Component {
  public static instance: Menu = null;

  protected onLoad(): void {
    Menu.instance = this;
  }

  private onClickClose() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = false;
  }

  private onClickRules() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    Controller.instance.rulesActive();
  }

  private onClickTutorial() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    Controller.instance.tutorialActive();
  }
}
