// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { LanguageMgr } from "../localize/LanguageMgr";

// const language = require('vn');

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCoreManager extends BGUI.GameCoreManager {
  @property(cc.Node)
  nMiniGames: cc.Node = null;

  @property(cc.Node)
  nWidgetShowJackpot: cc.Node = null;

  @property(cc.Node)
  nLayerMiniGame: cc.Node = null;

  @property(cc.String)
  gameName: string = "";

  @property(cc.Font)
  listFontCommon: cc.Font = null;

  @property(cc.Font)
  listFontLanguage: Array<cc.Font> = [];

  @property(cc.ProgressBar)
  progressBar: cc.ProgressBar = null;

  @property(cc.Label)
  percent: cc.Label = null;

  onLoad() {
    super.onLoad();
    cc.debug.setDisplayStats(false);
    LanguageMgr.updateLang();
    cc.view.resizeWithBrowserSize(true);
    cc.view.enableAutoFullScreen(true);
    BGUI.Utils.alignView();

    BGUI.ZLog.enable = true;
    this.schedule(this.updateProgressBar, 0.1, 9);
    BGUI.BundleManager.instance.loadBundleFromLocal(
      "Game",
      (err, bundle) => {
        let bundlez = "Game";
        let prfLobby = "Game";
        BGUI.BundleManager.instance.getPrefabFromBundle(
          prfLobby,
          bundlez,
          (prefab: cc.Prefab) => {
            this.scheduleOnce(() => {
              BGUI.UIScreenManager.instance.initWithRootPrefab(
                prefab,
                () => {}
              );
            }, 1.2);
          }
        );
      }
    );
  }

  updateProgressBar() {
    let num = BGUI.Utils.getRandomInt(8, 15);
    if (this.progressBar.progress + num / 100 > 1) {
      this.progressBar.progress = 1;
    } else {
      this.progressBar.progress += num / 100;
    }
    this.percent.string =
      (parseFloat(this.progressBar.progress.toFixed(2)) * 100).toFixed() + "%";
  }
}
