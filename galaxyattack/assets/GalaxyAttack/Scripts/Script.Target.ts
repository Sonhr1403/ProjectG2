
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    private target: cc.Node = null;

    private count: number = -1;

    private goUp: boolean = true;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.schedule(this.runAnim, 0.025, cc.macro.REPEAT_FOREVER);
    }

    private runAnim(){
        this.target.x = this.count * 156;
        if(this.goUp){
            this.count -= 1;
        } else {
            this.count += 1
        }
        if(this.count === -16) {
            this.goUp = false;
        }
        if(this.count === 0){
            this.goUp = true;
        }
    }
}
