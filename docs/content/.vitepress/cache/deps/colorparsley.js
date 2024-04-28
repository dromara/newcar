import "./chunk-Y2F7D3TJ.js";

// ../node_modules/.pnpm/colorparsley@0.1.8/node_modules/colorparsley/src/colorparsley.js
function colorParsley(colorIn) {
  if (typeof colorIn === "string") {
    return parseString(colorIn);
  } else if (typeof colorIn === "number") {
    return [
      (colorIn & 16711680) >> 16,
      (colorIn & 65280) >> 8,
      colorIn & 255,
      1,
      true,
      "unknown"
    ];
  } else if (typeof colorIn === "object") {
    if (Array.isArray(colorIn)) {
      return colorIn;
    } else if (!isNaN(colorIn.r) || !isNaN(colorIn.red)) {
      let objArray = [0, 0, 0, 0, false, "unknown"];
      objArray[0] = colorIn.r ? colorIn.r : colorIn.red ? colorIn.red : false;
      objArray[1] = colorIn.g ? colorIn.g : colorIn.green ? colorIn.green : false;
      objArray[2] = colorIn.b ? colorIn.b : colorIn.blue ? colorIn.blue : false;
      objArray[3] = colorIn.a ? colorIn.a : colorIn.alpha ? colorIn.alpha : 1;
      objArray[4] = objArray[0] && objArray[1] && objArray[2] ? true : false;
      objArray[5] = colorIn.space ? colorIn.space : colorIn.colorSpace ? colorIn.colorSpace : colorIn.colorspace ? colorIn.colorspace : "unknown";
      return objArray;
    }
  }
  ;
  console.log("colorParsley error: invalid input");
  return [0, 0, 0, 0, false, "inputError"];
}
function parseString(colorString = "#abcdef") {
  colorString = colorString.replace(/[^\w,.#%()\/ -]/g, "");
  colorString = colorString.toLowerCase();
  let isValid = false;
  let type = "sRGB";
  let retArray = [0, 0, 0, 0, isValid, type];
  if (colorString.match(/^(?:(?!rgb|l.h|hs|col|\d|#).{0,4})(?=[g-z])/)) {
    let namedColors = {
      gray0: "000000",
      gray1: "111111",
      gray2: "222222",
      gray3: "333333",
      gray4: "444444",
      gray5: "555555",
      gray6: "666666",
      gray7: "777777",
      gray8: "888888",
      gray9: "999999",
      graya: "aaaaaa",
      grayb: "bbbbbb",
      grayc: "cccccc",
      grayd: "dddddd",
      graye: "eeeeee",
      grayf: "ffffff",
      midgray: "a0a0a0",
      grey0: "000000",
      grey1: "111111",
      grey2: "222222",
      grey3: "333333",
      grey4: "444444",
      grey5: "555555",
      grey6: "666666",
      grey7: "777777",
      grey8: "888888",
      grey9: "999999",
      greya: "aaaaaa",
      greyb: "bbbbbb",
      greyc: "cccccc",
      greyd: "dddddd",
      greye: "eeeeee",
      greyf: "ffffff",
      midgrey: "a0a0a0",
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "00ffff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000000",
      blanchedalmond: "ffebcd",
      blue: "0000ff",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "00ffff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "ff00ff",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "778899",
      lightslategrey: "778899",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "00ff00",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "ff00ff",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "ff0000",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "ffffff",
      whitesmoke: "f5f5f5",
      yellow: "ffff00",
      yellowgreen: "9acd32"
    };
    for (let key in namedColors) {
      if (colorString == key) {
        let hexRex = {
          rex: /^([\da-f]{2})([\da-f]{2})([\da-f]{2})$/,
          sprig: function(slices) {
            for (let i = 0; i < 3; i++) {
              retArray[i] = parseInt(slices[i + 1], 16);
            }
            retArray[3] = 1;
            return true;
          }
        };
        let hexProc = hexRex.rex.exec(namedColors[key]);
        retArray[4] = isValid = hexRex.sprig(hexProc);
        return retArray;
      }
    }
  }
  ;
  let colorRex = {
    rex: /(?:^(?:#|0x|)(?:(?:([\da-f])([\da-f])([\da-f])([\da-f])?)(?!\S)|(?:([\da-f]{2})(?:([\da-f]{2})([\da-f]{2})([\da-f]{2})?)?))|(?:(?:^(?:rgba?|)\(? ?(?:(?:(?:(255|(?:25[0-4]|2[0-4]\d|1?\d{1,2})(?:\.\d{1,24})?)))(?:,[^\S]*$|(?:(?:, ?| )(255|(?:25[0-4]|2[0-4]\d|1?\d{1,2})(?:\.\d{1,24})?)(?:, ?| )(255|(?:25[0-4]|2[0-4]\d|1?\d{1,2})(?:\.\d{1,24})?)))|(100%|\d{1,2}(?:\.\d{1,24})?%)(?:,?[^\S]*$|(?:(?:, ?| )(?:(100%|\d{1,2}(?:\.\d{1,24})?%)(?:, ?| )(100%|\d{1,2}(?:\.\d{1,24})?%)))))|^(?:color\((srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|xyz|xyz-d50|xyz-d65) (?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])) (?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])) (?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])))|^(?:((?:r(?!gb)|c(?!olor)|[abd-qs-z])[a-z]{2,5})\( ?((?:\d{0,3}\.|)\d{1,24}%?)(?:, ?| )((?:\d{0,3}\.|)\d{1,24}%?)(?:, ?| )((?:\d{0,3}\.|)\d{1,24}%?))))(?:(?:,| \/| ) ?(?:(100%|\d{1,2}(?:\.\d{1,24})?%|[0 ]\.\d{1,24}|[01])))?(?:\)| |))[^\S]*$/,
    parsley: function(slices) {
      let slicePos = 0;
      let sliceLast = 0;
      let base = 10;
      let divisor = 100;
      let convertPct = 2.55;
      let alpha = "1";
      if (slices[23]) {
        alpha = slices[23];
        delete slices[23];
      }
      retArray[3] = alpha.match(/%/g) ? parseFloat(alpha) / divisor : parseFloat(alpha);
      for (let k = 1; k < slices.length; k++) {
        if (slices[k]) {
          slicePos = slicePos ? slicePos : k;
          sliceLast = k;
        }
      }
      switch (sliceLast) {
        case 4:
          base = 16;
          divisor = 15;
          retArray[3] = parseInt(slices[sliceLast], base) / divisor;
        case 3:
          base = 16;
          for (let i = 0; i < 3; i++) {
            retArray[i] = parseInt(slices[slicePos + i] + slices[slicePos + i], base);
          }
          break;
        case 5:
          base = 16;
        case 9:
          retArray[0] = retArray[1] = retArray[2] = base == 10 ? parseFloat(slices[sliceLast]) : parseInt(slices[sliceLast], base);
          break;
        case 12:
          retArray[0] = retArray[1] = retArray[2] = parseFloat(slices[sliceLast]) * convertPct;
          break;
        case 8:
          base = 16;
          divisor = 255;
          retArray[3] = parseInt(slices[8], base) / divisor;
        case 7:
          base = 16;
        case 11:
          for (let i = 0; i < 3; i++) {
            retArray[i] = base == 10 ? parseFloat(slices[slicePos + i]) : parseInt(slices[slicePos + i], base);
          }
          break;
        case 14:
          for (let i = 0; i < 3; i++) {
            retArray[i] = parseFloat(slices[slicePos + i]) * convertPct;
          }
          break;
        case 18:
          retArray[5] = slices[15];
          for (let i = 0; i < 3; i++) {
            slicePos++;
            retArray[i] = slices[slicePos].match(/%/g) ? parseFloat(slices[slicePos]) * 2.55 : parseFloat(slices[slicePos]) * 255;
          }
          break;
        case 22:
          retArray[5] = slices[slicePos];
          for (let i = 0; i < 3; i++) {
            slicePos++;
            retArray[i] = slices[slicePos] ? slices[slicePos].match(/%/g) ? parseFloat(slices[slicePos]) / divisor : parseFloat(slices[slicePos]) : 0;
          }
          if (retArray[5].match(/^(?:hsla?|hwba?)/i)) {
            let f = function(n) {
              let k = (n + hue / 30) % 12;
              let a = sat * Math.min(light, 1 - light);
              return light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
            };
            let sat, light, white, black, hwbFact;
            let hue = retArray[0] % 360;
            if (hue < 0) {
              hue += 360;
            }
            if (retArray[5].match(/^hsla?/i)) {
              sat = retArray[1];
              light = retArray[2];
              white = 0;
              hwbFact = 1;
            } else if (retArray[5].match(/^hwba?/i)) {
              white = retArray[1];
              black = retArray[2];
              if (white + black >= 1) {
                retArray[0] = retArray[1] = retArray[2] = white / (white + black);
                retArray[5] = "sRGB";
                break;
              }
              sat = 1;
              light = 0.5;
              hwbFact = 1 - white - black;
            }
            retArray[0] = Math.round(255 * (f(0) * hwbFact + white));
            retArray[1] = Math.round(255 * (f(8) * hwbFact + white));
            retArray[2] = Math.round(255 * (f(4) * hwbFact + white));
            retArray[5] = "sRGB";
          }
          break;
      }
      return true;
    }
    // close parsley sub-function
  };
  let slicesProc = colorRex.rex.exec(colorString);
  if (slicesProc) {
    retArray[4] = isValid = colorRex.parsley(slicesProc);
    return retArray;
  } else {
    isValid = false;
    console.log("colorParsley error: unable to parse string");
    return [0, 0, 0, 0, isValid, "parsleyError"];
  }
}
function colorToHex(rgba = [0, 0, 0, ""], allow3 = true) {
  let R = Math.round(rgba[0]).toString(16).padStart(2, "0");
  let G = Math.round(rgba[1]).toString(16).padStart(2, "0");
  let B = Math.round(rgba[2]).toString(16).padStart(2, "0");
  let A = rgba[3] == "" || rgba[3] == 1 ? "" : Math.round(rgba[3] * 255).toString(16).padStart(2, "0");
  if (allow3 && parseInt(A, 16) % 17 == 0 && parseInt(A, 16) % 17 == 0 && parseInt(A, 16) % 17 == 0 && (parseInt(A, 16) % 17 == 0 || A == "")) {
    return R.charAt(0) + G.charAt(0) + B.charAt(0) + A.charAt(0);
  } else {
    return R + G + B + A;
  }
}
function colorToRGB(rgba = [0, 0, 0, ""], round = true) {
  if (round) {
    for (let i = 0; i < 3; i++) {
      rgba[i] = Math.round(rgba[i]);
    }
    rgba[3] = rgba[3] == "" || rgba[3] == 1 ? 1 : Math.trunc(rgba[3] * 1e3) * 1e-3;
  }
  return rgba[3] == "" || rgba[3] == 1 ? "rgb(" + rgba[0] + "," + rgba[1] + "," + rgba[2] + ")" : "rgba(" + rgba[0] + "," + rgba[1] + "," + rgba[2] + "," + rgba[3] + ")";
}
export {
  colorParsley,
  colorToHex,
  colorToRGB
};
/*! Bundled license information:

colorparsley/src/colorparsley.js:
  (** @preserve
  /////    CoLoR PaRsLeY  a simple set of color parsing thingies!
  /////           Beta 0.1.8   Revision date: June 04, 2022
  /////
  /////    Functions to parse color values and return array
  /////    Copyright (c) 2019-2022 by Andrew Somers. All Rights Reserved.
  /////    LICENSE: AGPL 3
  /////    CONTACT: Please use the ISSUES or DISCUSSIONS tab at:
  /////    https://github.com/Myndex/colorparsley/
  /////
  ///////////////////////////////////////////////////////////////////////////////
  /////
  /////    IMPORT:
  /////    import { colorParsley } from 'colorparsley';
  /////
  /////    let rgbaArray = colorParsley('#abcdef');
  /////
  /////    Output as array:  [r,g,b,a,isValid,colorspace]
  /////    Example: [123,123,123,1.0,true,'sRGB']
  // *)
*/
//# sourceMappingURL=colorparsley.js.map
