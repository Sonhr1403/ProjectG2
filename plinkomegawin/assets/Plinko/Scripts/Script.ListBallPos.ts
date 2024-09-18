const { ccclass, property } = cc._decorator;

@ccclass
export default class BallPos {
  public static listPos12_23 = {
    0: [-17.3, -17.4],
    1: [17, 23, -35.4, -33.1],
    2: [31.7, -5.6, -16.3, -26.3],
    3: [31, 13, -21.6, -23.5],
    4: [13.4, 20.5, -22.1, -24.1],
    5: [13.8, 26.9, -17.9, -8.1],
    6: [13.2, 7.3, -24.7, -25.7],
    7: [6.5, 35.7, -36.6, -2.8],
    8: [4.6, 32.9, -20.5, -19.3],
    9: [18.1, 29.6, -20.8, -31.3],
    10: [5.3, 20.2, -6.1, -18.6],
    11: [24.6, 35.3, -36.5],
    12: [39, -34]
  };

  public static listPos14_23 = {
    0: [8.1],
    1: [-9.6, 14.9],
    2: [-19.8, -31.3, 1.8, 32.3],
    3: [-14.9, -26.8, 1, 13.7],
    4: [-2.7, -18.3, 21.8, 9.6],
    5: [-17.5, -31.8, 9.3, 12.7],
    6: [-19.4, -18.9, 26, 16.3],
    7: [-21.6, -24.8, 38.2, 4.7],
    8: [-28.3, -5.2, 22.9, 26.1],
    9: [-20.8, -16.2, 18.2, 39.2],
    10: [-17.2, -13.8, 36.2, 9.9],
    11: [-19.2, -15.8, 26.8, 31.4],
    12: [-19, -2.6, 19.3, 29.3],
    13: [-10.3, 18.8],
    14: [-16.3]
  };

  public static listPos16_23 = {
    0: [-17],
    1: [16.6],
    2: [12.6, 19.3, -32.3, -30],
    3: [16.5, 10.6, -39.7, -23.5],
    4: [2.6, 16.9, -1.9, -18.7],
    5: [29.5, 19.2, -16.7, -15.9],
    6: [12.8, 34.6, -19.9, -2.1],
    7: [13.7, 26.7, -16.3, -8],
    8: [14.7, 3.3, -26, -3.7],
    9: [33.7, 4.8, -18.9, -6.4],
    10: [31.3, 28.7, -12.5, -9.1],
    11: [32.5, 10.3, -18.4, -11.9],
    12: [32.1, 2, -32.7, -12.8],
    13: [38.7, 25.3, -14.6, -10.1],
    14: [11.1, 9.5, -13.9, -7.6],
    15: [17.3, -13.5],
    16: [28.2, 19.9]
  };

  public static listPos12_26 = {
    0: [-60.4],
    1: [10.5, 15.7, -35.4, -20.1],
    2: [31.9, 31.7, -31, -21],
    3: [20.8, 20.5, -20.9, -17.6],
    4: [29.3, 13.5, 20.6, -13.7],
    5: [29, -16.7, -24.7, -25.7],
    6: [36.4, 7.4, -33, -9.4],
    7: [11, 38.7, -16, -30.7],
    8: [11.3, 25.5, -29.6, -13],
    9: [0.1, 39.2, 18.1, -20.8, -34],
    10: [33.7, 5.3, -6.8, -19.3],
    11: [30.8, 20.9, -3.4, -15.7],
    12: [39, -2.1]
  };

  public static listPos14_26 = {
    0: [-31.1, 8.4],
    1: [20.5, -9.7, 14],
    2: [-18.9, -27.3, -31.2 -2.9],
    3: [ -11, -26.9, -0.1, 12.4],
    4: [-31.8, -24.1, 15.6, 7.6, -2.7],
    5: [-33.1, 6.3, 23, 12.6],
    6: [6.7, 16.2, -15.4, -22.9],
    7: [21.5, -24.5, -24.8, 9.6],
    8: [-21.7, 6.9, -30.5, 24],
    9: [33, -20.7, 3.6, 21.4],
    10: [9.7, 38, -19, -5.3],
    11: [-17.6, -14.1, -19.6, 26.9],
    12: [29, 19.8, 18.7, 34.1],
    13: [-10.3, 33.7, 5.2],
    14: [62.7, 69.8]
  };

  public static listPos16_26 = {
    0: [-16.9],
    1: [-30, 34.2],
    2: [-21.9, 5.2, 15.3, -32.2],
    3: [-39.6, -4.4, 16.4, 0.8, 16.6],
    4: [-7.9, -32.3, 6, 12, 2.9],
    5: [9.6, -25.7, -17.3, 24, 31.8],
    6: [-5.1, -39, 35, 18, -19.2],
    7: [2.7, 28, -15, 9.3],
    8: [-12.8, -34, 13.9, 32.5, -8.3],
    9: [7.4, 15.4, -25.5, 33.2, -10.6],
    10: [13.5, -25.9, -12.5, 30, -9.2],
    11: [32.4, -11.9, 7.2, -33.1, 14.9],
    12: [32.1, -32.7, 2, 18.9, -0.2],
    13: [39.6, -14.6, 30.3, 15.1],
    14: [21.9, -33.7, 38.7, 17.3],
    15: [-7.2, 1],
    16: [23, 10.8]
  };

  public static listPos12_27 = {
    0: [-44.7],
    1: [-17.5, -35.5, 38.6],
    2: [17, 31.8, -21, -33.2],
    3: [-20.9, -10.8, 20.6, -17.7],
    4: [29.1, -29.4, 3.7, 13.7],
    5: [ -13.8, 14.7, -16.7, -24.7],
    6: [24.7, -22.4, 7.4, 18.3],
    7: [-39.9, 19.1, 22.4, 7, 17.6],
    8: [-7.1, 11.3, -28.2, 4.5],
    9: [13.9, 37, 0.1, -20.6, -34],
    10: [11.9, -6.8, -12.8, 5.5],
    11: [35.4, 20.9, 2.6,],
    12: [39, 17.7, -2.1]
  };

  public static listPos14_27 = {
    0: [-31.1, 8.3],
    1: [-9.8, -18.8, -34.1],
    2: [-24.2, -18.9, -31.3, -2.9],
    3: [-10.9, -26.8, 22.1, 12.4, -2],
    4: [20.4, 15.7, -20.8, -5.6, -15.6],
    5: [-33.1, -19.7, 9.2, -21.3],
    6: [6.8, 16.2, -15.5, -7.9, -23],
    7: [21.7, -24.7, 9.6, -18.5, -15],
    8: [-21.7, 6.9, 24, 31.3, -17.2],
    9: [-6, 30, -20.7, 3.6, 21.4],
    10: [-5.3, 19.5, 38.9, 26.9, 4.6],
    11: [6.6, 26.8, 31.1, -18.6],
    12: [29, 34, 5.3, 19.3],
    13: [34.1, -23.3, 2.8],
    14: [62.7]
  };

  public static listPos16_27 = {
    0: [-17],
    1: [-30, -36.3],
    2: [5.2, -29.9, 19.1],
    3: [-39.6, 16.4, -23.6],
    4: [-25.7, -7.9, 3.8, 13.8, -39.5],
    5: [9.6, -17.3, 31.6, -9.9],
    6: [13.7, -9.3, 28, -5.2],
    7: [-32.4, 2.7, 9.2, -14.8],
    8: [-34, 32.5, -8.4, 6.7, 17.2],
    9: [27, -8.2, 15.4, -25.5, 33.2],
    10: [-25.9, 2.3, -32, -13.5, 28.7],
    11: [2.8, 30, -31.9, -14.1],
    12: [32.1, -32.7, -6.7, 19.4],
    13: [-14.4, 23, 36.7, 15],
    14: [21.9, 38.8, -33.7, -3.2],
    15: [-12.8, 10.9, 10.8],
    16: [16.9, -34.4]
  };

  public static listPos12_28 = {
    0: [-39, 22.5],
    1: [-1.4, 3.2, -25.4],
    2: [-35.5, -11.4, 3.4, -22.5],
    3: [-4.8, 13.2, -36.6, -13, 3.8],
    4: [6.5, -38.6, -25.1, 9.1, 16],
    5: [-14.8, -24.6, 36.1, -35.3],
    6: [-15.8, 24.7, -26.8, 13.9],
    7: [4, -30.4, 35.3, -4, 22.9],
    8: [16.7, 34, -13.7, -38.7, 26.7],
    9: [-36.1, 30.5, -10.2],
    10: [29.2, 35.4, -5.2, -17, -32.2],
    11: [-3.6, -31.5, 25.4],
    12: [23.6, -3.7]
  };

  public static listPos14_28 = {
    0: [34.6],
    1: [10, -34.1, 23.3],
    2: [6.3, -29.3, -34.2, -5.3],
    3: [-30, -9.7, 22.1, 15.7],
    4: [9.3, -38.9, -26.9, -4.6],
    5: [6, -33.1, 20.7, -3.6, -21.4],
    6: [19.4, -9.5, -24, 5.3, -31.1],
    7: [18.5, -24.4, -7.2, 31.9, -31.8],
    8: [-6.8, 22.9, -16.4, 17.3, -19.8],
    9: [33, -9.2, -12.6, -23.6, 21.4],
    10: [-20.4, -14, 2.7, 19.1, 22.6],
    11: [-22.1, -12.4, -33.4, 33.3, -1.3],
    12: [23.4, 34, 7.8, 18.9],
    13: [18.8, 4.5, 34.1, -38],
    14: [31.1, -8.1]
  };

  public static listPos16_28 = {
    0: [34.4],
    1: [12.8, -1.9],
    2: [-21.9, -38.6, -2.3, 33.7, -11, 3.3],
    3: [-39.7, -2.2, -36.6, -11.4, 14.6],
    4: [-32.1, 32.7, 6.7, -19.6, 12.5],
    5: [-25.5, -8, 14.1, 8.8],
    6: [-2.5, 20.9, -31.4, 16.1],
    7: [26, -27, -27.4, 8.2],
    8: [8.4, 30.1, -36.9, -28.4, -4.3],
    9: [-3.4, 14.7, -33.8, 7, -12.5],
    10: [28.2, 9, -7.4, 36.9, -12.2],
    11: [-9.7, 1.9, 28.1, 17.3, 33.4, -31.7],
    12: [-13.9, -29.2, 30.2, -31.5, -3],
    13: [39.7, -16.7, 23.4, -26.2],
    14: [-5.2, 27.4, 38],
    15: [-19.1, 5.5],
    16: [-13.3]
  };

  public static listPos12_29 = {
    0: [7.1, -6.6, 22.7],
    1: [-13.3, 7.3, -34.4, -22.3],
    2: [2.2, -3, -31, 36.7],
    3: [18.1, 3.9, 36.1, -15.7, -36.4],
    4: [-35, 33.8, -13.6, 13.2, 6.8],
    5: [-38.2, -25.7, 21.9, 13.4, -8.4],
    6: [-29.4, 14, 33.5, -4.5],
    7: [-13.8, -21.9, 16.4, -1.8, 27, 35.4],
    8: [16.7, 38.8, -4.4, 5.6],
    9: [24, -1.3, -36.1, 30.7, 17.7],
    10: [-16.7, 30.9, 21.5, 11],
    11: [29.4, 8, -3.9, 22.3, -31.6],
    12: [29.1, 5.1, -3.7]
  };

  public static listPos14_29 = {
    0: [34.6],
    1: [-34.2, 23.3, 7.1, -5.2],
    2: [-19.9, 19.8, -20.3, -34.1, -5.4],
    3: [5.1, -9.7, -29.3, 22.1, 12.4],
    4: [-9.9, 14.9, 39, -38.8, -26.9],
    5: [6, -33.1, 20.7, -3.6, -21.4],
    6: [19.7, -9.5, -24, 5.3, -31.3],
    7: [18.5, 25, 31.9, -31.9],
    8: [26.7, -6.8, 15.4, 7.9, -15.6],
    9: [33.1, -9.2, -23.6, 21.3],
    10: [33, 19.9,  2.7, -16.8, 22.6],
    11: [-32.4, -22.1, -12.4, 2, 33.3],
    12: [23.9, -14.5, 18.9, 31.4],
    13: [9.7, 18.8, 34.2],
    14: [31.1]
  };

  public static listPos16_29 = {
    0: [-16.9, -17, 34.4],
    1: [33.7, 26.1],
    2: [-7.8, -39.4, -29.4],
    3: [-28.1, 13.5, -11.4, 6.7, -32.3],
    4: [-39.8, 32.7, -28, 26.4, 13.8],
    5: [-2.3, 9, 14.4, -34, 34.2],
    6: [-2.5, -34.2, 23.9, -19.6, 16.2],
    7: [32.4, 8.2, -4.1, -30],
    8: [34, -33.7, -13.9, 7.7, -25.7],
    9: [-13.5, -2.7, 15, -10.3],
    10: [33.8, 9.1, 3, -28.9, 24],
    11: [1.9, 17.3, 33.4, -14.4, -25.9],
    12: [25.5, -3.9, -13.8, 30.2],
    13: [-16.7, -15.5, 39.8, 23.6],
    14: [21.9, -12.7, 39.4, -1.5],
    15: [25.8, 36.3, 36.2],
    16: [30, 17, 16.9]
  };

  public static listPos12_30 = {
    0: [-23.1, 3.7, 18],
    1: [-25.5, -20.9, 31.7],
    2: [-21.5, -26.5, 4.1, 27.4],
    3: [-8.3, -12.6, 36.2, 7.6],
    4: [-6.4, -7.6, 8, 20.7],
    5: [-33.7, -31.1, 37.5, 33.1],
    6: [-13.4, -6.2, 29, 4.5],
    7: [-13.5, -38.2, 25.7, 4.6],
    8: [-13.2, -6.7, 36.1, 17.8],
    9: [-24.5, -32.5, 36.3, 9.9],
    10: [-18.1, -36.7, 27, 11.2],
    11: [-25.1, 1.4],
    12: [-22.7]
  };

  public static listPos14_30 = {
    0: [-27.4, 8.3],
    1: [-9.8, -34.2, 17, 8.1, -25.5],
    2: [6.2, -11, 16.7, -23.4, 35.9, -31.2],
    3: [12.4, -4.8, -25.7, 0.3],
    4: [-33.1, 15.6, 32.4, -13],
    5: [-15, 23.6, 9.5, -21.3],
    6: [6, -31.9, 10.5, 29.1],
    7: [24, -5.3, 31.8, -18.5],
    8: [-6, 31.3, -23.5, 12.8],
    9: [30.1, 3.6, -20.7, 18.5],
    10: [16.1, -14.9, 33, -39],
    11: [-19.6, 30, 9.7, -15.7],
    12: [-19.8, 5.3, 19.3, -5],
    13: [19, -23.3, -7.1, 29.6],
    14: [-34.6, 27.4]
  };

  public static listPos16_30 = {
    0: [13, -17, -39.7],
    1: [-22, 14.5, -39.6],
    2: [-21.9, 16.3, -36.8, 1.5],
    3: [14.4, -18.1, -1.7],
    4: [0.9, -2.1, 33.9, -19.7],
    5: [-7.6, 29.5, 11.6, 9.3],
    6: [-9.5, 28.1, -24, 3.5],
    7: [13.9, -14.9, 4.2, 33],
    8: [28.4, 30, 5, 18.5],
    9: [12.4, -8.3, 9.8, -26.1],
    10: [23, 34.2, -33.2, -13.5],
    11: [34, -0.9, -14.1, 0.6],
    12: [28, -32.7, 30.1, -10.9],
    13: [2.2, -6.7, 15, 32.7],
    14: [38.6, -34.2, -14.4, 10.5],
    15: [-34.4, 14.6],
    16: [19.7, 39.7],
  };

  public static listPos12_10 = {
    0: [-6.1, -16.8],
    1: [-17.4, -35.3],
    2: [-8.7, -16.7, 36.4, 2.7],
    3: [-35.1, -29.1, 0.9, 26],
    4: [-39.2, -25.4, 35.4, 18.3],
    5: [-10.7, -31.6, 13.6, 13.4],
    6: [-13.6, -30.1, 31, 26.6],
    7: [-2.3, -12.1, 16.7, 23.1],
    8: [-35.7, -13.3, 27, 18],
    9: [-16.9, -31.1, 37.9, 38.3],
    10: [-21.4, -15.2, 25.4, 15.5],
    11: [28.2, 35.3],
    12: [22.8, 4.3]
  };

  public static listPos14_10 = {
    0: [-20.4, -1.1],
    1: [-34.9, 16.8],
    2: [-19.4, -39, 1.6, 34.3],
    3: [-19.6, -25.7, 33.6, 15.5],
    4: [-5.9, -11.4, 0.3, 17.2],
    5: [-33, -23.4, 20.5, 9.7],
    6: [-13.3, -3.3, 19.6, 20.6],
    7: [-13.6, -20.9, 9.1, 22.2],
    8: [-15.7, -3.8, 9.8, 8.6],
    9: [-19.8, -7.6, 6.5, 37.4],
    10: [-28.3, -18.3, 37.7, 4.5],
    11: [-19.9, -16.3, 18.7, 6.4],
    12: [-20.2, -12.8, 5.8, 25.4],
    13: [-12.7, 7.2],
    14: [17.3]
  };

  public static listPos16_10 = {
    0: [26.5],
    1: [7.7],
    2: [26.2, 9.6, -29, -36.1],
    3: [3.9, 10.9, -34.4, -20.9],
    4: [30.7, 3.5, -1.8, -36.8],
    5: [29.2, 32.5, -34.2, -32.9],
    6: [11, 30, -25, -5.1],
    7: [14.5, 28.4, -4.7, -4.3],
    8: [7, 1.9, -3.3, -24.1],
    9: [9.5, 4.9, 15.6, -31.9],
    10: [20.5, 9.3, -11.1, -16.1],
    11: [25.4, 24.4, -12.3, -8.9],
    12: [34.7, 32.7, -12.8, -15.4],
    13: [19.7, 33.2, -14.9, -10.1],
    14: [30.2, 38.8, -34.7, -7.6],
    15: [-13.2, -7.4],
    16: [-9.8]
  };
}
