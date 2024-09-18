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
    // true;

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
