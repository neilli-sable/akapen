/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Validate function implements..
	 */
	(function() {
	  'use strict';
	  var Akapen = __webpack_require__(1);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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
	
	  var parser = __webpack_require__(2);
	
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
	
	module.exports = Akapen;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWJmNWY4ODc4ZmRhMTI2OGYxY2MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FrYXBlbi1pbXBsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FrYXBlbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY3VzdG9tLWRhdGEtcGFyc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOzs7Ozs7O0FDN0NEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsWUFBVztBQUNYLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRCIsImZpbGUiOiIuL2J1aWxkL2FrYXBlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGViZjVmODg3OGZkYTEyNjhmMWNjIiwiLyoqXG4gKiBWYWxpZGF0ZSBmdW5jdGlvbiBpbXBsZW1lbnRzLi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBBa2FwZW4gPSByZXF1aXJlKCcuL2FrYXBlbicpO1xuXG4gIEFrYXBlbi52YWxpZGF0b3JzLm1heGxlbmd0aCA9IGZ1bmN0aW9uKG4sIG5vZGUpIHtcbiAgICBpZiAobm9kZS52YWx1ZS5sZW5ndGggPiBuKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuICBBa2FwZW4ubWVzc2FnZXMubWF4bGVuZ3RoID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBuICsgJ+aWh+Wtl+OCkui2heOBiOOBpuOBhOOBvuOBmSc7XG4gIH07XG4gIEFrYXBlbi5yZWFjdGlvbnMubWF4bGVuZ3RoID0gZnVuY3Rpb24obWVzc2FnZSwgbm9kZSkge1xuICAgIHZhciBlcnJvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBlcnJvci5jbGFzc05hbWUgPSBcImFrYXBlbi1lcnJvclwiO1xuICAgIGVycm9yLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVycm9yLCBub2RlLm5leHRTaWJsaW5nKTtcbiAgfTtcbiAgQWthcGVuLnZhbGlkYXRvcnMubWF4bGVuZ3RoTGluZSA9IGZ1bmN0aW9uKG4sIG5vZGUpe1xuICAgIHZhciBsaW5lcyA9IG5vZGUudmFsdWUuc3BsaXQoXCJcXG5cIik7XG5cbiAgICB2YXIgaXNPdmVyID0gbGluZXMuc29tZShmdW5jdGlvbihsaW5lKSB7XG4gICAgICBpZiAobGluZS5sZW5ndGggPiBuKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIHJldHVybiBpc092ZXI7XG4gIH07XG4gIEFrYXBlbi5tZXNzYWdlcy5tYXhsZW5ndGhMaW5lID0gZnVuY3Rpb24obikge1xuICAgIHJldHVybiBuICsgJ+aWh+Wtl+OCkui2heOBiOOBpuOBhOOBvuOBmSc7XG4gIH07XG5cbiAgQWthcGVuLnJlYWN0aW9ucy5tYXhsZW5ndGhMaW5lID0gZnVuY3Rpb24obWVzc2FnZSwgbm9kZSkge1xuICAgIHZhciBlcnJvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBlcnJvci5jbGFzc05hbWUgPSBcImFrYXBlbi1lcnJvclwiO1xuICAgIGVycm9yLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICBub2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVycm9yLCBub2RlLm5leHRTaWJsaW5nKTtcbiAgfTtcblxuICBBa2FwZW4uaW5pdCgpO1xufSkoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2FrYXBlbi1pbXBsZW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBBa2FwZW4gKFJlYWx0aW1lIHZhbGlkYXRpb24gZnJhbWV3b3JrKVxuICovXG52YXIgQWthcGVuID0gKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG4gIC8qKlxuICAgKiB2YWxpZGF0b3Igb2JqZWN0cy5cbiAgICovXG4gIHZhciB2YWxpZGF0b3JzID0ge307XG4gIHZhciBtZXNzYWdlcyA9IHt9O1xuICB2YXIgcmVhY3Rpb25zID0ge307XG5cbiAgdmFyIHBhcnNlciA9IHJlcXVpcmUoJy4vY3VzdG9tLWRhdGEtcGFyc2VyJyk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUuXG4gICAqIHNldCBldmVudCB0byBcImRhdGEtKlwiIGF0dHJpYnV0ZWQgb2JqZWN0LlxuICAgKi9cbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBhVmFsaWRhdG9yIGluIHZhbGlkYXRvcnMpIHtcbiAgICAgIChmdW5jdGlvbihfYVZhbGlkYXRvcikge1xuICAgICAgICB2YXIgbmFtZUNhbWVsID0gcGFyc2VyLnRvRmlyc3RVcHBlcihhVmFsaWRhdG9yKTtcbiAgICAgICAgdmFyIG5hbWVTbmFrZSA9IHBhcnNlci50b1NuYWtlKGFWYWxpZGF0b3IsICctJyk7XG4gICAgICAgIHZhciB0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWthcGVuLScgKyBuYW1lU25ha2UgKyAnXScpO1xuXG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodGFyZ2V0cywgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIHZhciBuID0gbm9kZS5kYXRhc2V0Wydha2FwZW4nICsgbmFtZUNhbWVsXTtcblxuICAgICAgICAgIC8vIGp1c3QgYWZ0ZXIgbG9hZFxuICAgICAgICAgIHZhciBpc0Vycm9yID0gdmFsaWRhdG9yc1tfYVZhbGlkYXRvcl0obiwgbm9kZSk7XG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBtZXNzYWdlc1tfYVZhbGlkYXRvcl0obik7XG4gICAgICAgICAgaWYgKGlzRXJyb3IpIHtcbiAgICAgICAgICAgIHJlYWN0aW9uc1tfYVZhbGlkYXRvcl0obWVzc2FnZSwgbm9kZSk7XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICAoZnVuY3Rpb24oX24sIF9ub2RlKSB7XG4gICAgICAgICAgICBfbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGRlbGV0ZVByZXZpb3VzRXJyb3IoX25vZGUpO1xuICAgICAgICAgICAgICB2YXIgaXNFcnJvciA9IHZhbGlkYXRvcnNbX2FWYWxpZGF0b3JdKG4sIG5vZGUpO1xuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IG1lc3NhZ2VzW19hVmFsaWRhdG9yXShuKTtcbiAgICAgICAgICAgICAgaWYgKGlzRXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWFjdGlvbnNbX2FWYWxpZGF0b3JdKG1lc3NhZ2UsIG5vZGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgfSkobiwgbm9kZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSkoYVZhbGlkYXRvcik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBEZWxldGUgcHJldmlvdXMgZXJyb3JcbiAgICovXG4gIHZhciBkZWxldGVQcmV2aW91c0Vycm9yID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLm5leHRTaWJsaW5nICYmIG5vZGUubmV4dFNpYmxpbmcuY2xhc3NOYW1lID09PSAnYWthcGVuLWVycm9yJykge1xuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUubmV4dFNpYmxpbmcpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnMsXG4gICAgbWVzc2FnZXM6IG1lc3NhZ2VzLFxuICAgIHJlYWN0aW9uczogcmVhY3Rpb25zLFxuICAgIGluaXQ6IGluaXRcbiAgfTtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gQWthcGVuO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYWthcGVuLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ3VzdG9tRGF0YVBhcnNlclxuICovXG52YXIgQ3VzdG9tRGF0YVBhcnNlciA9IChmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0b0NhbWVsID0gZnVuY3Rpb24oc25ha2UpIHtcbiAgICB2YXIgY2FtZWwgPSBzbmFrZVxuICAgICAgLnJlcGxhY2UoL15bLV9dL2csICcnKVxuICAgICAgLnJlcGxhY2UoL1stX10uL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiBtYXRjaC5jaGFyQXQoMSkudG9VcHBlckNhc2UoKTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGNhbWVsO1xuICB9O1xuXG4gIHZhciB0b1NuYWtlID0gZnVuY3Rpb24oY2FtZWwsIHNlcGFyYXRvcikge1xuICAgIHNlcGFyYXRvciA9IHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkID8gJy0nIDogc2VwYXJhdG9yO1xuXG4gICAgdmFyIHNuYWtlID0gY2FtZWxcbiAgICAgIC5yZXBsYWNlKC9eW0EtWl0rJC8sIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICByZXR1cm4gbWF0Y2gudG9Mb3dlckNhc2UoKTtcbiAgICAgIH0pXG4gICAgICAucmVwbGFjZSgvXltBLVpdKy8sIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoLnJlcGxhY2UoL1tBLVpdJC8sIGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgICAgIHJldHVybiBzZXBhcmF0b3IgKyBtLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgfSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbWF0Y2gudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5yZXBsYWNlKC9bQS1aXSskL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICAgIHJldHVybiBzZXBhcmF0b3IgKyBtYXRjaC50b0xvd2VyQ2FzZSgpO1xuICAgICAgfSlcbiAgICAgIC5yZXBsYWNlKC9bQS1aXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICByZXR1cm4gc2VwYXJhdG9yICsgbWF0Y2gudG9Mb3dlckNhc2UoKTtcbiAgICAgIH0pXG4gICAgICA7XG5cbiAgICByZXR1cm4gc25ha2U7XG4gIH07XG5cbiAgdmFyIHRvRmlyc3RVcHBlciA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICB0b0NhbWVsOiB0b0NhbWVsLFxuICAgIHRvU25ha2U6IHRvU25ha2UsXG4gICAgdG9GaXJzdFVwcGVyOiB0b0ZpcnN0VXBwZXJcbiAgfTtcbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ3VzdG9tRGF0YVBhcnNlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2N1c3RvbS1kYXRhLXBhcnNlci5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9