
const { ccclass, property } = cc._decorator;

@ccclass
export default class SpineUtils extends cc.Component {
  @property({ type: cc.Integer })
  public _width = -1;

  @property({ type: cc.Integer })
  get width(): number {
    return this._width;
  }

  set width(newNumber: number) {
    this._width = newNumber;
  }

  @property({ type: cc.Integer })
  public _height = -1;

  @property({ type: cc.Integer })
  get height(): number {
    return this._height;
  }

  set height(newNumber: number) {
    this._height = newNumber;
  }
  ///////////////////////////////////////////////////////////

  protected onLoad(): void {
    this.updateSize();
    cc.view.setResizeCallback(() => {
      this.updateSize();
    });
  }

  private updateSize() {
    const ratioWidth = this.node.parent.width/this.width;
    if (ratioWidth * this.height * this.node.parent.parent.scaleY >= cc.view.getVisibleSize().height) {
      this.node.scale = ratioWidth;
      this.node.y = -this.height*ratioWidth/2;
    } else {
      let ratioHeight = cc.view.getVisibleSize().height/this.node.parent.parent.scale/this.height;
      this.node.scale = ratioHeight;
      this.node.y = -this.height*ratioHeight/2;
    }
  }
}
