import GameController from "../Controller/GameController";
import ChipItem from "../Items/ChipItem";


const { ccclass, property } = cc._decorator;

export enum FOOTBAR_MODE {
  DISABLE = 0,
  ENABLE = 1,
  ON_REPEAT = 2,
}

@ccclass
export default class FootBar extends cc.Component {
  @property(cc.Node)
  private listBtn: cc.Node[] = [];

  @property(cc.Node)
  private chipContainer: cc.Node = null;

  @property(cc.Node)
  private scrollView: cc.Node = null;

  @property(cc.Prefab)
  private chipItem: cc.Prefab = null;

  ///////////////////////////////////////////////////

  private listBetGUSD = [1, 2, 3, 5, 10, 20, 50, 100];
  private listBetUSDT = [1, 2, 3, 5, 10, 20, 50, 100];
  private listBetTRX = [1, 2, 3, 5, 10, 20, 50, 100];
  private listBetTON = [0.1, 0.2, 0.5, 1.0, 2.0, 3.0, 5.0, 10.0];
  private listBetBTC = [
    0.00001, 0.00002, 0.00005, 0.0001, 0.0002, 0.0005, 0.001, 0.002,
  ];
  private listBetBNB = [
    0.00175, 0.0035, 0.00525, 0.00875, 0.0175, 0.035, 0.0875, 0.175,
  ];
  private listBetMATIC = [1.78, 3.56, 5.34, 8.9, 17.8, 35.6, 89.0, 178.0];

  private listBet = [];

  private currentChip: number = 0;

  onLoad() {
    this.listBet = this.listBetGUSD;
    this.updateCurrentChip(0, 0)
    this.createChips();
  }

  private onClickConfirm() {
    // if (HeadBar.instance.getCurrentBalance() >= this.getStake()) {
    // Send.confirmJoinRoom(GameController.Instance, HeadBar.instance.getCurrentWallet(), parseFloat(this.getStake()).toString());
    // } else {
    //   GameController.Instance.getNoti().openNoti(notis.not_enough_money);
    // }
    //test
  }

  private onClickClear() {}

  private onClickDouble() {}

  private onClickRepeat() {}

  public onClickChangeChip() {
    this.scrollView.active = !this.scrollView.active;
  }

  public getStake() {
    return this.listBet[this.currentChip];
  }

  public changeMode(mode: number) {
    switch (mode) {
      case FOOTBAR_MODE.DISABLE:
        for (let i = 0; i < 3; i++) {
          this.listBtn[i].getComponent(cc.Button).interactable = false;
          this.listBtn[i].opacity = 180;
        }
        break;

      case FOOTBAR_MODE.ENABLE:
        for (let i = 0; i < 3; i++) {
          this.listBtn[i].getComponent(cc.Button).interactable = true;
          this.listBtn[i].opacity = 255;
        }
        break;

      case FOOTBAR_MODE.ON_REPEAT:
        for (let i = 0; i < 2; i++) {
          this.listBtn[i].getComponent(cc.Button).interactable = false;
          this.listBtn[i].opacity = 180;
        }
        this.listBtn[2].getComponent(cc.Button).interactable = true;
        this.listBtn[2].opacity = 255;
        break;
    }
  }

  public updateListBet(wallet: string) {
    switch (wallet) {
      case "MATIC":
        this.listBet = this.listBetMATIC;
        break;

      case "TON":
        this.listBet = this.listBetTON;
        break;

      case "BNB":
        this.listBet = this.listBetBNB;
        break;

      case "USDT":
        this.listBet = this.listBetUSDT;
        break;

      case "TRX":
        this.listBet = this.listBetTRX;
        break;

      case "GUSD":
        this.listBet = this.listBetGUSD;
        break;

      default:
        this.listBet = this.listBetGUSD;
        break;
    }
  }

  public createChips() {
    this.scrollView.active = true;
    this.chipContainer.removeAllChildren();
    for (let i = 0; i < this.listBet.length; i++) {
      let item = cc.instantiate(this.chipItem);
      item.getComponent(ChipItem).createOnClickItem(i, this.listBet[i]);
      this.chipContainer.addChild(item);
    }
    this.scrollView.active = false;
  }

  public updateCurrentChip(currentChip: number, chip: number) {
    this.currentChip = currentChip;
    this.listBtn[3].children[0].getComponent(cc.Sprite).spriteFrame = GameController.Instance.listChipsSF[chip];
    this.listBtn[3].children[1].getComponent(cc.Label).string = this.listBet[currentChip];
  }
}
