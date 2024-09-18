import GameController from "../Controller/GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Lose extends cc.Component {
  @property(cc.Node)
  private net: cc.Node = null;

  @property(cc.Node)
  private spider: cc.Node = null;

  @property(cc.Node)
  private body: cc.Node = null;

  @property(cc.Node)
  private head: cc.Node = null;

  ///////////////////////////////////////////////////

  private bodySwitched: boolean = false;

  ///////////////////////////////////////////////////

  // LIFE-CYCLE CALLBACKS:

  public startAnim() {
    this.node.active = true;
    cc.tween(this.net)
      .to(0.25, { scale: 2.5 })
      .call(() => {
        cc.tween(this.spider)
          .to(0.25, { y: 0 })
          .call(() => {
            this.headAnim();
          })
          .start();
        this.schedule(this.bodyAnim, 0.1, cc.macro.REPEAT_FOREVER);
      })
      .start();
  }

  private bodyAnim() {
    if (this.bodySwitched) {
      this.body.x = -682;
    } else {
      this.body.x = -192;
    }

    this.bodySwitched = !this.bodySwitched;
  }

  private headAnim() {
    cc.tween(this.head)
      .to(0.25, { rotation: 45 })
      .call(() => {
        cc.tween(this.head)
          .to(0.5, { rotation: -45 })
          .call(() => {
            cc.tween(this.head)
              .to(0.25, { rotation: 0 })
              .call(() => {
                cc.tween(this.head)
                  .to(0.25, { y: -50 })
                  .call(() => {
                    this.scheduleOnce(() => {
                      cc.tween(this.spider)
                        .to(0.25, { y: 1000 })
                        .call(() => {
                          cc.tween(this.net)
                            .to(0.25, { scale: 0 })
                            .call(() => {
                              this.head.y = -20;
                              this.unschedule(this.bodyAnim);
                              this.node.active = false;
                              GameController.Instance.initNewGame();
                            })
                            .start();
                        })
                        .start();
                    }, 1);
                  })
                  .start();
              })
              .start();
          })
          .start();
      })
      .start();
  }
}
