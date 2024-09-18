export default class Common {
  public static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static isInt(num) {
    return num % 1 === 0;
  }

  public static numberWithCommas(num: number, digits: number = 0) {
    if (num == 0) return "0";
    if (digits != 0) {
      return num.toFixed(digits).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
    return num.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  public static numberWithDots(num: number, digits: number = 0) {
    if (num == 0) return "0";
    if (digits != 0) {
      return num.toFixed(digits).replace(/(\d)(?=(\d{3})+\.)/g, "$1.");
    }
    return num.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  public static numberWithOutCommas(str: string) {
    return parseInt(str.replace(/\,/g, ""));
  }

  public static convertStrToArray(str: string) {
    var elements = str.split("-");
    return elements.map((element) => {
      var values = element.split(";").map(Number);
      return values;
    });
  }

  public static isTest: boolean =
    !window.location.host.includes(".buble.games");

  public static runLog(...content: any[]) {
    if (this.isTest) {
      BGUI.ZLog.log(...content);
    }
  }

  public static runError(...content: any[]) {
    if (this.isTest) {
      BGUI.ZLog.error(...content);
    }
  }

  
  public static compareArrays(arr1: Array<number>, arr2: Array<number>) {
    // Check if lengths are equal
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Iterate over each element and compare
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    // If all elements are equal, return true
    return true;
  }
}

export class MONSTER_ANIMATION {
  static ATTACK = "afterBet_attack";
  static DEAD = "afterBet_dead";
  static DEBUT = "afterBet_debut";
  static HURT = "afterBet_hurt";
  static NORMAL = "afterBet_normal";
  static NORMAL2 = "beforeBet_normal";
  static SHOUT = "beforeBet_shout";
}

export class FIGHTER_ANIMATION {
  static BIGWIN = "afterBet_bigwin";
  static DEAD = "afterBet_dead";
  static NORMAL = "afterBet_normal";
  static SHOTA1 = "afterBet_shotA1";
  static SHOTA2 = "afterBet_shotA2";
  static SHOTA3 = "afterBet_shotA3";
  static SHOTA4 = "afterBet_shotA4";
  static SHOTA5 = "afterBet_shotA5";
  static SHOTA6 = "afterBet_shotA6";
  static SHOTA7 = "afterBet_shotA7";
  static SHOTA8 = "afterBet_shotA8";
  static SHOTB1 = "afterBet_shotB1";
  static SHOTB2 = "afterBet_shotB2";
  static SHOTB3 = "afterBet_shotB3";
  static SHOTB4 = "afterBet_shotB4";
  static SHOTB5 = "afterBet_shotB5";
  static SHOTB6 = "afterBet_shotB6";
  static SHOTB7 = "afterBet_shotB7";
  static SHOTB8 = "afterBet_shotB8";
  static SHOTB9 = "afterBet_shotB9";
  static SHOTB10 = "afterBet_shotB10";
  static SHOTC1 = "afterBet_shotC1";
  static SHOTC2 = "afterBet_shotC2";
  static SHOTC3 = "afterBet_shotC3";
  static SHOTC4 = "afterBet_shotC4";
  static SHOTC5 = "afterBet_shotC5";
  static SHOTC6 = "afterBet_shotC6";
  static SHOTC7 = "afterBet_shotC7";
  static SHOTC8 = "afterBet_shotC8";
  static SHOTC9 = "afterBet_shotC9";
  static SHOTC10 = "afterBet_shotC10";
  static SHOTC11 = "afterBet_shotC11";
  static SHOTC12 = "afterBet_shotC12";
  static NORMAL2 = "beforeBet_normal";
}
