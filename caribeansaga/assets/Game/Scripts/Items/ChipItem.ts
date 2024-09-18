import GameController from "../Controller/GameController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChipItem extends cc.Component {
  @property(cc.Label)
  private label: cc.Label = null;

  @property(cc.Sprite)
  private bg: cc.Sprite = null;

  ////////////////////////////////////////////////

  private index: number = -1;

  // LIFE-CYCLE CALLBACKS:

  public createOnClickItem(i: number, amount: number) {
    this.index = i;
    let r = i % 5;
    this.bg.spriteFrame = GameController.Instance.listChipsSF[r];
    this.label.string = amount.toString();
    this.node.getComponent(cc.Button).interactable = true;
  }

  public createShowItem(
    isPlayer: boolean,
    amount: number = 0,
    pocket: cc.Node
  ) {
    this.node.getComponent(cc.Button).interactable = false;
    let listChipsSF = GameController.Instance.listChipsSF;
    this.bg.spriteFrame = isPlayer ? listChipsSF[6] : listChipsSF[5];
    this.label.string = isPlayer ? amount.toString() : "";
    this.node.scale = isPlayer ? 0.5 : 0.4;
    let containerSize = pocket.getContentSize();
    let margin = 20;
    let randomX =
      Math.random() *
        (containerSize.width -
          this.node.width * this.node.scaleX -
          2 * margin) -
      (containerSize.width / 2 -
        (this.node.width * this.node.scaleX) / 2 -
        margin);
    let randomY =
      Math.random() *
        (containerSize.height -
          this.node.height * this.node.scaleY -
          2 * margin) -
      (containerSize.height / 2 -
        (this.node.height * this.node.scaleY) / 2 -
        margin);
    this.node.setPosition(cc.v2(randomX, randomY));
  }

  private onClickChangeChip() {
    GameController.Instance.getFootBar().updateCurrentChip(
      this.index,
      this.index % 5
    );
    GameController.Instance.getFootBar().onClickChangeChip();
  }
}
