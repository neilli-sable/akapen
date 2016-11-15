/**
 * CustomDataParser
 */
var CustomDataParser = (function() {
  'use strict';

  var toCamel = function(snake) {
    var camel = snake
      .replace(/^[-_]/g, '')
      .replace(/[-_]./g, function(match) {
        return match.charAt(1).toUpperCase();
      });

    return camel;
  };

  var toSnake = function(camel, separator) {
    separator = separator === undefined ? '-' : separator;

    var snake = camel
      .replace(/^[A-Z]+$/, function (match) {
        return match.toLowerCase();
      })
      .replace(/^[A-Z]+/, function(match) {
        if (match.length > 1) {
          return match.replace(/[A-Z]$/, function(m) {
            return separator + m.toLowerCase();
          }).toLowerCase();
        } else {
          return match.toLowerCase();
        }
      })
      .replace(/[A-Z]+$/g, function(match) {
        return separator + match.toLowerCase();
      })
      .replace(/[A-Z]/g, function(match) {
        return separator + match.toLowerCase();
      })
      ;

    return snake;
  };

  var toFirstUpper = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return {
    toCamel: toCamel,
    toSnake: toSnake,
    toFirstUpper: toFirstUpper
  };
}());

module.exports = CustomDataParser;
