import GameController from "../Controller/GameController";
import { notis } from "../UI/Noti";
import Common from "../Utils/Common";
import { ConnectData } from "./ConnectData";


const { ccclass, property } = cc._decorator;

class Login extends BGUI.BaseOutPacket {
  public partner: string;
  public appId: number;
  public lang: string;
  public code: string;

  public getCmdId(): number {
    return 1;
  }

  public putData(): void {
    this.putString(this.partner);
    this.putInt(this.appId);
    this.putString(this.lang);
    this.putString(this.code);
  }
}

@ccclass
export class Connector extends BGUI.Connector {
  public static get instance(): Connector {
    let ret = cc.Canvas.instance.node.getComponent(Connector);
    if (!ret) {
      ret = cc.Canvas.instance.node.addComponent(Connector);
      const url = window.location.href;
      let urlSearchParams = new URLSearchParams(url.split("?")[1]);
      if (
        url &&
        url.includes("?") &&
        urlSearchParams &&
        urlSearchParams.get("accessToken")
      ) {
        Connector.instance.SSL = true;
        Connector.instance.HOST = ConnectData.DOMAIN;
      } else {
        if (window.location.host.includes("localhost:")) {
          Connector.instance.SSL = ConnectData.WSS;
          Connector.instance.HOST = ConnectData.DOMAIN;
        } else {
          GameController.Instance.getNoti().openNoti(notis.connection_failed);
        }
      }
    }
    return ret;
  }

  onDisconnected(code) {
    super.onDisconnected(code);
    GameController.Instance.getNoti().openNoti(notis.connection_end);

  }

  onFinishConnect(success: boolean) {
    super.onFinishConnect(success);
    Common.runError("Connect Success:", success);
    if (success) {
      this.sendLogin();
      this.schedule(this.rewindDisconnectDetector);
    } else {
      this.unschedule(this.rewindDisconnectDetector);
      GameController.Instance.getNoti().openNoti(notis.connection_failed);
    }
  }

  private sendLogin(): void {
    try {
      const url = window.location.href;
      let urlSearchParams = new URLSearchParams(url.split("?")[1]);
      Common.runError(window.location.href);
      if (
        url &&
        url.includes("?") &&
        urlSearchParams &&
        urlSearchParams.get("accessToken")
      ) {
        let pk = new Login();
        pk.partner = urlSearchParams.get("partner");
        pk.appId = 11;
        pk.lang = urlSearchParams.get("lang");
        if (!pk.lang || pk.lang === "") {
          pk.lang = "en";
        }
        pk.code = urlSearchParams.get("accessToken");
        Connector.instance.sendPacket(pk);
        Common.runError("login--->", pk);
      } else {
        let pk = new Login();
        pk.partner = ConnectData.PARTNER;
        pk.lang = "en";
        pk.appId = 11;
        pk.code = ConnectData.CODE;
        Connector.instance.sendPacket(pk);
        Common.runError("login test--->", pk);

      }
    } catch (error) {
      GameController.Instance.getNoti().openNoti(notis.connection_failed);
    }
  }

  sendPacket(pk: BGUI.BaseOutPacket): void {
    if (this.isConnected()) {
      super.sendPacket(pk);
    } else {
      this.connect();
    }
  }
}

export function openNoti(connection_failed: any) {
  throw new Error("Function not implemented.");
}

