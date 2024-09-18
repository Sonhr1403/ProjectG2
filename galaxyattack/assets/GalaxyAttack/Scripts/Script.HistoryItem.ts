// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Cmd } from "./Script.Cmd";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HistoryItem extends cc.Component {
  @property(cc.Sprite)
  public bg: cc.Sprite = null;

  @property(cc.Sprite)
  public icon: cc.Sprite = null;

  @property(cc.Label)
  public card_num: cc.Label = null;

  @property(cc.Label)
  public multi_num: cc.Label = null;

  @property(cc.Sprite)
  public result: cc.Sprite = null;

  @property(cc.SpriteFrame)
  public bgSF: cc.SpriteFrame[] = []; 

  @property(cc.SpriteFrame)
  public iconSF: cc.SpriteFrame[] = [];

  @property(cc.SpriteFrame)
  public resultSF: cc.SpriteFrame[] = [];

  // LIFE-CYCLE CALLBACKS:

  public createItem(item: Cmd.ImpHistory){
    this.bg.spriteFrame = item.type === 2 ? this.bgSF[1] : this.bgSF[0];

    if (item.cardID >= 0 && item.cardID < 13) {
            this.icon.spriteFrame = this.iconSF[0];
    }
    if (item.cardID >= 13 && item.cardID < 26) {
            this.icon.spriteFrame = this.iconSF[1];
    }
    if (item.cardID >= 26 && item.cardID < 39) {
            this.icon.spriteFrame = this.iconSF[2];
    }
    if (item.cardID >= 39 && item.cardID < 52) {
            this.icon.spriteFrame = this.iconSF[3];
    }

    switch (item.cardID) {
        case 0:
        case 13:
        case 26:
        case 39:
            this.card_num.string = "2";
            break;
    
        case 1:
        case 14:
        case 27:
        case 40:
            this.card_num.string = "3";
            break;
    
        case 2:
        case 15:
        case 28:
        case 41:
            this.card_num.string = "4";
            break;
    
        case 3:
        case 16:
        case 29:
        case 42:
            this.card_num.string = "5";
            break;
    
        case 4:
        case 17:
        case 30:
        case 43:
            this.card_num.string = "6";
            break;
    
        case 5:
        case 18:
        case 31:
        case 44:
            this.card_num.string = "7";
            break;
    
        case 6:
        case 19:
        case 32:
        case 45:
            this.card_num.string = "8";
            break;
    
        case 7:
        case 20:
        case 33:
        case 46:
            this.card_num.string = "9";
            break;
    
        case 8:
        case 21:
        case 34:
        case 47:
            this.card_num.string = "10";
            break;
    
        case 9:
        case 22:
        case 35:
        case 48:
            this.card_num.string = "J";
            break;
    
        case 10:
        case 23:
        case 36:
        case 49:
            this.card_num.string = "Q";
            break;
    
        case 11:
        case 24:
        case 37:
        case 50:
            this.card_num.string = "K";
            break;
    
        case 12:
        case 25:
        case 38:
        case 51:
            this.card_num.string = "A";
            break;
    
    }

    if (item.cardID < 13 || item.cardID >= 39 ) {
        this.card_num.node.color = new cc.Color(0,0,0);
    } else {
        this.card_num.node.color = new cc.Color(226,0,0);
    }

    switch (item.multiple) {
        case 0:
            this.multi_num.string = "START";
            break;
    
        case -5:
            this.multi_num.string = "SKIP";
            break;
    
        default:
            this.multi_num.string = item.multiple.toString();
            break;
    }

    this.result.spriteFrame = item.typeSelected === -1 ? null : this.resultSF[item.typeSelected];
  }
}
