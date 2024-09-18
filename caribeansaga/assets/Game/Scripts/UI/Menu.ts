import AudioController, { SOUND_TYPE } from "../Controller/AudioController";
import GameController from "../Controller/GameController";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

  @property(cc.Node)
  private btnMute: cc.Node = null;

  @property(cc.SpriteFrame)
  private muteSF: cc.SpriteFrame[] = [];

  /////////////////////////////////////////

  protected onLoad(): void {
    this.updateMute(AudioController.Instance.getAudioStatus());
  }

  public open(){
    this.node.active = true;
  }

  private onClickClose() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = false;
  }

  private onClickRules() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = false;
    GameController.Instance.getRules().onClickOpen();
  }

  private onClickMute() {
    AudioController.Instance.setAudioStatus();
    this.updateMute(AudioController.Instance.getAudioStatus());
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);
  }

  private updateMute(status: boolean) {
    if (status) {
      this.btnMute.children[0].getComponent(cc.Sprite).spriteFrame = this.muteSF[0];
      this.btnMute.children[1].active = true;
    } else {
      this.btnMute.children[0].getComponent(cc.Sprite).spriteFrame = this.muteSF[1];
      this.btnMute.children[1].active = false;
    }
  }
}
