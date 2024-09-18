import { Send } from "../Connection/Send";
import AudioController, { SOUND_TYPE } from "../Controller/AudioController";
import GameController from "../Controller/GameController";
import MultiHitItem, { MULTIHIT_MODE } from "../Items/MultiHitItem";
import TableItem from "../Items/TableItem";
import { WIN_LEVEL } from "./Win";

const { ccclass, property } = cc._decorator;

export enum FOOTBAR_MODE {
  NEW_GAME = 0,
  START_GAME = 1,
  PLAYING = 2,
}

@ccclass
export default class FootBar extends cc.Component {
  @property(cc.Button)
  private btnOrdi: cc.Button[] = []; // 0: -, 1: +

  @property(cc.Label)
  private betNum: cc.Label = null;

  @property(cc.Label)
  private minesNum: cc.Label = null;

  @property(cc.Label)
  private cashOutNum: cc.Label = null;

  @property(cc.Node)
  private listBtn: cc.Node[] = [];

  @property(cc.Node)
  private content: cc.Node = null;

  @property(cc.Prefab)
  private multiHit_item: cc.Prefab = null;

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

  private currentHit: number = -1;

  private betOrdi: number = 0;

  private mines: number = 4;

  public getMines() {
    return this.mines;
  }

  onLoad() {
    this.listBet = this.listBetGUSD;
    this.updateBet();
    this.updateMines();
    this.createMultiHit();
  }

  private onClickIncBet() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    this.betOrdi += 1;
    this.updateBet();
  }

  private onClickDecBet() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    this.betOrdi -= 1;
    this.updateBet();
  }

  public updateBet() {
    if (this.betOrdi > 0 && this.betOrdi < 7) {
      this.setOrdiInteractable(0, true);
      this.setOrdiInteractable(1, true);
    } else if (this.betOrdi === 0) {
      this.setOrdiInteractable(0, false);
      this.setOrdiInteractable(1, true);
    } else if (this.betOrdi === 7) {
      this.setOrdiInteractable(0, true);
      this.setOrdiInteractable(1, false);
    }

    this.updateBetNum();
  }

  private updateBetNum() {
    this.betNum.string = this.listBet[this.betOrdi].toString();
  }

  private onClickIncMines() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    this.mines += 1;
    this.updateMines();
    this.createMultiHit();
  }

  private onClickDecMines() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    this.mines -= 1;
    this.updateMines();
    this.createMultiHit();
  }

  public updateMines() {
    if (this.mines > 2 && this.mines < 24) {
      this.setOrdiInteractable(2, true);
      this.setOrdiInteractable(3, true);
    } else if (this.mines === 2) {
      this.setOrdiInteractable(2, false);
      this.setOrdiInteractable(3, true);
    } else if (this.mines === 24) {
      this.setOrdiInteractable(2, true);
      this.setOrdiInteractable(3, false);
    }

    this.updateMinesNum();
    GameController.Instance.getGamePlay().updateNums(this.mines);
  }

  private updateMinesNum() {
    this.minesNum.string = this.mines.toString();
  }

  public setOrdiInteractable(num: number, interactable: boolean) {
    this.btnOrdi[num].interactable = interactable;
    if (interactable) {
      this.btnOrdi[num].node.children[0].opacity = 255;
    } else {
      this.btnOrdi[num].node.children[0].opacity = 120;
    }
  }

  public setOffAllOrdiInteractable() {
    this.btnOrdi.forEach((btn) => {
      btn.interactable = false;
      btn.node.children[0].opacity = 120;
    });
  }

  private onClickConfirm() {
    // if (HeadBar.instance.getCurrentBalance() >= this.getStake()) {
    // Send.confirmJoinRoom(GameController.Instance, HeadBar.instance.getCurrentWallet(), parseFloat(this.getStake()).toString());
    // } else {
    //   GameController.Instance.getNoti().openNoti(notis.not_enough_money);
    // }

    //test
    AudioController.Instance.playSound(SOUND_TYPE.START);
    this.changeMode(FOOTBAR_MODE.START_GAME);
    GameController.Instance.getGamePlay().startMode();
  }

  public getStake() {
    return this.listBet[this.betOrdi];
  }

  private onClickCashOut() {
    AudioController.Instance.playSound(SOUND_TYPE.CLICK);

    // Send.cashOut();

    //test
    GameController.Instance.getWin().openWin(WIN_LEVEL.BIG_WIN, 2, 1);
  }

  public updateCashOutNum(num: number) {
    this.cashOutNum.string = num.toFixed(
      GameController.Instance.getHeadBar().getFixedNum()
    );
  }

  public changeMode(mode: number) {
    switch (mode) {
      case FOOTBAR_MODE.NEW_GAME:
        this.listBtn[0].getComponent(cc.Button).interactable = false;
        this.listBtn[1].active = true;
        this.listBtn[2].active = false;
        this.listBtn[3].active = false;
        this.updateBet();
        this.updateMines();
        this.resetHit();
        break;

      case FOOTBAR_MODE.START_GAME:
        this.listBtn[0].getComponent(cc.Button).interactable = true;
        this.listBtn[1].active = false;
        this.listBtn[2].active = true;
        this.listBtn[3].active = false;
        this.setOffAllOrdiInteractable();
        break;

      case FOOTBAR_MODE.PLAYING:
        this.listBtn[0].getComponent(cc.Button).interactable = true;
        this.listBtn[1].active = false;
        this.listBtn[2].active = false;
        this.listBtn[3].active = true;
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

    this.updateBetNum();
  }

  public createMultiHit() {
    let max = 25 - this.mines;
    this.content.removeAllChildren();
    for (let i = 0; i < max; i++) {
      let item = cc.instantiate(this.multiHit_item);
      item.getComponent(MultiHitItem).updateHit(i + 1);
      item.getComponent(MultiHitItem).updateMulti(this.mines, i);
      item.getComponent(MultiHitItem).changeMode(MULTIHIT_MODE.NORMAL);
      this.content.addChild(item);
    }
  }

  private goLeft() {
    this.content.x =
      this.content.x + 618 > -308.2 ? -308.2 : this.content.x + 618;
  }

  private goRight() {
    this.content.x =
      this.content.x - 618 < -(this.content.width - 308.2)
        ? -(this.content.width - 308.2)
        : this.content.x - 618;
  }

  public updateCurrentHit() {
    if (this.content.children[this.currentHit]) {
      this.content.children[this.currentHit]
        .getComponent(MultiHitItem)
        .changeMode(MULTIHIT_MODE.NORMAL);
    }
    this.currentHit += 1;
    this.content.children[this.currentHit]
      .getComponent(MultiHitItem)
      .changeMode(MULTIHIT_MODE.CURRENT);
    this.content.children[this.currentHit + 1]
      .getComponent(MultiHitItem)
      .changeMode(MULTIHIT_MODE.NEXT);
    this.updateContentX();
  }

  private updateContentX() {
    if (
      this.currentHit === 0 ||
      this.currentHit === 1 ||
      this.currentHit === this.content.childrenCount - 2 ||
      this.currentHit === this.content.childrenCount - 1
    ) {
      if (this.currentHit === 0 || this.currentHit === 1) {
        this.content.x = -308.2;
      } else {
        this.content.x = -(this.content.width - 308.2);
      }
    } else {
      this.content.x =
        -308.2 +
        4.5 * 2 +
        this.content.children[this.currentHit].width * 2 -
        this.content.children[this.currentHit].x +
        this.content.children[this.currentHit].width / 2;
    }
  }

  private resetHit() {
    if (this.content.children[this.currentHit]) {
      this.content.children[this.currentHit]
        .getComponent(MultiHitItem)
        .changeMode(MULTIHIT_MODE.NORMAL);
    }
    if (this.content.children[this.currentHit + 1]) {
      this.content.children[this.currentHit + 1]
        .getComponent(MultiHitItem)
        .changeMode(MULTIHIT_MODE.NORMAL);
    }
    this.currentHit = -1;
  }

  private onClickAutoPick() {
    let list = GameController.Instance.getGamePlay().listItemAlive;
    let index = BGUI.Utils.getRandomInt(
      0,
      GameController.Instance.getGamePlay().listItemAlive.length - 1
    );
    let num = list[index];

    GameController.Instance.getGamePlay()
      .table.children[num].getComponent(TableItem)
      .onClickItem();
  }
}
