const { ccclass, property } = cc._decorator;

export enum ROULETTE_ROTATION {
  FIVE = 0,
  FOUR = 27,
  TEN = 54,
  SIX = 81,
  TWELVE = 109,
  TWO = 137,
  ZERO = 166,
  EIGHT = 194,
  SEVEN = 223,
  THREE = 251,
  ELEVEN = 279,
  ONE = 306,
  NINE = 333,
}

@ccclass
export default class Wheel extends cc.Component {
  @property(cc.Node)
  private listSpinning: cc.Node[] = [];

  @property(cc.Node)
  private wheelMask: cc.Node = null;

  @property(cc.Node)
  private pointer: cc.Node = null;

  //////////////////////////////////////////////////////////

  private initialSpeed: number = 300; // Initial rotation speed (degrees per second)

  private deceleration: number = 22.5; // Deceleration rate

  private minSpeed: number = 60; // Minimum speed before stopping

  private stopAngle: number = 0; // The angle at which the wheel will stop

  private currentSpeed: number = 0; // Current speed of rotation
  private isSpinning: boolean = false;
  private timeSinceLastPointerAnim: number = 0; // Timer to track time since last pointer animation

  // LIFE-CYCLE CALLBACKS:

  protected onLoad(): void {
    this.spinWheel(ROULETTE_ROTATION.NINE);
    this.scheduleOnce(() => {
      this.spinWheel(ROULETTE_ROTATION.ZERO);
    }, 20);
  }

  private spinWheel(stopAngle: number) {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.stopAngle = stopAngle;
    this.currentSpeed = this.initialSpeed;
    this.schedule(this.updateSpin, 0);

    this.scheduleOnce(() => {
      cc.tween(this.node).to(2, { scale: 1.8 }).start();
      cc.tween(this.node).by(2, { y: -160, x: -60 }).start();
    }, 0.5);
  }

  private updateSpin(deltaTime: number) {
    // Rotate the wheel
    this.listSpinning[2].angle += this.currentSpeed * deltaTime;
    this.listSpinning[0].angle += this.currentSpeed * deltaTime;
    this.listSpinning[1].angle -= this.currentSpeed * deltaTime;

    // Reduce the speed gradually
    if (this.currentSpeed > this.minSpeed) {
      this.currentSpeed -= this.deceleration * deltaTime;
    } else {
      // Slow down the wheel further until it stops at the target angle
      let angleDifference = this.stopAngle - (this.listSpinning[2].angle % 360);
      if (Math.abs(angleDifference) < 1) {
        this.listSpinning[2].angle = this.stopAngle;
        this.listSpinning[0].angle = this.stopAngle;
        this.listSpinning[1].angle = this.stopAngle;
        this.unschedule(this.updateSpin);
        this.isSpinning = false;
        // this.currentSpeed = this.initialSpeed;
        this.wheelMask.active = true;
      } else {
        this.currentSpeed = this.minSpeed;
      }
    }

    // Update the pointer animation frequency based on the wheel speed
    this.timeSinceLastPointerAnim += deltaTime;
    let adjustedInterval = Math.max(
      0.1,
      1 - (this.currentSpeed + 22.5) / this.initialSpeed
    ); // Adjust interval based on speed

    if (this.timeSinceLastPointerAnim >= adjustedInterval) {
      this.pointerAnim();
      this.timeSinceLastPointerAnim = 0;
    }
  }

  private pointerAnim() {
    cc.tween(this.pointer).stop();
    this.pointer.angle = 35;
    cc.tween(this.pointer).to(0.25, { angle: 0 }).start();
  }
}
