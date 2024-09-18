const { ccclass, property } = cc._decorator;

enum BundleGameID {
  UNKNOWN = -1,
  GAME_ID_MEOWHILO = 1,
}
@ccclass
export default class BundleDownLoad extends BGUI.BundleDownLoad {
  @property
  isDownloadLocal: boolean = false;

  @property({
    visible: function (this: BundleDownLoad) {
      return this.isDownloadLocal;
    },
  })
  linkUrl: string = "";

  @property({
    visible: function (this: BundleDownLoad) {
      return this.isDownloadLocal;
    },
  })
  bundleName: string = "";

  @property({
    visible: function (this: BundleDownLoad) {
      return this.isDownloadLocal;
    },
  })
  prefabMainNameURL: string = "";

  @property(cc.ProgressBar)
  prgLoadGame: cc.ProgressBar = null;

  @property(cc.Label)
  lbMsg: cc.Label = null;

  @property({
    visible: function (this: BundleDownLoad) {
      return !this.isDownloadBundleNotLoad;
    },
  })
  autoDownload: boolean = false;

  @property({
    visible: function (this: BundleDownLoad) {
      return !this.isDownloadBundleNotLoad;
    },
  })
  isClicked: boolean = false;

  @property({
    type: cc.Enum(BundleGameID),
    tooltip: "Bundle Game ID",
    visible: function (this: BundleDownLoad) {
      return !this.autoDownload;
    },
  })
  gameID: BundleGameID = BundleGameID.UNKNOWN;

  @property({
    visible: function (this: BundleDownLoad) {
      return !this.autoDownload;
    },
  })
  isDownloadBundleNotLoad: boolean = false;
}
