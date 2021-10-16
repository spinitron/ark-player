(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var check = function (it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global$f = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  function () {
    return this;
  }() || Function('return this')();

  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods

  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  // https://tc39.es/ecma262/#sec-iscallable

  var isCallable$e = function (argument) {
    return typeof argument === 'function';
  };

  var isCallable$d = isCallable$e;

  var isObject$9 = function (it) {
    return typeof it === 'object' ? it !== null : isCallable$d(it);
  };

  var global$e = global$f;
  var isObject$8 = isObject$9;
  var document$1 = global$e.document; // typeof document.createElement is 'object' in old IE

  var EXISTS$1 = isObject$8(document$1) && isObject$8(document$1.createElement);

  var documentCreateElement$2 = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  var documentCreateElement$1 = documentCreateElement$2;
  var classList = documentCreateElement$1('span').classList;
  var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;
  var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

  var tryToString$1 = function (argument) {
    try {
      return String(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var isCallable$c = isCallable$e;
  var tryToString = tryToString$1; // `Assert: IsCallable(argument) is true`

  var aCallable$2 = function (argument) {
    if (isCallable$c(argument)) return argument;
    throw TypeError(tryToString(argument) + ' is not a function');
  };

  var aCallable$1 = aCallable$2; // optional / simple context binding

  var functionBindContext = function (fn, that, length) {
    aCallable$1(fn);
    if (that === undefined) return fn;

    switch (length) {
      case 0:
        return function () {
          return fn.call(that);
        };

      case 1:
        return function (a) {
          return fn.call(that, a);
        };

      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };

      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }

    return function () {
      return fn.apply(that, arguments);
    };
  };

  var fails$f = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var toString$9 = {}.toString;

  var classofRaw$1 = function (it) {
    return toString$9.call(it).slice(8, -1);
  };

  var fails$e = fails$f;
  var classof$6 = classofRaw$1;
  var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails$e(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$6(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // https://tc39.es/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible$9 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  var requireObjectCoercible$8 = requireObjectCoercible$9; // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject

  var toObject$5 = function (argument) {
    return Object(requireObjectCoercible$8(argument));
  };

  var ceil$1 = Math.ceil;
  var floor$1 = Math.floor; // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity

  var toIntegerOrInfinity$5 = function (argument) {
    var number = +argument; // eslint-disable-next-line no-self-compare -- safe

    return number !== number || number === 0 ? 0 : (number > 0 ? floor$1 : ceil$1)(number);
  };

  var toIntegerOrInfinity$4 = toIntegerOrInfinity$5;
  var min$2 = Math.min; // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength

  var toLength$4 = function (argument) {
    return argument > 0 ? min$2(toIntegerOrInfinity$4(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$3 = toLength$4; // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike

  var lengthOfArrayLike$4 = function (obj) {
    return toLength$3(obj.length);
  };

  var classof$5 = classofRaw$1; // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe

  var isArray$3 = Array.isArray || function isArray(argument) {
    return classof$5(argument) == 'Array';
  };

  var shared$4 = {exports: {}};

  var global$d = global$f;

  var setGlobal$3 = function (key, value) {
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty(global$d, key, {
        value: value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global$d[key] = value;
    }

    return value;
  };

  var global$c = global$f;
  var setGlobal$2 = setGlobal$3;
  var SHARED = '__core-js_shared__';
  var store$3 = global$c[SHARED] || setGlobal$2(SHARED, {});
  var sharedStore = store$3;

  var store$2 = sharedStore;
  (shared$4.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.18.3',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var toObject$4 = toObject$5;
  var hasOwnProperty = {}.hasOwnProperty; // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty

  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$4(it), key);
  };

  var id = 0;
  var postfix = Math.random();

  var uid$2 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var global$b = global$f;
  var isCallable$b = isCallable$e;

  var aFunction = function (argument) {
    return isCallable$b(argument) ? argument : undefined;
  };

  var getBuiltIn$5 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$b[namespace]) : global$b[namespace] && global$b[namespace][method];
  };

  var getBuiltIn$4 = getBuiltIn$5;
  var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || '';

  var global$a = global$f;
  var userAgent$1 = engineUserAgent;
  var process = global$a.process;
  var Deno = global$a.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] < 4 ? 1 : match[0] + match[1];
  } else if (userAgent$1) {
    match = userAgent$1.match(/Edge\/(\d+)/);

    if (!match || match[1] >= 74) {
      match = userAgent$1.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  /* eslint-disable es/no-symbol -- required for testing */
  var V8_VERSION$2 = engineV8Version;
  var fails$d = fails$f; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$d(function () {
    var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

  var global$9 = global$f;
  var shared$3 = shared$4.exports;
  var hasOwn$6 = hasOwnProperty_1;
  var uid$1 = uid$2;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
  var WellKnownSymbolsStore = shared$3('wks');
  var Symbol$1 = global$9.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

  var wellKnownSymbol$d = function (name) {
    if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      if (NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
      }
    }

    return WellKnownSymbolsStore[name];
  };

  var wellKnownSymbol$c = wellKnownSymbol$d;
  var TO_STRING_TAG$1 = wellKnownSymbol$c('toStringTag');
  var test = {};
  test[TO_STRING_TAG$1] = 'z';
  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var isCallable$a = isCallable$e;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$b = wellKnownSymbol$d;
  var TO_STRING_TAG = wellKnownSymbol$b('toStringTag'); // ES3 wrong here

  var CORRECT_ARGUMENTS = classofRaw(function () {
    return arguments;
  }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  }; // getting tag from ES6+ `Object.prototype.toString`


  var classof$4 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$a(O.callee) ? 'Arguments' : result;
  };

  var isCallable$9 = isCallable$e;
  var store$1 = sharedStore;
  var functionToString = Function.toString; // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

  if (!isCallable$9(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$3 = store$1.inspectSource;

  var fails$c = fails$f;
  var isCallable$8 = isCallable$e;
  var classof$3 = classof$4;
  var getBuiltIn$3 = getBuiltIn$5;
  var inspectSource$2 = inspectSource$3;
  var empty = [];
  var construct = getBuiltIn$3('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$1 = constructorRegExp.exec;
  var INCORRECT_TO_STRING = !constructorRegExp.exec(function () {
    /* empty */
  });

  var isConstructorModern = function (argument) {
    if (!isCallable$8(argument)) return false;

    try {
      construct(Object, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function (argument) {
    if (!isCallable$8(argument)) return false;

    switch (classof$3(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction':
        return false;
      // we can't check .prototype since constructors produced by .bind haven't it
    }

    return INCORRECT_TO_STRING || !!exec$1.call(constructorRegExp, inspectSource$2(argument));
  }; // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor


  var isConstructor$2 = !construct || fails$c(function () {
    var called;
    return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
      called = true;
    }) || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var isArray$2 = isArray$3;
  var isConstructor$1 = isConstructor$2;
  var isObject$7 = isObject$9;
  var wellKnownSymbol$a = wellKnownSymbol$d;
  var SPECIES$3 = wellKnownSymbol$a('species'); // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;

    if (isArray$2(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (isConstructor$1(C) && (C === Array || isArray$2(C.prototype))) C = undefined;else if (isObject$7(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    }

    return C === undefined ? Array : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1; // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesCreate$2 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind = functionBindContext;
  var IndexedObject$1 = indexedObject;
  var toObject$3 = toObject$5;
  var lengthOfArrayLike$3 = lengthOfArrayLike$4;
  var arraySpeciesCreate$1 = arraySpeciesCreate$2;
  var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

  var createMethod$3 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$3($this);
      var self = IndexedObject$1(O);
      var boundFunction = bind(callbackfn, that, 3);
      var length = lengthOfArrayLike$3(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$1;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;

      for (; length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);

        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3:
              return true;
            // some

            case 5:
              return value;
            // find

            case 6:
              return index;
            // findIndex

            case 2:
              push.call(target, value);
            // filter
          } else switch (TYPE) {
            case 4:
              return false;
            // every

            case 7:
              push.call(target, value);
            // filterReject
          }
        }
      }

      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$3(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$3(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$3(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$3(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$3(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$3(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$3(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$3(7)
  };

  var fails$b = fails$f;

  var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$b(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () {
        throw 1;
      }, 1);
    });
  };

  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict = arrayMethodIsStrict$1;
  var STRICT_METHOD = arrayMethodIsStrict('forEach'); // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach

  var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn
  /* , thisArg */
  ) {
    return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var fails$a = fails$f; // Detect IE8's incomplete defineProperty implementation

  var descriptors = !fails$a(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1] != 7;
  });

  var objectDefineProperty = {};

  var DESCRIPTORS$5 = descriptors;
  var fails$9 = fails$f;
  var createElement = documentCreateElement$2; // Thank's IE8 for his funny defineProperty

  var ie8DomDefine = !DESCRIPTORS$5 && !fails$9(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () {
        return 7;
      }
    }).a != 7;
  });

  var isObject$6 = isObject$9; // `Assert: Type(argument) is Object`

  var anObject$8 = function (argument) {
    if (isObject$6(argument)) return argument;
    throw TypeError(String(argument) + ' is not an object');
  };

  var isCallable$7 = isCallable$e;
  var getBuiltIn$2 = getBuiltIn$5;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var isSymbol$2 = USE_SYMBOL_AS_UID ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$2('Symbol');
    return isCallable$7($Symbol) && Object(it) instanceof $Symbol;
  };

  var aCallable = aCallable$2; // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod

  var getMethod$4 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable(func);
  };

  var isCallable$6 = isCallable$e;
  var isObject$5 = isObject$9; // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive

  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$6(fn = input.toString) && !isObject$5(val = fn.call(input))) return val;
    if (isCallable$6(fn = input.valueOf) && !isObject$5(val = fn.call(input))) return val;
    if (pref !== 'string' && isCallable$6(fn = input.toString) && !isObject$5(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var isObject$4 = isObject$9;
  var isSymbol$1 = isSymbol$2;
  var getMethod$3 = getMethod$4;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$9 = wellKnownSymbol$d;
  var TO_PRIMITIVE = wellKnownSymbol$9('toPrimitive'); // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive

  var toPrimitive$1 = function (input, pref) {
    if (!isObject$4(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
    var result;

    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = exoticToPrim.call(input, pref);
      if (!isObject$4(result) || isSymbol$1(result)) return result;
      throw TypeError("Can't convert object to primitive value");
    }

    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2; // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey

  var toPropertyKey$3 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : String(key);
  };

  var DESCRIPTORS$4 = descriptors;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;
  var anObject$7 = anObject$8;
  var toPropertyKey$2 = toPropertyKey$3; // eslint-disable-next-line es/no-object-defineproperty -- safe

  var $defineProperty = Object.defineProperty; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  objectDefineProperty.f = DESCRIPTORS$4 ? $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$7(O);
    P = toPropertyKey$2(P);
    anObject$7(Attributes);
    if (IE8_DOM_DEFINE$1) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var createPropertyDescriptor$3 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var DESCRIPTORS$3 = descriptors;
  var definePropertyModule$4 = objectDefineProperty;
  var createPropertyDescriptor$2 = createPropertyDescriptor$3;
  var createNonEnumerableProperty$5 = DESCRIPTORS$3 ? function (object, key, value) {
    return definePropertyModule$4.f(object, key, createPropertyDescriptor$2(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var global$8 = global$f;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$4(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    if (DOMIterables[COLLECTION_NAME]) {
      handlePrototype(global$8[COLLECTION_NAME] && global$8[COLLECTION_NAME].prototype);
    }
  }

  handlePrototype(DOMTokenListPrototype);

  var objectGetOwnPropertyDescriptor = {};

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

  var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({
    1: 2
  }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$1(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var IndexedObject = indexedObject;
  var requireObjectCoercible$7 = requireObjectCoercible$9;

  var toIndexedObject$4 = function (it) {
    return IndexedObject(requireObjectCoercible$7(it));
  };

  var DESCRIPTORS$2 = descriptors;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$1 = createPropertyDescriptor$3;
  var toIndexedObject$3 = toIndexedObject$4;
  var toPropertyKey$1 = toPropertyKey$3;
  var hasOwn$5 = hasOwnProperty_1;
  var IE8_DOM_DEFINE = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$2 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$3(O);
    P = toPropertyKey$1(P);
    if (IE8_DOM_DEFINE) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) {
      /* empty */
    }
    if (hasOwn$5(O, P)) return createPropertyDescriptor$1(!propertyIsEnumerableModule.f.call(O, P), O[P]);
  };

  var redefine$2 = {exports: {}};

  var global$7 = global$f;
  var isCallable$5 = isCallable$e;
  var inspectSource$1 = inspectSource$3;
  var WeakMap$1 = global$7.WeakMap;
  var nativeWeakMap = isCallable$5(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1));

  var shared$2 = shared$4.exports;
  var uid = uid$2;
  var keys = shared$2('keys');

  var sharedKey$2 = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys$4 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$6 = global$f;
  var isObject$3 = isObject$9;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
  var hasOwn$4 = hasOwnProperty_1;
  var shared$1 = sharedStore;
  var sharedKey$1 = sharedKey$2;
  var hiddenKeys$3 = hiddenKeys$4;
  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap = global$6.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;

      if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$1.state) {
    var store = shared$1.state || (shared$1.state = new WeakMap());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;

    set = function (it, metadata) {
      if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };

    get = function (it) {
      return wmget.call(store, it) || {};
    };

    has = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey$1('state');
    hiddenKeys$3[STATE] = true;

    set = function (it, metadata) {
      if (hasOwn$4(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$3(it, STATE, metadata);
      return metadata;
    };

    get = function (it) {
      return hasOwn$4(it, STATE) ? it[STATE] : {};
    };

    has = function (it) {
      return hasOwn$4(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var DESCRIPTORS$1 = descriptors;
  var hasOwn$3 = hasOwnProperty_1;
  var FunctionPrototype = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor;
  var EXISTS = hasOwn$3(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

  var PROPER = EXISTS && function something() {
    /* empty */
  }.name === 'something';

  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$1 || DESCRIPTORS$1 && getDescriptor(FunctionPrototype, 'name').configurable);
  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var global$5 = global$f;
  var isCallable$4 = isCallable$e;
  var hasOwn$2 = hasOwnProperty_1;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
  var setGlobal$1 = setGlobal$3;
  var inspectSource = inspectSource$3;
  var InternalStateModule = internalState;
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
  var getInternalState$1 = InternalStateModule.get;
  var enforceInternalState = InternalStateModule.enforce;
  var TEMPLATE = String(String).split('String');
  (redefine$2.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;

    if (isCallable$4(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }

      if (!hasOwn$2(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        createNonEnumerableProperty$2(value, 'name', name);
      }

      state = enforceInternalState(value);

      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }

    if (O === global$5) {
      if (simple) O[key] = value;else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }

    if (simple) O[key] = value;else createNonEnumerableProperty$2(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable$4(this) && getInternalState$1(this).source || inspectSource(this);
  });

  var objectGetOwnPropertyNames = {};

  var toIntegerOrInfinity$3 = toIntegerOrInfinity$5;
  var max$3 = Math.max;
  var min$1 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex$2 = function (index, length) {
    var integer = toIntegerOrInfinity$3(index);
    return integer < 0 ? max$3(integer + length, 0) : min$1(integer, length);
  };

  var toIndexedObject$2 = toIndexedObject$4;
  var toAbsoluteIndex$1 = toAbsoluteIndex$2;
  var lengthOfArrayLike$2 = lengthOfArrayLike$4; // `Array.prototype.{ indexOf, includes }` methods implementation

  var createMethod$2 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$2($this);
      var length = lengthOfArrayLike$2(O);
      var index = toAbsoluteIndex$1(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check

      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      }
      return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$2(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$2(false)
  };

  var hasOwn$1 = hasOwnProperty_1;
  var toIndexedObject$1 = toIndexedObject$4;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$2 = hiddenKeys$4;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$1(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && result.push(key); // Don't enum bug & hidden keys


    while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }

    return result;
  };

  var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;
  var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe

  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$1);
  };

  var objectGetOwnPropertySymbols = {};

  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$1 = getBuiltIn$5;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$6 = anObject$8; // all object keys, includes non-enumerable and symbols

  var ownKeys$1 = getBuiltIn$1('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$6(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$3 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$3.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$8 = fails$f;
  var isCallable$3 = isCallable$e;
  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : isCallable$3(detection) ? fails$8(detection) : !!detection;
  };

  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';
  var isForced_1 = isForced$1;

  var global$4 = global$f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
  var redefine$1 = redefine$2.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced = isForced_1;
  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */

  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;

    if (GLOBAL) {
      target = global$4;
    } else if (STATIC) {
      target = global$4[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$4[TARGET] || {}).prototype;
    }

    if (target) for (key in source) {
      sourceProperty = source[key];

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];

      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      } // add a flag to not completely full polyfills


      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$1(sourceProperty, 'sham', true);
      } // extend global


      redefine$1(target, key, sourceProperty, options);
    }
  };

  var classof$2 = classof$4;

  var toString$8 = function (argument) {
    if (classof$2(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String(argument);
  };

  var anObject$5 = anObject$8; // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

  var regexpFlags$1 = function () {
    var that = anObject$5(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var regexpStickyHelpers = {};

  var fails$7 = fails$f;
  var global$3 = global$f; // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError

  var $RegExp$2 = global$3.RegExp;
  regexpStickyHelpers.UNSUPPORTED_Y = fails$7(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });
  regexpStickyHelpers.BROKEN_CARET = fails$7(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3; // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe

  var objectKeys$1 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS = descriptors;
  var definePropertyModule$2 = objectDefineProperty;
  var anObject$4 = anObject$8;
  var objectKeys = objectKeys$1; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe

  var objectDefineProperties = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$4(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;

    while (length > index) definePropertyModule$2.f(O, key = keys[index++], Properties[key]);

    return O;
  };

  var getBuiltIn = getBuiltIn$5;
  var html$1 = getBuiltIn('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */
  var anObject$3 = anObject$8;
  var defineProperties = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$4;
  var html = html$1;
  var documentCreateElement = documentCreateElement$2;
  var sharedKey = sharedKey$2;
  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function () {
    /* empty */
  };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak

    return temp;
  }; // Create object with fake `null` prototype: use iframe Object with cleared prototype


  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  }; // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug


  var activeXDocument;

  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }

    NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
    : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

    var length = enumBugKeys.length;

    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO] = true; // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create

  var objectCreate = Object.create || function create(O, Properties) {
    var result;

    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$3(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO] = O;
    } else result = NullProtoObject();

    return Properties === undefined ? result : defineProperties(result, Properties);
  };

  var fails$6 = fails$f;
  var global$2 = global$f; // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError

  var $RegExp$1 = global$2.RegExp;
  var regexpUnsupportedDotAll = fails$6(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$5 = fails$f;
  var global$1 = global$f; // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError

  var $RegExp = global$1.RegExp;
  var regexpUnsupportedNcg = fails$5(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

  /* eslint-disable regexp/no-useless-quantifier -- testing */


  var toString$7 = toString$8;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var shared = shared$4.exports;
  var create$1 = objectCreate;
  var getInternalState = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;
  var nativeExec = RegExp.prototype.exec;
  var nativeReplace = shared('native-string-replace', String.prototype.replace);
  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  }();

  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  if (PATCH) {
    // eslint-disable-next-line max-statements -- TODO
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState(re);
      var str = toString$7(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = patchedExec.call(raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y && re.sticky;
      var flags = regexpFlags.call(re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = flags.replace('y', '');

        if (flags.indexOf('g') === -1) {
          flags += 'g';
        }

        strCopy = str.slice(re.lastIndex); // Support anchored sticky behavior.

        if (re.lastIndex > 0 && (!re.multiline || re.multiline && str.charAt(re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        } // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.


        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }

      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }

      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create$1(null);

        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec$2 = patchedExec;

  var $$8 = _export;
  var exec = regexpExec$2; // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec

  $$8({
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== exec
  }, {
    exec: exec
  });

  var redefine = redefine$2.exports;
  var regexpExec$1 = regexpExec$2;
  var fails$4 = fails$f;
  var wellKnownSymbol$8 = wellKnownSymbol$d;
  var createNonEnumerableProperty = createNonEnumerableProperty$5;
  var SPECIES$2 = wellKnownSymbol$8('species');
  var RegExpPrototype$1 = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$8(KEY);
    var DELEGATES_TO_SYMBOL = !fails$4(function () {
      // String methods call symbol-named RegEp methods
      var O = {};

      O[SYMBOL] = function () {
        return 7;
      };

      return ''[KEY](O) != 7;
    });
    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$4(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.

        re.constructor = {};

        re.constructor[SPECIES$2] = function () {
          return re;
        };

        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }

      re.exec = function () {
        execCalled = true;
        return null;
      };

      re[SYMBOL]('');
      return !execCalled;
    });

    if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var $exec = regexp.exec;

        if ($exec === regexpExec$1 || $exec === RegExpPrototype$1.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return {
              done: true,
              value: nativeRegExpMethod.call(regexp, str, arg2)
            };
          }

          return {
            done: true,
            value: nativeMethod.call(str, regexp, arg2)
          };
        }

        return {
          done: false
        };
      });
      redefine(String.prototype, KEY, methods[0]);
      redefine(RegExpPrototype$1, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty(RegExpPrototype$1[SYMBOL], 'sham', true);
  };

  var toIntegerOrInfinity$2 = toIntegerOrInfinity$5;
  var toString$6 = toString$8;
  var requireObjectCoercible$6 = requireObjectCoercible$9;

  var createMethod$1 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$6(requireObjectCoercible$6($this));
      var position = toIntegerOrInfinity$2(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
  };

  var charAt = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex

  var advanceStringIndex$2 = function (S, index, unicode) {
    return index + (unicode ? charAt(S, index).length : 1);
  };

  var toObject$2 = toObject$5;
  var floor = Math.floor;
  var replace = ''.replace;
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g; // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution

  var getSubstitution$2 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

    if (namedCaptures !== undefined) {
      namedCaptures = toObject$2(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }

    return replace.call(replacement, symbols, function (match, ch) {
      var capture;

      switch (ch.charAt(0)) {
        case '$':
          return '$';

        case '&':
          return matched;

        case '`':
          return str.slice(0, position);

        case "'":
          return str.slice(tailPos);

        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;

        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;

          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }

          capture = captures[n - 1];
      }

      return capture === undefined ? '' : capture;
    });
  };

  var anObject$2 = anObject$8;
  var isCallable$2 = isCallable$e;
  var classof$1 = classofRaw$1;
  var regexpExec = regexpExec$2; // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec

  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;

    if (isCallable$2(exec)) {
      var result = exec.call(R, S);
      if (result !== null) anObject$2(result);
      return result;
    }

    if (classof$1(R) === 'RegExp') return regexpExec.call(R, S);
    throw TypeError('RegExp#exec called on incompatible receiver');
  };

  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var fails$3 = fails$f;
  var anObject$1 = anObject$8;
  var isCallable$1 = isCallable$e;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$5;
  var toLength$2 = toLength$4;
  var toString$5 = toString$8;
  var requireObjectCoercible$5 = requireObjectCoercible$9;
  var advanceStringIndex$1 = advanceStringIndex$2;
  var getMethod$2 = getMethod$4;
  var getSubstitution$1 = getSubstitution$2;
  var regExpExec$1 = regexpExecAbstract;
  var wellKnownSymbol$7 = wellKnownSymbol$d;
  var REPLACE$1 = wellKnownSymbol$7('replace');
  var max$2 = Math.max;
  var min = Math.min;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  }; // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0


  var REPLACE_KEEPS_$0 = function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  }(); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string


  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
    if (/./[REPLACE$1]) {
      return /./[REPLACE$1]('a', '$0') === '';
    }

    return false;
  }();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$3(function () {
    var re = /./;

    re.exec = function () {
      var result = [];
      result.groups = {
        a: '7'
      };
      return result;
    }; // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive


    return ''.replace(re, '$<a>') !== '7';
  }); // @@replace logic

  fixRegExpWellKnownSymbolLogic$1('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
    return [// `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible$5(this);
      var replacer = searchValue == undefined ? undefined : getMethod$2(searchValue, REPLACE$1);
      return replacer ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(toString$5(O), searchValue, replaceValue);
    }, // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject$1(this);
      var S = toString$5(string);

      if (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 && replaceValue.indexOf('$<') === -1) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable$1(replaceValue);
      if (!functionalReplace) replaceValue = toString$5(replaceValue);
      var global = rx.global;

      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }

      var results = [];

      while (true) {
        var result = regExpExec$1(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = toString$5(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$2(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;

      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = toString$5(result[0]);
        var position = max$2(min(toIntegerOrInfinity$1(result.index), S.length), 0);
        var captures = []; // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

        var namedCaptures = result.groups;

        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = toString$5(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution$1(matched, S, position, captures, namedCaptures, replaceValue);
        }

        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }

      return accumulatedResult + S.slice(nextSourcePosition);
    }];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var $$7 = _export;
  var toObject$1 = toObject$5;
  var nativeKeys = objectKeys$1;
  var fails$2 = fails$f;
  var FAILS_ON_PRIMITIVES = fails$2(function () {
    nativeKeys(1);
  }); // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys

  $$7({
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES
  }, {
    keys: function keys(it) {
      return nativeKeys(toObject$1(it));
    }
  });

  var isObject$2 = isObject$9;
  var classof = classofRaw$1;
  var wellKnownSymbol$6 = wellKnownSymbol$d;
  var MATCH$1 = wellKnownSymbol$6('match'); // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp

  var isRegexp = function (it) {
    var isRegExp;
    return isObject$2(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
  };

  var $$6 = _export;
  var requireObjectCoercible$4 = requireObjectCoercible$9;
  var isCallable = isCallable$e;
  var isRegExp$1 = isRegexp;
  var toString$4 = toString$8;
  var getMethod$1 = getMethod$4;
  var getRegExpFlags = regexpFlags$1;
  var getSubstitution = getSubstitution$2;
  var wellKnownSymbol$5 = wellKnownSymbol$d;
  var REPLACE = wellKnownSymbol$5('replace');
  var RegExpPrototype = RegExp.prototype;
  var max$1 = Math.max;

  var stringIndexOf = function (string, searchValue, fromIndex) {
    if (fromIndex > string.length) return -1;
    if (searchValue === '') return fromIndex;
    return string.indexOf(searchValue, fromIndex);
  }; // `String.prototype.replaceAll` method
  // https://tc39.es/ecma262/#sec-string.prototype.replaceall


  $$6({
    target: 'String',
    proto: true
  }, {
    replaceAll: function replaceAll(searchValue, replaceValue) {
      var O = requireObjectCoercible$4(this);
      var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
      var position = 0;
      var endOfLastMatch = 0;
      var result = '';

      if (searchValue != null) {
        IS_REG_EXP = isRegExp$1(searchValue);

        if (IS_REG_EXP) {
          flags = toString$4(requireObjectCoercible$4('flags' in RegExpPrototype ? searchValue.flags : getRegExpFlags.call(searchValue)));
          if (!~flags.indexOf('g')) throw TypeError('`.replaceAll` does not allow non-global regexes');
        }

        replacer = getMethod$1(searchValue, REPLACE);

        if (replacer) {
          return replacer.call(searchValue, O, replaceValue);
        }
      }

      string = toString$4(O);
      searchString = toString$4(searchValue);
      functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString$4(replaceValue);
      searchLength = searchString.length;
      advanceBy = max$1(1, searchLength);
      position = stringIndexOf(string, searchString, 0);

      while (position !== -1) {
        if (functionalReplace) {
          replacement = toString$4(replaceValue(searchString, position, string));
        } else {
          replacement = getSubstitution(searchString, string, position, [], undefined, replaceValue);
        }

        result += string.slice(endOfLastMatch, position) + replacement;
        endOfLastMatch = position + searchLength;
        position = stringIndexOf(string, searchString, position + advanceBy);
      }

      if (endOfLastMatch < string.length) {
        result += string.slice(endOfLastMatch);
      }

      return result;
    }
  });

  var wellKnownSymbol$4 = wellKnownSymbol$d;
  var create = objectCreate;
  var definePropertyModule$1 = objectDefineProperty;
  var UNSCOPABLES = wellKnownSymbol$4('unscopables');
  var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    definePropertyModule$1.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: create(null)
    });
  } // add a key to Array.prototype[@@unscopables]


  var addToUnscopables$1 = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var $$5 = _export;
  var $includes = arrayIncludes.includes;
  var addToUnscopables = addToUnscopables$1; // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes

  $$5({
    target: 'Array',
    proto: true
  }, {
    includes: function includes(el
    /* , fromIndex = 0 */
    ) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  }); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  addToUnscopables('includes');

  var isRegExp = isRegexp;

  var notARegexp = function (it) {
    if (isRegExp(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    }

    return it;
  };

  var wellKnownSymbol$3 = wellKnownSymbol$d;
  var MATCH = wellKnownSymbol$3('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;

    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) {
        /* empty */
      }
    }

    return false;
  };

  var $$4 = _export;
  var notARegExp = notARegexp;
  var requireObjectCoercible$3 = requireObjectCoercible$9;
  var toString$3 = toString$8;
  var correctIsRegExpLogic = correctIsRegexpLogic; // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes

  $$4({
    target: 'String',
    proto: true,
    forced: !correctIsRegExpLogic('includes')
  }, {
    includes: function includes(searchString
    /* , position = 0 */
    ) {
      return !!~toString$3(requireObjectCoercible$3(this)).indexOf(toString$3(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var toPropertyKey = toPropertyKey$3;
  var definePropertyModule = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$3;

  var createProperty$2 = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
  };

  var fails$1 = fails$f;
  var wellKnownSymbol$2 = wellKnownSymbol$d;
  var V8_VERSION$1 = engineV8Version;
  var SPECIES$1 = wellKnownSymbol$2('species');

  var arrayMethodHasSpeciesSupport$3 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$1(function () {
      var array = [];
      var constructor = array.constructor = {};

      constructor[SPECIES$1] = function () {
        return {
          foo: 1
        };
      };

      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$3 = _export;
  var fails = fails$f;
  var isArray$1 = isArray$3;
  var isObject$1 = isObject$9;
  var toObject = toObject$5;
  var lengthOfArrayLike$1 = lengthOfArrayLike$4;
  var createProperty$1 = createProperty$2;
  var arraySpeciesCreate = arraySpeciesCreate$2;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$3;
  var wellKnownSymbol$1 = wellKnownSymbol$d;
  var V8_VERSION = engineV8Version;
  var IS_CONCAT_SPREADABLE = wellKnownSymbol$1('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679

  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$2('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject$1(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray$1(O);
  };

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species

  $$3({
    target: 'Array',
    proto: true,
    forced: FORCED
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];

        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike$1(E);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

          for (k = 0; k < len; k++, n++) if (k in E) createProperty$1(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty$1(A, n++, E);
        }
      }

      A.length = n;
      return A;
    }
  });

  var $$2 = _export;
  var isArray = isArray$3;
  var isConstructor = isConstructor$2;
  var isObject = isObject$9;
  var toAbsoluteIndex = toAbsoluteIndex$2;
  var lengthOfArrayLike = lengthOfArrayLike$4;
  var toIndexedObject = toIndexedObject$4;
  var createProperty = createProperty$2;
  var wellKnownSymbol = wellKnownSymbol$d;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$3;
  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('slice');
  var SPECIES = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max = Math.max; // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects

  $$2({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT$1
  }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = lengthOfArrayLike(O);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

      var Constructor, result, n;

      if (isArray(O)) {
        Constructor = O.constructor; // cross-realm fallback

        if (isConstructor(Constructor) && (Constructor === Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }

        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }

      result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));

      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

      result.length = n;
      return result;
    }
  });

  var toIntegerOrInfinity = toIntegerOrInfinity$5;
  var toString$2 = toString$8;
  var requireObjectCoercible$2 = requireObjectCoercible$9; // `String.prototype.repeat` method implementation
  // https://tc39.es/ecma262/#sec-string.prototype.repeat

  var stringRepeat = function repeat(count) {
    var str = toString$2(requireObjectCoercible$2(this));
    var result = '';
    var n = toIntegerOrInfinity(count);
    if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

    for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

    return result;
  };

  var toLength$1 = toLength$4;
  var toString$1 = toString$8;
  var repeat = stringRepeat;
  var requireObjectCoercible$1 = requireObjectCoercible$9;
  var ceil = Math.ceil; // `String.prototype.{ padStart, padEnd }` methods implementation

  var createMethod = function (IS_END) {
    return function ($this, maxLength, fillString) {
      var S = toString$1(requireObjectCoercible$1($this));
      var intMaxLength = toLength$1(maxLength);
      var stringLength = S.length;
      var fillStr = fillString === undefined ? ' ' : toString$1(fillString);
      var fillLen, stringFiller;
      if (intMaxLength <= stringLength || fillStr == '') return S;
      fillLen = intMaxLength - stringLength;
      stringFiller = repeat.call(fillStr, ceil(fillLen / fillStr.length));
      if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
      return IS_END ? S + stringFiller : stringFiller + S;
    };
  };

  var stringPad = {
    // `String.prototype.padStart` method
    // https://tc39.es/ecma262/#sec-string.prototype.padstart
    start: createMethod(false),
    // `String.prototype.padEnd` method
    // https://tc39.es/ecma262/#sec-string.prototype.padend
    end: createMethod(true)
  };

  var userAgent = engineUserAgent;
  var stringPadWebkitBug = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent);

  var $$1 = _export;
  var $padStart = stringPad.start;
  var WEBKIT_BUG = stringPadWebkitBug; // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart

  $$1({
    target: 'String',
    proto: true,
    forced: WEBKIT_BUG
  }, {
    padStart: function padStart(maxLength
    /* , fillString = ' ' */
    ) {
      return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $ = _export;
  var $map = arrayIteration.map;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$3;
  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map'); // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species

  $({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT
  }, {
    map: function map(callbackfn
    /* , thisArg */
    ) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var anObject = anObject$8;
  var toLength = toLength$4;
  var toString = toString$8;
  var requireObjectCoercible = requireObjectCoercible$9;
  var getMethod = getMethod$4;
  var advanceStringIndex = advanceStringIndex$2;
  var regExpExec = regexpExecAbstract; // @@match logic

  fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [// `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
      return matcher ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](toString(O));
    }, // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeMatch, rx, S);
      if (res.done) return res.value;
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;

      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }

      return n === 0 ? null : A;
    }];
  });

  /* Copyright Spinitron LLC */

  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
  // Vars with relative time (e.g. a duration) are in seconds. AudioContext uses floats. Sometimes integer.
  // Date-time vars have a suffix:
  //   Timestamp (string) UTC date/time like "20200822T162000Z"
  //   Time (integer) JavaScript date/time, i.e. milliseconds since the unix epoch
  var AUDIO_CONTEXT = window.AudioContext || window.webkitAudioContext ? new (window.AudioContext || window.webkitAudioContext)() : null; // Nominal duration (seconds) to calculate next segment URL from previous

  var DEFAULT_SEGMENT_DURATION = 300; // Start fetching next segment ahead of end of playback of the current one

  var DEFAULT_FETCH_AHEAD = 15;
  /**
   * TODO: figure out why "export default" doesn't allow to import the function as Spinitron.arkPlayer
   * @param {HTMLElement} container
   * @param {Object} options
   * @param {string} options.template
   * @param {{[string]: string}=} options.data
   * @param {boolean=} options.enableDebug
   * @param {number=} options.segmentDuration in seconds
   * @param {number=} options.fetchAhead in seconds
   */

  window.arkPlayer = function (container, options) {
    function badLuck() {
      // eslint-disable-next-line no-param-reassign
      container.outerHTML = "<div>The archive player doesn't work in this browser :(</div>";
      document.querySelectorAll('.ark-play-button').forEach(function (e) {
        return e.classList.add('ark-ark-play-button_hide');
      });
    }

    try {
      if (_typeof(AUDIO_CONTEXT) !== 'object' || typeof AUDIO_CONTEXT.resume !== 'function' || typeof AUDIO_CONTEXT.state !== 'string') {
        badLuck();
        return;
      }
    } catch (ignore) {
      badLuck();
      return;
    }

    var template = options.template,
        _options$data = options.data,
        data = _options$data === void 0 ? {} : _options$data,
        timeZone = options.timeZone,
        _options$enableDebug = options.enableDebug,
        enableDebug = _options$enableDebug === void 0 ? false : _options$enableDebug,
        _options$segmentDurat = options.segmentDuration,
        segmentDuration = _options$segmentDurat === void 0 ? DEFAULT_SEGMENT_DURATION : _options$segmentDurat,
        _options$fetchAhead = options.fetchAhead,
        fetchAhead = _options$fetchAhead === void 0 ? DEFAULT_FETCH_AHEAD : _options$fetchAhead;
    var baseStart = container.dataset.arkStart || "".concat(new Date(new Date().getTime() - 7200000).toISOString().substring(0, 13).replace(/-/g, ''), "0000Z");
    var baseUrl = Object.keys(data).reduce(function (url, key) {
      return url.replaceAll("{".concat(key, "}"), data[key]);
    }, template);
    var myFetchAhead = fetchAhead;
    var pickerOpts = {
      dates: [],
      hours: {}
    };
    ensureAudioContextState('suspended');
    debug('ark player init: ', options, 'baseUrl', baseUrl); // Uee localeStuff as argument to Date.toLocaleString() etc. If browser can't do timezones, empty array
    // means use client's time zone instead of the station's.

    var localeStuff = function () {
      var β = '?';

      try {
        β = new Date().toLocaleString(['en-US', {
          timeZone: timeZone
        }]);
      } catch (ignore) {
        return [];
      }

      debug(β);
      return ['en-US', {
        timeZone: timeZone
      }];
    }();

    var playerControl = container.querySelector('.ark-player__control');
    var playerStatus = container.querySelector('.ark-player__status');
    var playerPicker = container.querySelector('.ark-player__picker'); // AudioContext time when the Ark was started

    var arkStartedAt = null; // unix milliseconds in the archive corresponding to arkStartedAt

    var arkStartTime = null; // setInterval timer ID for the monitor

    var monitorInterval; // currentSegment and nextSegment can be a dictionary with
    //   segmentTime: unix milliseconds used to make the segment URL
    //   source: AudioBufferSourceNode with the segment's audio
    //   started: AudioContext's time at which the audio is/was scheduled to start
    //   offset: how much of the first segment to skip. 0 for subsequent segments
    // currentSegment is always a segment dictionary after Ark start

    var currentSegment = null; // nextSegment may be
    // - null when the current segment is simply playing or before Ark start
    // - an XMLHttpRequest if the next segment was requested but is not yet received and decoded
    // - a segment dictionary like currentSegment when it's ready

    var nextSegment = null; // on 404, try to download this many next segments

    var remainingTryNexts = 5;
    resetPlayer();

    (function () {
      // Initialize pickerOpts, the date-time picker database.
      var n = new Date();
      var stop = n.getTime() - 14 * 86400 * 1000;
      var hour = new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours()).getTime();
      var hourDate;
      var date;

      while (hour > stop) {
        var _hourDate, _hourDate2;

        hour -= 3600 * 1000;
        hourDate = new Date(hour);
        date = (_hourDate = hourDate).toLocaleDateString.apply(_hourDate, _toConsumableArray(localeStuff)).replace(/\d\d(\d\d)$/, '$1');

        if (!pickerOpts.dates.includes(date)) {
          pickerOpts.dates.push(date);
          pickerOpts.hours[date] = [];
        }

        pickerOpts.hours[date].push([(_hourDate2 = hourDate).toLocaleTimeString.apply(_hourDate2, _toConsumableArray(localeStuff)).replace(/:00:00 /, ' '), hourDate.toISOString().substring(0, 13).replace(/-/g, '')]);
      } // Initialize the date-time picker selectors and their options.


      var dateEl = container.querySelector('[name=date]');
      var hoursEl = container.querySelector('[name=hours]');
      var minutesEl = container.querySelector('[name=minutes]');
      populateDate(dateEl);
      dateEl.addEventListener('change', function () {
        populateHours(hoursEl, dateEl.value);
        pickerChanged();
      });
      hoursEl.addEventListener('change', pickerChanged);
      populateHours(hoursEl, dateEl.value);
      minutesEl.addEventListener('change', pickerChanged);
      populateMinutes(minutesEl);

      function pickerChanged() {
        resetPlayer();
        baseStart = "".concat(hoursEl.value).concat(minutesEl.value, "00Z");
      }

      setupPicker();
    })();
    /**
     * Adjust the date-time picker to the given start.
     * @param {String} timestamp in ark player format
     */


    function setupPicker(timestamp) {
      var copyOfTimestampParam = timestamp === undefined ? baseStart : timestamp;
      var seekDateHour = copyOfTimestampParam.slice(0, 11); // Search the date-time picker's database for seekDateHour

      var date;
      pickerOpts.dates.some(function (d) {
        return pickerOpts.hours[d].some(function (h) {
          if (seekDateHour === h[1]) {
            date = d;
            return true;
          }

          return false;
        });
      });

      if (date) {
        // Adjust the picker's selections and hour options.
        var c = container;
        c.querySelector('[name=date]').value = date;
        populateHours(c.querySelector('[name=hours]'), date);
        c.querySelector('[name=hours]').value = seekDateHour;
        c.querySelector('[name=minutes]').value = "".concat(Math.floor(parseInt(copyOfTimestampParam.slice(11, 13), 10) / 15) * 15).padStart(2, '0');
      }
    }

    function playButton() {
      if (getPlayerState() === 'not-started') {
        if (baseStart) {
          startArk(baseStart);
        }
      } else {
        togglePlay();
      }
    }

    var volume = function () {
      var muted = false;

      var _slider = document.querySelector('.ark-player__volume-slider');

      var slash = document.querySelector('.ark-player__volume-slash');
      var mute = document.querySelector('.ark-player__mute-button');
      var vol;
      var m = {
        muteButton: function muteButton() {
          muted = !muted;
          m.either();
        },
        slider: function slider() {
          vol = parseInt(_slider.value, 10);
          m.either();
        },
        either: function either() {
          _slider.value = muted ? '0' : "".concat(vol);
          slash.style.cssText = muted || vol === 0 ? '' : 'display:none';
          var gain = (muted ? 0 : vol) / 100;

          if (currentSegment && currentSegment.gainNode) {
            currentSegment.gainNode.gain.setValueAtTime(gain, AUDIO_CONTEXT.currentTime);
          }

          if (nextSegment && nextSegment.gainNode) {
            nextSegment.gainNode.gain.setValueAtTime(gain, AUDIO_CONTEXT.currentTime);
          }
        }
      };

      _slider.addEventListener('change', m.slider);

      _slider.addEventListener('input', m.slider);

      mute.addEventListener('click', m.muteButton);
      m.slider();
      return m;
    }();
    /**
     * Play/pause button.
     */


    playerControl.addEventListener('click', playButton);
    /**
     * Start playing when almost any element with specified [data-ark-start] is clicked.
     */

    document.addEventListener('click', function (e) {
      var element = e.target.closest('[data-ark-start]');

      if (!element || element === container) {
        return;
      }

      e.preventDefault();
      startArk(element.dataset.arkStart);
    });
    document.addEventListener('keydown', function (e) {
      if (e.isComposing || e.keyCode === 229 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
        return;
      }

      if (e.key === 'k') {
        playButton();
      } else if (e.key === 'm') {
        volume.muteButton();
      }
    });

    function startArk(startTimestamp) {
      resetPlayer(false);
      setupPicker(startTimestamp);
      var d = startTimestamp.match(/^(\d\d\d\d)(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)Z$/).slice(1).map(function (δ) {
        return parseInt(δ, 10);
      });
      arkStartTime = Date.UTC(d[0], d[1] - 1, d[2], d[3], d[4], d[5]);
      var segmentTime = Date.UTC(d[0], d[1] - 1, d[2], d[3], 0, 0);

      while (segmentTime + 1000 * segmentDuration <= arkStartTime) {
        segmentTime += 1000 * segmentDuration;
      }

      ensureAudioContextState('running');
      cueNextSegment({
        segmentTime: segmentTime,
        offset: (arkStartTime - segmentTime) / 1000
      });
      monitorInterval = setInterval(monitor, 1000);
    }

    function resetPlayer(suspend) {
      if (monitorInterval) {
        clearInterval(monitorInterval);
      }

      if (nextSegment && nextSegment.source) {
        nextSegment.source.stop();
      }

      nextSegment = null;

      if (currentSegment && currentSegment.source) {
        currentSegment.source.stop();
      }

      currentSegment = null;

      if (suspend !== false) {
        ensureAudioContextState('suspended');
      }

      arkStartTime = null;
      arkStartedAt = null;
      playerStatus.querySelector('.ark-player__date').innerHTML = '--/--/--';
      playerStatus.querySelector('.ark-player__time').innerHTML = '-:--:-- --';
      playerStatus.classList.toggle('waiting', true);
    }

    function getPlayerState() {
      if (currentSegment === null && nextSegment === null) {
        return 'not-started';
      }

      if (AUDIO_CONTEXT.state === 'running') {
        return 'playing';
      }

      if (AUDIO_CONTEXT.state === 'suspended') {
        return 'paused';
      }

      debug("player state?! current: ".concat(currentSegment, " next: ").concat(nextSegment, " context: ").concat(AUDIO_CONTEXT, ". resetting"));
      resetPlayer();
      return 'not-started';
    }

    function ensureAudioContextState(toState) {
      if (AUDIO_CONTEXT.state === toState) {
        debug("WebAudio was already ".concat(toState));
        return;
      }

      if (toState === 'suspended') {
        AUDIO_CONTEXT.suspend().then(function () {
          return debug("WebAudio now ".concat(toState));
        });
      } else if (toState === 'running') {
        AUDIO_CONTEXT.resume().then(function () {
          return debug("WebAudio now ".concat(toState));
        });
      } else {
        return;
      }
    }
    /**
     * @param {boolean=} force
     */


    function togglePlay(force) {
      var oldPlayerState = getPlayerState();
      var isPlaying = force === undefined ? oldPlayerState !== 'playing' : force;

      if (oldPlayerState === 'playing' && !isPlaying) {
        ensureAudioContextState('suspended');
      } else if (oldPlayerState === 'paused' && isPlaying) {
        ensureAudioContextState('running');
      }

      updateDisplay(isPlaying);
    }

    function updateDisplay(force) {
      var isPlaying = force === undefined ? getPlayerState() === 'playing' : force;
      var hide = 'ark-player_hide'; // Show the player if it was hidden when no start time provided.

      container.classList.toggle(hide, false);
      playerControl.querySelector('.ark-player__play').classList.toggle(hide, isPlaying);
      playerControl.querySelector('.ark-player__pause').classList.toggle(hide, !isPlaying);
      playerPicker.classList.toggle(hide, isPlaying);
      playerStatus.classList.toggle(hide, !isPlaying);
    }

    function monitor() {
      if (getPlayerState() === 'paused') {
        return;
      }

      if (currentSegment && nextSegment === null) {
        var currentEndsAt = currentSegment.started + currentSegment.source.buffer.duration - currentSegment.offset;

        if (AUDIO_CONTEXT.currentTime > currentEndsAt - myFetchAhead) {
          cueNextSegment({
            segmentTime: currentSegment.segmentTime + 1000 * segmentDuration,
            offset: 0
          });
        }
      }

      if (nextSegment && nextSegment.source && nextSegment.started < AUDIO_CONTEXT.currentTime) {
        currentSegment = null;
        currentSegment = nextSegment;
        nextSegment = null;
        debug('moved next segment to current');
      }

      if (arkStartedAt && AUDIO_CONTEXT.currentTime > arkStartedAt) {
        var arkTime = new Date(arkStartTime + Math.round(1000 * (AUDIO_CONTEXT.currentTime - arkStartedAt)));
        playerStatus.querySelector('.ark-player__date').innerHTML = arkTime.toLocaleDateString.apply(arkTime, _toConsumableArray(localeStuff)).replace(/(^\d\d?\/\d\d?\/)\d\d(\d\d)/, '$1$2');
        playerStatus.querySelector('.ark-player__time').innerHTML = arkTime.toLocaleTimeString.apply(arkTime, _toConsumableArray(localeStuff));
        playerStatus.classList.toggle('waiting', false);
      }
    }

    var audioCache = function () {
      var cache = [];
      return {
        add: function add(_ref) {
          var url = _ref.url,
              audio = _ref.audio;
          cache.push({
            url: url,
            audio: audio
          });
          debug("audio cache push ".concat(url));

          if (cache.length > 3) {
            var item = cache.shift();
            debug("audio cache discard ".concat(item.url));
            item.audio = null;
          }

          debug("audio cache content: ", cache);
        },
        get: function get(url) {
          for (var i = 0; i < cache.length; i += 1) {
            if (cache[i].url === url) {
              debug("audio cache hit: ".concat(url));
              return cache[i].audio;
            }
          }

          debug("audio cache miss: ".concat(url));
          return null;
        }
      };
    }();

    function cueNextSegment(_ref2) {
      var segmentTime = _ref2.segmentTime,
          offset = _ref2.offset;
      var url = baseUrl.replace('{time}', new Date(segmentTime).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''));
      debug("cuing next segment ".concat(url, " offset: ").concat(offset));
      var cachedAudio = audioCache.get(url);

      if (cachedAudio !== null) {
        cueAudio({
          segmentTime: segmentTime,
          offset: offset
        }, cachedAudio);
        return;
      }

      var request = new XMLHttpRequest();
      var fetchStartTime = new Date().getTime();
      request.open('get', url, true);
      request.responseType = 'arraybuffer';

      request.onerror = function () {
        debug("".concat(request.statusText, " getting ").concat(url));
      };

      request.onload = function () {
        if (request.status === 200) {
          remainingTryNexts = 5;
          AUDIO_CONTEXT.decodeAudioData(request.response, function (decodedAudio) {
            audioCache.add({
              url: url,
              audio: decodedAudio
            });
            var fetchDuration = (new Date().getTime() - fetchStartTime) / 1000;
            debug("fetch and decode took ".concat(fetchDuration, " s"));

            if (fetchDuration + 5 > myFetchAhead) {
              myFetchAhead = fetchDuration + 5;
              debug("increase fetch ahead time to ".concat(myFetchAhead, " s"));
            }

            cueAudio({
              segmentTime: segmentTime,
              offset: offset
            }, decodedAudio);
          });
        } else if (remainingTryNexts > 0) {
          debug("Skip that segment and move on");
          remainingTryNexts -= 1;
          cueNextSegment({
            segmentTime: segmentTime + 1000 * segmentDuration,
            offset: 0
          });
        } else {
          debug("Failed to fetch audio after several tries. Resetting player");
          resetPlayer();
        }
      };

      nextSegment = request;
      request.send();
      updateDisplay(true);
    }

    function cueAudio(_ref3, audio) {
      var segmentTime = _ref3.segmentTime,
          offset = _ref3.offset;
      var gainNode = AUDIO_CONTEXT.createGain();
      gainNode.connect(AUDIO_CONTEXT.destination);
      var source = AUDIO_CONTEXT.createBufferSource();
      source.buffer = audio;
      source.connect(gainNode);
      var startAt = currentSegment === null ? AUDIO_CONTEXT.currentTime + 0.05 : Math.max(AUDIO_CONTEXT.currentTime + 0.01, currentSegment.started + currentSegment.source.buffer.duration - currentSegment.offset);
      nextSegment = {
        segmentTime: segmentTime,
        source: source,
        offset: offset,
        started: startAt,
        gainNode: gainNode
      };
      volume.slider();
      nextSegment.source.start(startAt, nextSegment.offset);

      if (currentSegment === null) {
        arkStartedAt = startAt;
      }

      updateDisplay();
      debug("scheduled next segment to start at ".concat(startAt, " offset: ").concat(offset));
    }

    function debug() {
      if (enableDebug) {
        var _console;

        for (var _len = arguments.length, stuff = new Array(_len), _key = 0; _key < _len; _key++) {
          stuff[_key] = arguments[_key];
        }

        // eslint-disable-next-line no-console
        (_console = console).log.apply(_console, ["".concat(new Date().toLocaleTimeString(), " ac.ct=").concat(AUDIO_CONTEXT.currentTime)].concat(stuff));
      }
    }
    /**
     * @param {HTMLElement} selectEl
     */


    function populateDate(selectEl) {
      pickerOpts.dates.forEach(function (date, i) {
        // eslint-disable-next-line no-param-reassign
        selectEl[i] = new Option(date, date);
      });
    }
    /**
     * @param {HTMLElement} selectEl
     */


    function populateHours(selectEl, date) {
      var hourSelect = selectEl;
      var previousSelection = hourSelect.selectedOptions[0] && hourSelect.selectedOptions[0].innerText;

      while (hourSelect.options.length > 0) {
        hourSelect.remove(0);
      }

      var l = pickerOpts.hours[date].length - 1;

      for (var i = 0; i <= l; i += 1) {
        hourSelect[i] = new Option(pickerOpts.hours[date][l - i][0], pickerOpts.hours[date][l - i][1]);

        if (previousSelection && hourSelect[i].innerText === previousSelection) {
          hourSelect[i].selected = true;
        }
      }
    }
    /**
     * @param {HTMLElement} selectEl
     * @param {number} step
     */


    function populateMinutes(selectEl) {
      ['00', '15', '30', '45'].forEach(function (minute, i) {
        // eslint-disable-next-line no-param-reassign
        selectEl[i] = new Option(":".concat(minute), minute);
      });
    }
  };

})();
