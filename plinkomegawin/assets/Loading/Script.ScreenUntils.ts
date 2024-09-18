// export class StretchingType {
//   static HORIZONTAL = 0;
//   static VERTICAL = 1;
//   static FULL = 2;
// }

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScreenUtils extends cc.Component {
  @property({ type: cc.Integer })
  public _width = -1;

  @property({ type: cc.Integer, range: [0, 1920], slide: true })
  get width(): number {
    return this._width;
  }

  set width(newNumber: number) {
    this._width = newNumber;
  }

  @property({ type: cc.Integer })
  public _height = -1;

  @property({ type: cc.Integer, range: [0, 1080], slide: true })
  get height(): number {
    return this._height;
  }

  set height(newNumber: number) {
    this._height = newNumber;
  }

  /////////////////////////////////////////////////////////////////////////

  protected onLoad(): void {
    this.updateSize();
    cc.view.setResizeCallback(() => {
      this.updateSize();
    });
  }

  private updateSize() {
    const visibleSize = cc.view.getVisibleSize();
    BGUI.ZLog.log("visibleSize", visibleSize);
    BGUI.ZLog.log("os", cc.sys.os);

    let ratio = visibleSize.width / visibleSize.height;
    let ratioHeight = parseFloat((visibleSize.height / 1080).toFixed(1)) - 0.1;

    if (ratio < 1) {
      if (ratio > 0.7) {
        this.node.scale = 2.3;
      } else {
        this.node.scale = ratioHeight > 3 ? 3.0 : Math.round(ratioHeight * 10) / 10;
      }
    }else {
      this.node.scale = 1;
    }
  }
}
