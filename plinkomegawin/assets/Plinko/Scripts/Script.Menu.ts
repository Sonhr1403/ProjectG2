import AudioManager, { SOUND_TYPE } from "./Script.Audio";
import Controller from "./Script.Controller";
import Rules from "./Script.Rules";
import Tutorial from "./Script.Tutorial";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Menu extends cc.Component {
  public static instance: Menu = null;

  @property(cc.Node)
  private btnMute: cc.Node = null;

  @property(cc.SpriteFrame)
  private muteSF: cc.SpriteFrame[] = [];

  /////////////////////////////////////////

  protected onLoad(): void {
    Menu.instance = this;
    this.updateMute(AudioManager.instance.getAudioStatus());
  }

  public open(){
    this.node.active = true;
  }

  private onClickClose() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = false;
  }

  private onClickRules() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = false;
    Rules.instance.onClickOpen();
  }

  private onClickTutorial() {
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = false;
    Tutorial.instance.onClickOpen();
  }

  private onClickMute() {
    AudioManager.instance.setAudioStatus();
    this.updateMute(AudioManager.instance.getAudioStatus());
    AudioManager.instance.playSound(SOUND_TYPE.CLICK);
  }

  private updateMute(status: boolean) {
    if (status) {
      this.btnMute.children[0].getComponent(cc.Sprite).spriteFrame = this.muteSF[0];
    } else {
      this.btnMute.children[0].getComponent(cc.Sprite).spriteFrame = this.muteSF[1];
    }
  }
}
