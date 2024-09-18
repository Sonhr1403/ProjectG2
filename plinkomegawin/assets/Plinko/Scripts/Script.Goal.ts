// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Goal extends cc.Component {

    @property(cc.SpriteFrame)
    private listSf: cc.SpriteFrame[] = [];

    @property(cc.Label)
    private num: cc.Label = null;

    private t: any = null;

    private scale: number = null;

    // LIFE-CYCLE CALLBACKS:

    public createGoal(id: number, value: number, scale: number){
        this.node.getComponent(cc.Sprite).spriteFrame = this.listSf[id];
        let str = value.toString();
        this.num.string = str;
        this.scale = scale;
        this.node.scale = scale;
        if(str.length >= 4){
            this.num.fontSize = 13;
            this.num.node.y = 20;
        }
    }

    public animGoal(){
        this.node.scale = this.scale - 0.25;
        if (this.t) {
            this.node.stopAllActions();
        }
        this.t = cc.tween(this.node).to(0.5, {scale: this.scale}).start();
    }
}
