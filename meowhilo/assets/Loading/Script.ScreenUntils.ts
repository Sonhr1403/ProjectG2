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
  get stretching(): number {
    return this._width;
  }

  set stretching(newNumber: number) {
    this._width = newNumber;
  }

  /////////////////////////////////////////////////////////////////////////

  protected onLoad(): void {

this.updateWidth();
    cc.view.setResizeCallback(() => {
      this.updateWidth();
    });
  }

  private updateWidth(){
    const ratio = this._width / 1080;
    const canvas = cc.view.getVisibleSize();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratioWidth = ratio * canvasHeight;
    this.node.scale = ratioWidth <= canvasWidth ? ratioWidth/this._width : canvasWidth/this._width;
  }

}
