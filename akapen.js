/**
 * Akapen (Realtime validation framework)
 */
var Akapen = (function() {
  'use strict';
  /**
   * validator objects.
   */
  var validators = {};
  var messages = {};
  var reactions = {};

  var parser = CustomDataParser;

  /**
   * Initialize.
   * set event to "data-*" attributed object.
   */
  var init = function() {
    for (var aValidator in validators) {
      (function(_aValidator) {
        var nameCamel = parser.toFirstUpper(aValidator);
        var nameSnake = parser.toSnake(aValidator, '-');
        var targets = document.querySelectorAll('[data-akapen-' + nameSnake + ']');

        Array.prototype.forEach.call(targets, function(node) {
          var n = node.dataset['akapen' + nameCamel];

          // just after load
          var isError = validators[_aValidator](n, node);
          var message = messages[_aValidator](n);
          if (isError) {
            reactions[_aValidator](message, node);
          }


          (function(_n, _node) {
            _node.addEventListener("input", function() {
              deletePreviousError(_node);
              var isError = validators[_aValidator](n, node);
              var message = messages[_aValidator](n);
              if (isError) {
                reactions[_aValidator](message, node);
              }
            }, false);
          })(n, node);
        });
      })(aValidator);
    }
  };

  /**
   * Delete previous error
   */
  var deletePreviousError = function(node) {
    if (node.nextSibling && node.nextSibling.className === 'akapen-error') {
      node.parentNode.removeChild(node.nextSibling);
    }
  };

  return {
    validators: validators,
    messages: messages,
    reactions: reactions,
    init: init
  };
})();
