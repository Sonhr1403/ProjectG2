
const {ccclass, property} = cc._decorator;

@ccclass
export default class PinLine extends cc.Component {

    @property(cc.Prefab)
    private prfPin: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    public createPin(size: number, spacing: number, scale: number){
        this.node.removeAllChildren();
        for (let i = 0; i < size; i++) {
            let pin = cc.instantiate(this.prfPin);
            pin.scale = scale;
            this.node.addChild(pin)
        }
        this.node.getComponent(cc.Layout).spacingX = spacing;
    }
}
