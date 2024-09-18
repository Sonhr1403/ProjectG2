import AudioManager, { SOUND_TYPE } from "./Script.Audio";
import { Cmd } from "./Script.Cmd";
import Common from "./Script.Common";
import Controller from "./Script.Controller";
import HeadBar from "./Script.HeadBar";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Monster extends cc.Component {
  @property(cc.Node)
  private listTarget: cc.Node[] = [];

  @property(cc.SpriteFrame)
  private listSF: cc.SpriteFrame[] = [];

  //////////////////////////////////////////

  private listClicked: number[] = [];

  // LIFE-CYCLE CALLBACKS:

  public onRandom() {
    let id = 0;
    switch(Controller.instance.currentMonster){
      case 0:
        id = Common.getRandomNumber(0, 7);
        break
      
      case 1:
        id = Common.getRandomNumber(0, 9);
        break

      case 2:
        id = Common.getRandomNumber(0, 11);
        break

    }
    if(!this.listClicked.find((element) => element === id)){
      this.onClickTarget("", id.toString());
    } else {
      this.onRandom();
    }
  }

  private onClickTarget(event, id: string) {
    AudioManager.instance.playSound(SOUND_TYPE.SHOOT);

    let num = parseInt(id);
    this.listClicked.push(num);
    Controller.instance.playAnim(num);
    Controller.instance.currentTarget = num;
    this.targetUninteractable();
    Cmd.Send.sendBet(Controller.instance.localRes5004.level, num);
  }

  public turnTarget(win: boolean, id: number, rate: number) {
    if (win) {
      this.listTarget[id].children[0].active = false;
      this.listTarget[id].children[1].active = true;
      this.listTarget[id].children[1].getComponent(cc.Sprite).spriteFrame =
        this.listSF[0];
      this.listTarget[id].children[1].width = 49;
      this.listTarget[id].children[1].height = 44;
      this.listTarget[id].children[1].children[0].getComponent(
        cc.Label
      ).string = rate.toFixed(HeadBar.instance.getFixedNum());
    } else {
      this.listTarget[id].children[0].active = false;
      this.listTarget[id].children[1].active = true;
      this.listTarget[id].children[1].getComponent(cc.Sprite).spriteFrame =
        this.listSF[1];
      this.listTarget[id].children[1].width = 35;
      this.listTarget[id].children[1].height = 30;
      this.listTarget[id].children[1].children[0].getComponent(
        cc.Label
      ).string = "";
    }
  }

  private targetUninteractable(){
    this.listTarget.forEach((target)=>{
      target.getComponent(cc.Button).interactable = false;
    })
  }

  public targetInteractable(){
    for (let i = 0; i < this.listTarget.length; i++) {
      if(!this.listClicked.find((element)=> element === i)){
        this.listTarget[i].getComponent(cc.Button).interactable = true;
      }
    }
  }
}
