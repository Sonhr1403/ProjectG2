import AudioController, { SOUND_TYPE } from "../Controller/AudioController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tutorial extends cc.Component {
  public static instance: Tutorial = null;

  @property(cc.Node)
  private listPages: cc.Node[] = [];

  @property(cc.Node)
  private listBtns: cc.Node[] = [];

  /////////////////////////////////////////

  private pageWidth: number = 0;

  private currentPage: number = 0;

  private listX: number[] = [];

  ///////////////////////////////////////////

  protected onLoad(): void {
    Tutorial.instance = this;
  }

  protected start(): void {

  }

  public onClickOpen() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = true;

    this.pageWidth = this.node.parent.width;
    this.listX = [-this.pageWidth, 0, this.pageWidth];
    this.listPages.forEach((page) => {
      page.width = this.pageWidth;
    });

    this.listPages[0].x = this.listX[1];
    this.listPages[0].opacity = 255;
    for (let i = 1; i < this.listPages.length; i++) {
      this.listPages[i].x = this.listX[2];
      this.listPages[i].opacity = 0;
    }
    this.currentPage = 0;
    this.updateBtn();
  }

  private onClickClose() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    this.node.active = false;
  }

  private onClickLeft() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    this.enableBtn(false);

    cc.tween(this.listPages[this.currentPage])
      .to(0.25, { position: cc.v3(this.listX[2], 0, 0) }, { easing: "" })
      .call(() => {
        this.listPages[this.currentPage + 1].opacity = 0;
      })
      .start();

    this.currentPage -= 1;

    this.listPages[this.currentPage].opacity = 255;
    cc.tween(this.listPages[this.currentPage])
      .to(0.25, { position: cc.v3(this.listX[1], 0, 0) }, { easing: "" })
      .call(() => {
        this.enableBtn(true);
        this.updateBtn();
      })
      .start();
  }

  private onClickRight() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    this.enableBtn(false);

    cc.tween(this.listPages[this.currentPage])
      .to(0.25, { position: cc.v3(this.listX[0], 0, 0) }, { easing: "" })
      .call(() => {
        this.listPages[this.currentPage - 1].opacity = 0;
      })
      .start();

    this.currentPage += 1;

    this.listPages[this.currentPage].opacity = 255;
    cc.tween(this.listPages[this.currentPage])
      .to(0.25, { position: cc.v3(this.listX[1], 0, 0) }, { easing: "" })
      .call(() => {
        this.enableBtn(true);
        this.updateBtn();
      })
      .start();
  }

  private enableBtn(enabled: boolean) {
    this.listBtns.forEach((element) => {
      element.getComponent(cc.Button).interactable = enabled;
    });
  }

  private updateBtn() {
    switch (this.currentPage) {
      case 0:
        this.listBtns[0].opacity = 150;
        this.listBtns[0].getComponent(cc.Button).interactable = false;
        this.listBtns[1].opacity = 255;
        this.listBtns[1].getComponent(cc.Button).interactable = true;
        break;

      case 7:
        this.listBtns[0].opacity = 255;
        this.listBtns[0].getComponent(cc.Button).interactable = true;
        this.listBtns[1].opacity = 150;
        this.listBtns[1].getComponent(cc.Button).interactable = false;
        break;

      default:
        this.listBtns[0].opacity = 255;
        this.listBtns[0].getComponent(cc.Button).interactable = true;
        this.listBtns[1].opacity = 255;
        this.listBtns[1].getComponent(cc.Button).interactable = true;
        break;
    }
  }

}
