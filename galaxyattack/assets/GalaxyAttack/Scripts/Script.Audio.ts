const { ccclass, property } = cc._decorator;

export enum MUSIC_TYPE {
  BASEGAME_BGM = 0,
}
export enum SOUND_TYPE {
  BEGIN = 0,
  CASH_OUT = 1,
  CLICK = 2,
  HEART_BEAT = 3,
  FLIP_CARD = 4,
  MONSTER_EXPLOSION = 5,
  ROAR_EASY = 6,
  ROAR_HARD = 7,
  ROAR_NORMAL = 8,
  SHOOT = 9,
}

@ccclass
export default class AudioManager extends cc.Component {
  public static instance: AudioManager = null;
  @property(cc.AudioClip)
  public mainBGM: cc.AudioClip[] = [];

  @property(cc.AudioClip)
  public listAuds: cc.AudioClip[] = [];

  private _musicId: number = -1;
  private _loopId: number = -1;
  private _volume: number = 1;

  public audioStatus: boolean = true;

  onLoad() {
    AudioManager.instance = this;
    this.init();
  }

  onDestroy() {}

  public init() {
    this.setSystemVolume(1);
  }

  public getSystemVolume() {
    return this._volume;
  }

  public setSystemVolume(volume: number) {
    this._volume = volume;
    cc.audioEngine.setVolume(this._musicId, volume);
  }

  public playSound(id: number) {
    let audioClip = this.listAuds[id];
    if (audioClip && this.audioStatus) {
      cc.audioEngine.play(audioClip, false, this._volume);
    }
  }

  public playMusic(id: number) {
    cc.audioEngine.stop(this._musicId);
    let audioClip = this.mainBGM[id];
    if (audioClip && this.audioStatus) {
      this._musicId = cc.audioEngine.play(audioClip, true, this._volume);
    }
  }

  public playLoop(id: number) {
    cc.audioEngine.stop(this._loopId);
    let audioClip = this.listAuds[id];
    if (audioClip && this.audioStatus) {
      this._loopId = cc.audioEngine.play(audioClip, true, this._volume);
    }
  }

  public stopPlayLoop() {
    cc.audioEngine.stop(this._loopId);
  }

  public stopMusic() {
    cc.audioEngine.stop(this._musicId);
  }

  public pauseMusic() {
    cc.audioEngine.pause(this._musicId);
  }

  public resumeMusic() {
    cc.audioEngine.resume(this._musicId);
  }

  public setAudioStatus() {
    this.audioStatus = !this.audioStatus;
    if (!this.audioStatus) {
      this.stopAll();
    } else {
      this.playMusic(MUSIC_TYPE.BASEGAME_BGM);
    }
  }

  public getAudioStatus() {
    return this.audioStatus;
  }

  public stopAll() {
    cc.audioEngine.stopAll();
  }
}
