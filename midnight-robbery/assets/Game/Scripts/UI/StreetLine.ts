const { ccclass, property } = cc._decorator;

export interface LineData {
  y: number;
  scale: number;
  opacity: number;
}

@ccclass
export default class StreetLine extends cc.Component {

  @property(cc.Node)
  private listLine: cc.Node[] = [];
  /////////////////////////////////////////////////////

  private listLineData: LineData[] = [
    { y: 254, scale: 0, opacity: 0 },
    { y: 220, scale: 0.4, opacity: 60 },
    { y: 156, scale: 0.65, opacity: 140 },
    { y: 50, scale: 1.1, opacity: 220 },
    { y: -150, scale: 1.75, opacity: 255 },
  ];

  /////////////////////////////////////////////////////

  // LIFE-CYCLE CALLBACKS:

  public runAnim(){
  }

  
}
