import AudioManager, { SOUND_TYPE } from "./Script.Audio";
import Controller from "./Script.Controller";
import HeadBar from "./Script.HeadBar";

let { ccclass, property } = cc._decorator;

@ccclass
export default class Ball extends cc.Component {
  @property(cc.SpriteFrame)
  private listSF: cc.SpriteFrame[] = [];

  @property(cc.Sprite)
  private ballSpr: cc.Sprite = null;

  /////////////////////////////////////

  private gravity: number = 0.35;

  private vx: number = 0;
  private vy: number = 0;

  // 16: 0.58
  private horizontalFriction: number = 0.58;
  private verticalFriction: number = 0.6;

  private colapseX: number = 0;
  private colapseY: number = 0;

  private dropPos: number = null;

  private lvl: string = null;
  private goalId: number = null;
  private totalProfit: number = null;

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {
    // this.schedule(this.updateBall, 0.001, cc.macro.REPEAT_FOREVER);
  }

  public initBall(
    lvl: string,
    goalId: number,
    dropPos: number,
    totalMoney: number
  ) {
    this.lvl = lvl;
    this.goalId = goalId;
    this.dropPos = dropPos;
    this.node.x = dropPos;
    this.totalProfit = totalMoney;
    switch (lvl) {
      case "normal":
        this.ballSpr.spriteFrame = this.listSF[0];
        break;

      case "super":
        this.ballSpr.spriteFrame = this.listSF[1];
        break;

      case "mega":
        this.ballSpr.spriteFrame = this.listSF[2];
        break;
    }
  }

  private onBeginContact(contact, selfCollider, otherCollider) {
    if (
      selfCollider.node.name == this.node.name &&
      otherCollider.node.name == "Goal"
    ) {
      this.responseGoalContact();
      // Controller.instance.listPosTemp[otherCollider.node.zIndex].push(
      //   this.dropPos
      // );
    }

    if (
      selfCollider.node.name == this.node.name &&
      otherCollider.node.name == "Pin"
    ) {
      this.responsePinContact(selfCollider, otherCollider);
    }
  }

  private responseGoalContact() {
    this.node.removeFromParent();
    this.playGoalSound();
    Controller.instance.animGoal(this.lvl, this.goalId);
    HeadBar.instance.showWinPlus(this.totalProfit);
    Controller.instance.openWin(this.lvl, this.goalId, this.totalProfit);
    Controller.instance.interactableRow(true);
  }

  private responsePinContact(selfCollider, otherCollider) {
    const worldPosSelf = selfCollider.node.convertToWorldSpaceAR(cc.v2(0, 0));
    const worldPosOther = otherCollider.node.convertToWorldSpaceAR(cc.v2(0, 0));
    const selfParent = selfCollider.node.parent;
    const otherColliderInSelfParent =
      selfParent.convertToNodeSpaceAR(worldPosOther);
    const selfX = Math.floor(this.node.x);
    const selfY = Math.floor(this.node.y);
    const otherX = Math.floor(otherColliderInSelfParent.x);
    const otherY = Math.floor(otherColliderInSelfParent.y);

    const dist = Math.hypot(selfX - otherX, selfY - otherY);

    const selfR = selfCollider.node.getComponent(
      cc.PhysicsCircleCollider
    ).radius;
    const otherR = otherCollider.node.getComponent(
      cc.PhysicsCircleCollider
    ).radius;

    if (dist < selfR + otherR) {
      const angle = Math.atan2(selfY - otherY, selfX - otherX);

      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      this.vx = Math.cos(angle) * speed * this.horizontalFriction;
      this.vy = Math.sin(angle) * speed * this.verticalFriction;

      // Adjust position to prevent sticking
      const overlap = selfR + otherR - dist;
      this.colapseX = Math.cos(angle) * overlap;
      this.colapseY = Math.sin(angle) * overlap;
    }
  }

  private playGoalSound() {
    if (this.totalProfit > 0) {
      AudioManager.instance.playSound(SOUND_TYPE.BALL_DROP);
    } else {
      AudioManager.instance.playSound(SOUND_TYPE.BALL_DROP_GREY);
    }
  }

  protected update(): void {
    this.vy -= this.gravity;
    if (this.colapseX !== 0 || this.colapseY !== 0) {
      this.node.x += this.colapseX;
      this.node.y += this.colapseY;
      this.colapseX = 0;
      this.colapseY = 0;
    }
    this.node.x += this.vx;
    this.node.y += this.vy;
  }
}
