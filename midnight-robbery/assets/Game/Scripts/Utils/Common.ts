export default class Common {
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
    !window.location.host.includes(".globalboss.club");

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

  public static getRandomAndRemove(array) {
    if (array.length === 0) {
        throw new Error("Mảng rỗng, không thể lấy và xóa phần tử.");
    }

    // Lấy ngẫu nhiên chỉ số (index) trong mảng
    const randomIndex = Math.floor(Math.random() * array.length);
    
    // Lấy giá trị tại chỉ số ngẫu nhiên
    const randomValue = array[randomIndex];
    
    // Xóa phần tử tại chỉ số ngẫu nhiên
    array.splice(randomIndex, 1);
    
    return randomValue;
}

  // public static scheduleForLbl(
  //   start: number,
  //   to: number,
  //   time: number,
  //   lbl: cc.Label,
  //   isSchedule: boolean
  // ) {
  //   let current = start;
  //   let totalProfit = to;
  //   let profitStep = (totalProfit - current) / 100;

  //   if (isSchedule) {
  //     this.unschedule(increaseLbl);
  //   } else {
  //     this.schedule(increaseLbl, time * 0.01);
  //   }
  //   function increaseLbl() {
  //     current += profitStep;
  //     if (current >= totalProfit) {
  //       this.unschedule(increaseLbl);
  //       lbl.string = Common.numberWithCommas(totalProfit, 2);
  //     } else {
  //       lbl.string = Common.numberWithCommas(current, 2);
  //     }
  //   }
  // }
}
