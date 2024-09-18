
const {ccclass, property} = cc._decorator;

export enum MULTIHIT_MODE {
    NORMAL = 0,
    CURRENT = 1,
    NEXT = 2,
}
@ccclass
export default class MultiHitItem extends cc.Component {

    @property(cc.Label)
    private hit: cc.Label = null;

    @property(cc.Label)
    private multi: cc.Label = null;

    @property(cc.Node)
    private next: cc.Node = null;

    @property(cc.Node)
    private bg: cc.Node = null;

    @property(cc.Node)
    private upperBg: cc.Node = null;

    //////////////////////////////////////////////////////////

    private listMulti = {
        2: [1.03, 1.13, 1.23, 1.36, 1.5, 1.67, 1.86, 2.1, 2.38, 2.71, 3.13, 3.65, 4.32, 5.18, 6.33, 7.92, 10.18, 13.57, 19, 28.5, 47.5, 95, 285],
        3: [1.08, 1.23, 1.42, 1.64, 1.92, 2.25, 2.68, 3.21, 3.9, 4.8, 6, 7.64, 9.93, 13.24, 18.21, 26.01, 39.02, 62.43, 109.25, 218.5, 546.25, 2185],
        4: [1.13, 1.36, 1.64, 2.01, 2.48, 3.1, 3.93, 5.05, 6.6, 8.8, 12.01, 16.81, 24.28, 36.42, 57.23, 95.38, 171.68, 343.36, 801.17, 2403.5, 12017.5],
        5: [1.19, 1.5, 1.92, 2.48, 3.26, 4.34, 5.89, 8.16, 11.56, 16.81, 25.21, 39.22, 63.73, 109.25, 200.29, 400.58, 901.31, 2403.5, 8412.25, 50473.5],
        6: [1.25, 1.67, 2.25, 3.1, 4.34, 6.2, 9.06, 13.59, 21.01, 33.62, 56.03, 98.04, 182.08, 364.17, 801.17, 2002.92, 6008.75, 24035, 168245],
        7: [1.32, 1.86, 2.68, 3.93, 5.89, 9.06, 14.35, 23.48, 39.92, 70.97, 133.06, 266.12, 576.6, 1383.83, 3805.54, 12685.14, 57083.13, 456665],
        8: [1.4, 2.1, 3.21, 5.05, 8.16, 13.59, 23.48, 42.27, 79.84, 159.67, 342.16, 798.37, 2075.75, 6227.25, 22833.25, 114166.25, 1027496.25],
        9: [1.48, 2.38, 3.9, 6.6, 11.56, 21.01, 39.92, 79.84, 169.65, 387.78, 969.44, 2714.44, 8821.94, 35287.75, 194082.63, 1940826.25],
        10: [1.58, 2.71, 4.8, 8.8, 16.81, 33.62, 70.97, 159.67, 387.78, 1034.07, 3102.22, 10857.77, 47050.33, 282302, 3105322],
        11: [1.7, 3.13, 6, 12.01, 25.21, 56.03, 133.06, 342.16, 969.44, 3102.22, 11633.32, 54288.85, 352877.5, 4234530],
        12: [1.83, 3.65, 7.64, 16.81, 39.22, 98.04, 266.12, 798.37, 2714.44, 10857.77, 54288.85, 380021.92, 4940285],
        13: [1.98, 4.32, 9.93, 24.28, 63.73, 182.08, 576.6, 2075.75, 8821.94, 47050.33, 352877.5, 4940285],
        14: [2.16, 5.18, 13.24, 36.42, 109.25, 364.17, 1383.83, 6227.25, 35287.75, 282302, 4234530],
        15: [2.38, 6.33, 18.21, 57.23, 200.29, 801.17, 3805.54, 22833.25, 194082.63, 3105322],
        16: [2.64, 7.92, 26.01, 95.38, 400.58, 2002.92, 12685.14, 114166.25, 1940826.25],
        17: [2.97, 10.18, 39.02, 171.68, 901.31, 6008.75, 57083.13, 1027496.25],
        18: [3.39, 13.57, 62.43, 343.36, 2403.5, 24035, 456665],
        19: [3.96, 19, 109.25, 801.17, 8412.25, 168245],
        20: [4.75, 28.5, 218.5, 2403.5, 50473.5],
        21: [5.94, 47.5, 546.25, 12017.5],
        22: [7.92, 95, 2185],
        23: [11.88, 285],
        24: [23.75]
    }

    // LIFE-CYCLE CALLBACKS:

    public changeMode(mode: number){
        switch (mode) {
            case MULTIHIT_MODE.NORMAL:
                this.next.active = false;
                this.bg.color = cc.color(111,111,111);
                this.upperBg.color = cc.color(61,61,61);
                this.hit.node.color = cc.color(59,59,59);
                break;
        
            case MULTIHIT_MODE.CURRENT:
                this.next.active = false;
                this.bg.color = cc.color(252,243,135);
                this.upperBg.color = cc.color(247,202,61);
                this.hit.node.color = cc.color(254,184,29);
                break;
        
            case MULTIHIT_MODE.NEXT:
                this.next.active = true;
                break;
        
        }
    }

    public updateHit(hit: number) {
        this.hit.string = hit + "hits";
    }

    public updateMulti(mines: number, index: number) {
        this.multi.string = this.listMulti[mines][index] + "x";
    }
}
