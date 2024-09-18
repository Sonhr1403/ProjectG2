const { ccclass, property } = cc._decorator;

@ccclass
export default class Table extends cc.Component {
  ///////////////////////////////////////////

  private listPlayerChip = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  public getListPlayerChip() {
    return this.listPlayerChip;
  }

  public setListPlayerChip(i: number, value: number) {
    this.listPlayerChip[i].push(value);
  }

  public getPlayerSum(){
    let sum = 0;
    this.listPlayerChip.forEach((list)=>{
        if (list.length > 0) {
            list.forEach((value)=>{
                sum += value; 
            })
        }
    })
    return sum;
  }

  public initNewGame() {
    this.listPlayerChip = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
  }

  // LIFE-CYCLE CALLBACKS:
}
