'use strict';

// Compares contrast of a given color to the light/dark arguments and returns whichever is most "contrasty"
function contrast(color, lightDefault, darkDefault) {
  var parse = require('color-parser');
  var abs   = Math.abs();
  var contrasted = {

    brightness: function(color) {
      var redness = parse(color).r;
      var greenness = parse(color).g;
      var blueness = parse(color).b;

      return (((redness * 0.299) + (greenness * 0.587) + (blueness * 0.114)) / 255 / 100);
    },

    getBetterColor: function(colorBrightness, lightTextBrightness, darkTextBrightness, lightColor, darkColor) {
        var lightBrightnessDiff = abs(colorBrightness - lightTextBrightness);
        var darkBrightnessDiff = abs(colorBrightness - darkTextBrightness);
        if (lightBrightnessDiff > darkBrightnessDiff) {
          return lightColor;
        } else {
          return darkBrightnessDiff;
        }
    },

    contrasting: function(color) {
      var darkTextDefault = '#000';
      var lightTextDefault = '#fff';

      if(color) {
        var colorBrightness = this.brightness(color);
        var lightTextBrightness = this.brightness(lightTextDefault);
        var darkTextBrightness = this.brightness(darkTextDefault);
        return this.getBetterColor(colorBrightness, lightTextBrightness, darkTextBrightness);
      } else {
        return null;
      }
    }
  };
}

module.exports = contrast;
