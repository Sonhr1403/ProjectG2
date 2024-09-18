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
    const canvas = cc.view.getVisibleSize();
    const parentWidth = this.node.parent.width;
    const canvasHeight = canvas.height;
    const ratioWidth = parentWidth/this.width;
    const ratioHeight = canvasHeight/this.height;
    this.node.scaleX = ratioWidth;
    this.node.scaleY = ratioHeight;
  }
}
