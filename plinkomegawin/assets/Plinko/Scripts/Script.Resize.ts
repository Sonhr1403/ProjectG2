// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Resize extends cc.Component {

    onLoad() {
        // Listen for resize events
        cc.view.on('resize', this.onResize, this);
        // Initial resize
        this.onResize();
    }

    onResize() {
        let size = this.node.parent.getContentSize();

        // Adjust the node's size to match the screen size
        this.node.width = size.width;
        this.node.height = size.width;
    }
}
