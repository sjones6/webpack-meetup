/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/hyperapp/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/hyperapp/src/index.js ***!
  \********************************************/
/*! exports provided: h, app */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"h\", function() { return h; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"app\", function() { return app; });\nfunction h(name, attributes) {\n  var rest = []\n  var children = []\n  var length = arguments.length\n\n  while (length-- > 2) rest.push(arguments[length])\n\n  while (rest.length) {\n    var node = rest.pop()\n    if (node && node.pop) {\n      for (length = node.length; length--; ) {\n        rest.push(node[length])\n      }\n    } else if (node != null && node !== true && node !== false) {\n      children.push(node)\n    }\n  }\n\n  return typeof name === \"function\"\n    ? name(attributes || {}, children)\n    : {\n        nodeName: name,\n        attributes: attributes || {},\n        children: children,\n        key: attributes && attributes.key\n      }\n}\n\nfunction app(state, actions, view, container) {\n  var map = [].map\n  var rootElement = (container && container.children[0]) || null\n  var oldNode = rootElement && recycleElement(rootElement)\n  var lifecycle = []\n  var skipRender\n  var isRecycling = true\n  var globalState = clone(state)\n  var wiredActions = wireStateToActions([], globalState, clone(actions))\n\n  scheduleRender()\n\n  return wiredActions\n\n  function recycleElement(element) {\n    return {\n      nodeName: element.nodeName.toLowerCase(),\n      attributes: {},\n      children: map.call(element.childNodes, function(element) {\n        return element.nodeType === 3 // Node.TEXT_NODE\n          ? element.nodeValue\n          : recycleElement(element)\n      })\n    }\n  }\n\n  function resolveNode(node) {\n    return typeof node === \"function\"\n      ? resolveNode(node(globalState, wiredActions))\n      : node != null\n        ? node\n        : \"\"\n  }\n\n  function render() {\n    skipRender = !skipRender\n\n    var node = resolveNode(view)\n\n    if (container && !skipRender) {\n      rootElement = patch(container, rootElement, oldNode, (oldNode = node))\n    }\n\n    isRecycling = false\n\n    while (lifecycle.length) lifecycle.pop()()\n  }\n\n  function scheduleRender() {\n    if (!skipRender) {\n      skipRender = true\n      setTimeout(render)\n    }\n  }\n\n  function clone(target, source) {\n    var out = {}\n\n    for (var i in target) out[i] = target[i]\n    for (var i in source) out[i] = source[i]\n\n    return out\n  }\n\n  function setPartialState(path, value, source) {\n    var target = {}\n    if (path.length) {\n      target[path[0]] =\n        path.length > 1\n          ? setPartialState(path.slice(1), value, source[path[0]])\n          : value\n      return clone(source, target)\n    }\n    return value\n  }\n\n  function getPartialState(path, source) {\n    var i = 0\n    while (i < path.length) {\n      source = source[path[i++]]\n    }\n    return source\n  }\n\n  function wireStateToActions(path, state, actions) {\n    for (var key in actions) {\n      typeof actions[key] === \"function\"\n        ? (function(key, action) {\n            actions[key] = function(data) {\n              var result = action(data)\n\n              if (typeof result === \"function\") {\n                result = result(getPartialState(path, globalState), actions)\n              }\n\n              if (\n                result &&\n                result !== (state = getPartialState(path, globalState)) &&\n                !result.then // !isPromise\n              ) {\n                scheduleRender(\n                  (globalState = setPartialState(\n                    path,\n                    clone(state, result),\n                    globalState\n                  ))\n                )\n              }\n\n              return result\n            }\n          })(key, actions[key])\n        : wireStateToActions(\n            path.concat(key),\n            (state[key] = clone(state[key])),\n            (actions[key] = clone(actions[key]))\n          )\n    }\n\n    return actions\n  }\n\n  function getKey(node) {\n    return node ? node.key : null\n  }\n\n  function eventListener(event) {\n    return event.currentTarget.events[event.type](event)\n  }\n\n  function updateAttribute(element, name, value, oldValue, isSvg) {\n    if (name === \"key\") {\n    } else if (name === \"style\") {\n      if (typeof value === \"string\") {\n        element.style.cssText = value\n      } else {\n        if (typeof oldValue === \"string\") oldValue = element.style.cssText = \"\"\n        for (var i in clone(oldValue, value)) {\n          var style = value == null || value[i] == null ? \"\" : value[i]\n          if (i[0] === \"-\") {\n            element.style.setProperty(i, style)\n          } else {\n            element.style[i] = style\n          }\n        }\n      }\n    } else {\n      if (name[0] === \"o\" && name[1] === \"n\") {\n        name = name.slice(2)\n\n        if (element.events) {\n          if (!oldValue) oldValue = element.events[name]\n        } else {\n          element.events = {}\n        }\n\n        element.events[name] = value\n\n        if (value) {\n          if (!oldValue) {\n            element.addEventListener(name, eventListener)\n          }\n        } else {\n          element.removeEventListener(name, eventListener)\n        }\n      } else if (\n        name in element &&\n        name !== \"list\" &&\n        name !== \"type\" &&\n        name !== \"draggable\" &&\n        name !== \"spellcheck\" &&\n        name !== \"translate\" &&\n        !isSvg\n      ) {\n        element[name] = value == null ? \"\" : value\n      } else if (value != null && value !== false) {\n        element.setAttribute(name, value)\n      }\n\n      if (value == null || value === false) {\n        element.removeAttribute(name)\n      }\n    }\n  }\n\n  function createElement(node, isSvg) {\n    var element =\n      typeof node === \"string\" || typeof node === \"number\"\n        ? document.createTextNode(node)\n        : (isSvg = isSvg || node.nodeName === \"svg\")\n          ? document.createElementNS(\n              \"http://www.w3.org/2000/svg\",\n              node.nodeName\n            )\n          : document.createElement(node.nodeName)\n\n    var attributes = node.attributes\n    if (attributes) {\n      if (attributes.oncreate) {\n        lifecycle.push(function() {\n          attributes.oncreate(element)\n        })\n      }\n\n      for (var i = 0; i < node.children.length; i++) {\n        element.appendChild(\n          createElement(\n            (node.children[i] = resolveNode(node.children[i])),\n            isSvg\n          )\n        )\n      }\n\n      for (var name in attributes) {\n        updateAttribute(element, name, attributes[name], null, isSvg)\n      }\n    }\n\n    return element\n  }\n\n  function updateElement(element, oldAttributes, attributes, isSvg) {\n    for (var name in clone(oldAttributes, attributes)) {\n      if (\n        attributes[name] !==\n        (name === \"value\" || name === \"checked\"\n          ? element[name]\n          : oldAttributes[name])\n      ) {\n        updateAttribute(\n          element,\n          name,\n          attributes[name],\n          oldAttributes[name],\n          isSvg\n        )\n      }\n    }\n\n    var cb = isRecycling ? attributes.oncreate : attributes.onupdate\n    if (cb) {\n      lifecycle.push(function() {\n        cb(element, oldAttributes)\n      })\n    }\n  }\n\n  function removeChildren(element, node) {\n    var attributes = node.attributes\n    if (attributes) {\n      for (var i = 0; i < node.children.length; i++) {\n        removeChildren(element.childNodes[i], node.children[i])\n      }\n\n      if (attributes.ondestroy) {\n        attributes.ondestroy(element)\n      }\n    }\n    return element\n  }\n\n  function removeElement(parent, element, node) {\n    function done() {\n      parent.removeChild(removeChildren(element, node))\n    }\n\n    var cb = node.attributes && node.attributes.onremove\n    if (cb) {\n      cb(element, done)\n    } else {\n      done()\n    }\n  }\n\n  function patch(parent, element, oldNode, node, isSvg) {\n    if (node === oldNode) {\n    } else if (oldNode == null || oldNode.nodeName !== node.nodeName) {\n      var newElement = createElement(node, isSvg)\n      parent.insertBefore(newElement, element)\n\n      if (oldNode != null) {\n        removeElement(parent, element, oldNode)\n      }\n\n      element = newElement\n    } else if (oldNode.nodeName == null) {\n      element.nodeValue = node\n    } else {\n      updateElement(\n        element,\n        oldNode.attributes,\n        node.attributes,\n        (isSvg = isSvg || node.nodeName === \"svg\")\n      )\n\n      var oldKeyed = {}\n      var newKeyed = {}\n      var oldElements = []\n      var oldChildren = oldNode.children\n      var children = node.children\n\n      for (var i = 0; i < oldChildren.length; i++) {\n        oldElements[i] = element.childNodes[i]\n\n        var oldKey = getKey(oldChildren[i])\n        if (oldKey != null) {\n          oldKeyed[oldKey] = [oldElements[i], oldChildren[i]]\n        }\n      }\n\n      var i = 0\n      var k = 0\n\n      while (k < children.length) {\n        var oldKey = getKey(oldChildren[i])\n        var newKey = getKey((children[k] = resolveNode(children[k])))\n\n        if (newKeyed[oldKey]) {\n          i++\n          continue\n        }\n\n        if (newKey != null && newKey === getKey(oldChildren[i + 1])) {\n          if (oldKey == null) {\n            removeElement(element, oldElements[i], oldChildren[i])\n          }\n          i++\n          continue\n        }\n\n        if (newKey == null || isRecycling) {\n          if (oldKey == null) {\n            patch(element, oldElements[i], oldChildren[i], children[k], isSvg)\n            k++\n          }\n          i++\n        } else {\n          var keyedNode = oldKeyed[newKey] || []\n\n          if (oldKey === newKey) {\n            patch(element, keyedNode[0], keyedNode[1], children[k], isSvg)\n            i++\n          } else if (keyedNode[0]) {\n            patch(\n              element,\n              element.insertBefore(keyedNode[0], oldElements[i]),\n              keyedNode[1],\n              children[k],\n              isSvg\n            )\n          } else {\n            patch(element, oldElements[i], null, children[k], isSvg)\n          }\n\n          newKeyed[newKey] = children[k]\n          k++\n        }\n      }\n\n      while (i < oldChildren.length) {\n        if (getKey(oldChildren[i]) == null) {\n          removeElement(element, oldElements[i], oldChildren[i])\n        }\n        i++\n      }\n\n      for (var i in oldKeyed) {\n        if (!newKeyed[i]) {\n          removeElement(element, oldKeyed[i][0], oldKeyed[i][1])\n        }\n      }\n    }\n    return element\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/hyperapp/src/index.js?");

/***/ }),

/***/ "./src/actions.js":
/*!************************!*\
  !*** ./src/actions.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _make_color_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./make_color_string.js */ \"./src/make_color_string.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  setColor: function setColor() {\n    return function () {\n      return {\n        color: Object(_make_color_string_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\n      };\n    };\n  },\n  startCyclingColors: function startCyclingColors() {\n    return function (state, actions) {\n      return {\n        interval: setInterval(actions.setColor, 500)\n      };\n    };\n  },\n  stopCyclingColors: function stopCyclingColors() {\n    return function (state, actions) {\n      state.interval && clearInterval(state.interval);\n      return {\n        interval: null\n      };\n    };\n  }\n});\n\n//# sourceURL=webpack:///./src/actions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var hyperapp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hyperapp */ \"./node_modules/hyperapp/src/index.js\");\n/* harmony import */ var _actions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions.js */ \"./src/actions.js\");\n/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view.js */ \"./src/view.js\");\n/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state.js */ \"./src/state.js\");\n\n\n\n\nObject(hyperapp__WEBPACK_IMPORTED_MODULE_0__[\"app\"])(_state_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _actions_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _view_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], document.body);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/make_color_string.js":
/*!**********************************!*\
  !*** ./src/make_color_string.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction getRandom() {\n  return Math.floor(Math.random() * 255);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  return 'rgb(' + [getRandom(), getRandom(), getRandom()].join(', ') + ')';\n});\n\n//# sourceURL=webpack:///./src/make_color_string.js?");

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  color: 'rgb(0,0,0)',\n  interval: null\n});\n\n//# sourceURL=webpack:///./src/state.js?");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(h) {/* harmony default export */ __webpack_exports__[\"default\"] = (function (state, actions) {\n  return h(\"div\", null, h(\"h1\", {\n    id: \"title\",\n    style: \"color: \" + state.color\n  }, \"Yay, Hyperapp and JSX! \", h(\"span\", null, state.color)), h(\"button\", {\n    onclick: state.interval ? actions.stopCyclingColors : actions.startCyclingColors\n  }, state.interval ? 'stop ' : 'start', \" cycling colors\"));\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! hyperapp */ \"./node_modules/hyperapp/src/index.js\")[\"h\"]))\n\n//# sourceURL=webpack:///./src/view.js?");

/***/ })

/******/ });