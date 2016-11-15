/**
 * Validate function implements..
 */
(function() {
  'use strict';
  var Akapen = require('./akapen');

  Akapen.validators.maxlength = function(n, node) {
    if (node.value.length > n) {
      return true;
    }
    return false;
  };
  Akapen.messages.maxlength = function(n) {
    return n + '文字を超えています';
  };
  Akapen.reactions.maxlength = function(message, node) {
    var error = document.createElement('p');
    error.className = "akapen-error";
    error.textContent = message;
    node.parentNode.insertBefore(error, node.nextSibling);
  };
  Akapen.validators.maxlengthLine = function(n, node){
    var lines = node.value.split("\n");

    var isOver = lines.some(function(line) {
      if (line.length > n) {
        return true;
      }
      return false;
    });
    return isOver;
  };
  Akapen.messages.maxlengthLine = function(n) {
    return n + '文字を超えています';
  };

  Akapen.reactions.maxlengthLine = function(message, node) {
    var error = document.createElement('p');
    error.className = "akapen-error";
    error.textContent = message;
    node.parentNode.insertBefore(error, node.nextSibling);
  };

  Akapen.init();
})();
