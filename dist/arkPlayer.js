(function () {
  'use strict';

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


  var global$x = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  function () {
    return this;
  }() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$e = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$d = fails$e; // Detect IE8's incomplete defineProperty implementation

  var descriptors = !fails$d(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1] != 7;
  });

  var call$9 = Function.prototype.call;
  var functionCall = call$9.bind ? call$9.bind(call$9) : function () {
    return call$9.apply(call$9, arguments);
  };

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

  var createPropertyDescriptor$3 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var FunctionPrototype$2 = Function.prototype;
  var bind$3 = FunctionPrototype$2.bind;
  var call$8 = FunctionPrototype$2.call;
  var callBind = bind$3 && bind$3.bind(call$8);
  var functionUncurryThis = bind$3 ? function (fn) {
    return fn && callBind(call$8, fn);
  } : function (fn) {
    return fn && function () {
      return call$8.apply(fn, arguments);
    };
  };

  var uncurryThis$j = functionUncurryThis;
  var toString$a = uncurryThis$j({}.toString);
  var stringSlice$5 = uncurryThis$j(''.slice);

  var classofRaw$1 = function (it) {
    return stringSlice$5(toString$a(it), 8, -1);
  };

  var global$w = global$x;
  var uncurryThis$i = functionUncurryThis;
  var fails$c = fails$e;
  var classof$7 = classofRaw$1;
  var Object$4 = global$w.Object;
  var split = uncurryThis$i(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails$c(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$4('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$7(it) == 'String' ? split(it, '') : Object$4(it);
  } : Object$4;

  var global$v = global$x;
  var TypeError$a = global$v.TypeError; // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible$8 = function (it) {
    if (it == undefined) throw TypeError$a("Can't call method on " + it);
    return it;
  };

  var IndexedObject$1 = indexedObject;
  var requireObjectCoercible$7 = requireObjectCoercible$8;

  var toIndexedObject$5 = function (it) {
    return IndexedObject$1(requireObjectCoercible$7(it));
  };

  // https://tc39.es/ecma262/#sec-iscallable

  var isCallable$d = function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$c = isCallable$d;

  var isObject$9 = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$c(it);
  };

  var global$u = global$x;
  var isCallable$b = isCallable$d;

  var aFunction = function (argument) {
    return isCallable$b(argument) ? argument : undefined;
  };

  var getBuiltIn$5 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$u[namespace]) : global$u[namespace] && global$u[namespace][method];
  };

  var uncurryThis$h = functionUncurryThis;
  var objectIsPrototypeOf = uncurryThis$h({}.isPrototypeOf);

  var getBuiltIn$4 = getBuiltIn$5;
  var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || '';

  var global$t = global$x;
  var userAgent$1 = engineUserAgent;
  var process = global$t.process;
  var Deno = global$t.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us

    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  } // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0


  if (!version && userAgent$1) {
    match = userAgent$1.match(/Edge\/(\d+)/);

    if (!match || match[1] >= 74) {
      match = userAgent$1.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es/no-symbol -- required for testing */
  var V8_VERSION$2 = engineV8Version;
  var fails$b = fails$e; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$b(function () {
    var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

  var global$s = global$x;
  var getBuiltIn$3 = getBuiltIn$5;
  var isCallable$a = isCallable$d;
  var isPrototypeOf = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
  var Object$3 = global$s.Object;
  var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$3('Symbol');
    return isCallable$a($Symbol) && isPrototypeOf($Symbol.prototype, Object$3(it));
  };

  var global$r = global$x;
  var String$3 = global$r.String;

  var tryToString$1 = function (argument) {
    try {
      return String$3(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var global$q = global$x;
  var isCallable$9 = isCallable$d;
  var tryToString = tryToString$1;
  var TypeError$9 = global$q.TypeError; // `Assert: IsCallable(argument) is true`

  var aCallable$2 = function (argument) {
    if (isCallable$9(argument)) return argument;
    throw TypeError$9(tryToString(argument) + ' is not a function');
  };

  var aCallable$1 = aCallable$2; // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod

  var getMethod$3 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable$1(func);
  };

  var global$p = global$x;
  var call$7 = functionCall;
  var isCallable$8 = isCallable$d;
  var isObject$8 = isObject$9;
  var TypeError$8 = global$p.TypeError; // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive

  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$8(fn = input.toString) && !isObject$8(val = call$7(fn, input))) return val;
    if (isCallable$8(fn = input.valueOf) && !isObject$8(val = call$7(fn, input))) return val;
    if (pref !== 'string' && isCallable$8(fn = input.toString) && !isObject$8(val = call$7(fn, input))) return val;
    throw TypeError$8("Can't convert object to primitive value");
  };

  var shared$4 = {exports: {}};

  var global$o = global$x; // eslint-disable-next-line es/no-object-defineproperty -- safe

  var defineProperty = Object.defineProperty;

  var setGlobal$3 = function (key, value) {
    try {
      defineProperty(global$o, key, {
        value: value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global$o[key] = value;
    }

    return value;
  };

  var global$n = global$x;
  var setGlobal$2 = setGlobal$3;
  var SHARED = '__core-js_shared__';
  var store$3 = global$n[SHARED] || setGlobal$2(SHARED, {});
  var sharedStore = store$3;

  var store$2 = sharedStore;
  (shared$4.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.20.0',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var global$m = global$x;
  var requireObjectCoercible$6 = requireObjectCoercible$8;
  var Object$2 = global$m.Object; // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject

  var toObject$4 = function (argument) {
    return Object$2(requireObjectCoercible$6(argument));
  };

  var uncurryThis$g = functionUncurryThis;
  var toObject$3 = toObject$4;
  var hasOwnProperty = uncurryThis$g({}.hasOwnProperty); // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty

  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$3(it), key);
  };

  var uncurryThis$f = functionUncurryThis;
  var id = 0;
  var postfix = Math.random();
  var toString$9 = uncurryThis$f(1.0.toString);

  var uid$2 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$9(++id + postfix, 36);
  };

  var global$l = global$x;
  var shared$3 = shared$4.exports;
  var hasOwn$6 = hasOwnProperty_1;
  var uid$1 = uid$2;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var WellKnownSymbolsStore = shared$3('wks');
  var Symbol$1 = global$l.Symbol;
  var symbolFor = Symbol$1 && Symbol$1['for'];
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

  var wellKnownSymbol$c = function (name) {
    if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      var description = 'Symbol.' + name;

      if (NATIVE_SYMBOL && hasOwn$6(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else if (USE_SYMBOL_AS_UID && symbolFor) {
        WellKnownSymbolsStore[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
    }

    return WellKnownSymbolsStore[name];
  };

  var global$k = global$x;
  var call$6 = functionCall;
  var isObject$7 = isObject$9;
  var isSymbol$1 = isSymbol$2;
  var getMethod$2 = getMethod$3;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$b = wellKnownSymbol$c;
  var TypeError$7 = global$k.TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$b('toPrimitive'); // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive

  var toPrimitive$1 = function (input, pref) {
    if (!isObject$7(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
    var result;

    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$6(exoticToPrim, input, pref);
      if (!isObject$7(result) || isSymbol$1(result)) return result;
      throw TypeError$7("Can't convert object to primitive value");
    }

    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2; // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey

  var toPropertyKey$3 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var global$j = global$x;
  var isObject$6 = isObject$9;
  var document$1 = global$j.document; // typeof document.createElement is 'object' in old IE

  var EXISTS$1 = isObject$6(document$1) && isObject$6(document$1.createElement);

  var documentCreateElement$2 = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$5 = descriptors;
  var fails$a = fails$e;
  var createElement = documentCreateElement$2; // Thank's IE8 for his funny defineProperty

  var ie8DomDefine = !DESCRIPTORS$5 && !fails$a(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () {
        return 7;
      }
    }).a != 7;
  });

  var DESCRIPTORS$4 = descriptors;
  var call$5 = functionCall;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$2 = createPropertyDescriptor$3;
  var toIndexedObject$4 = toIndexedObject$5;
  var toPropertyKey$2 = toPropertyKey$3;
  var hasOwn$5 = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$4 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$4(O);
    P = toPropertyKey$2(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor(O, P);
    } catch (error) {
      /* empty */
    }
    if (hasOwn$5(O, P)) return createPropertyDescriptor$2(!call$5(propertyIsEnumerableModule.f, O, P), O[P]);
  };

  var objectDefineProperty = {};

  var global$i = global$x;
  var isObject$5 = isObject$9;
  var String$2 = global$i.String;
  var TypeError$6 = global$i.TypeError; // `Assert: Type(argument) is Object`

  var anObject$8 = function (argument) {
    if (isObject$5(argument)) return argument;
    throw TypeError$6(String$2(argument) + ' is not an object');
  };

  var global$h = global$x;
  var DESCRIPTORS$3 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var anObject$7 = anObject$8;
  var toPropertyKey$1 = toPropertyKey$3;
  var TypeError$5 = global$h.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

  var $defineProperty = Object.defineProperty; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  objectDefineProperty.f = DESCRIPTORS$3 ? $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$7(O);
    P = toPropertyKey$1(P);
    anObject$7(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$5('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$2 = descriptors;
  var definePropertyModule$4 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$3;
  var createNonEnumerableProperty$5 = DESCRIPTORS$2 ? function (object, key, value) {
    return definePropertyModule$4.f(object, key, createPropertyDescriptor$1(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$3 = {exports: {}};

  var uncurryThis$e = functionUncurryThis;
  var isCallable$7 = isCallable$d;
  var store$1 = sharedStore;
  var functionToString = uncurryThis$e(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

  if (!isCallable$7(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource$3 = store$1.inspectSource;

  var global$g = global$x;
  var isCallable$6 = isCallable$d;
  var inspectSource$2 = inspectSource$3;
  var WeakMap$1 = global$g.WeakMap;
  var nativeWeakMap = isCallable$6(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));

  var shared$2 = shared$4.exports;
  var uid = uid$2;
  var keys = shared$2('keys');

  var sharedKey$2 = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys$4 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$f = global$x;
  var uncurryThis$d = functionUncurryThis;
  var isObject$4 = isObject$9;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
  var hasOwn$4 = hasOwnProperty_1;
  var shared$1 = sharedStore;
  var sharedKey$1 = sharedKey$2;
  var hiddenKeys$3 = hiddenKeys$4;
  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$4 = global$f.TypeError;
  var WeakMap = global$f.WeakMap;
  var set, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;

      if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$4('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$1.state) {
    var store = shared$1.state || (shared$1.state = new WeakMap());
    var wmget = uncurryThis$d(store.get);
    var wmhas = uncurryThis$d(store.has);
    var wmset = uncurryThis$d(store.set);

    set = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$4(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };

    get = function (it) {
      return wmget(store, it) || {};
    };

    has = function (it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey$1('state');
    hiddenKeys$3[STATE] = true;

    set = function (it, metadata) {
      if (hasOwn$4(it, STATE)) throw new TypeError$4(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$4(it, STATE, metadata);
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
  var FunctionPrototype$1 = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var getDescriptor = DESCRIPTORS$1 && Object.getOwnPropertyDescriptor;
  var EXISTS = hasOwn$3(FunctionPrototype$1, 'name'); // additional protection from minified / mangled / dropped function names

  var PROPER = EXISTS && function something() {
    /* empty */
  }.name === 'something';

  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$1 || DESCRIPTORS$1 && getDescriptor(FunctionPrototype$1, 'name').configurable);
  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var global$e = global$x;
  var isCallable$5 = isCallable$d;
  var hasOwn$2 = hasOwnProperty_1;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
  var setGlobal$1 = setGlobal$3;
  var inspectSource$1 = inspectSource$3;
  var InternalStateModule = internalState;
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
  var getInternalState$1 = InternalStateModule.get;
  var enforceInternalState = InternalStateModule.enforce;
  var TEMPLATE = String(String).split('String');
  (redefine$3.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;

    if (isCallable$5(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }

      if (!hasOwn$2(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        createNonEnumerableProperty$3(value, 'name', name);
      }

      state = enforceInternalState(value);

      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }

    if (O === global$e) {
      if (simple) O[key] = value;else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }

    if (simple) O[key] = value;else createNonEnumerableProperty$3(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable$5(this) && getInternalState$1(this).source || inspectSource$1(this);
  });

  var objectGetOwnPropertyNames = {};

  var ceil$1 = Math.ceil;
  var floor$1 = Math.floor; // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity

  var toIntegerOrInfinity$5 = function (argument) {
    var number = +argument; // eslint-disable-next-line no-self-compare -- safe

    return number !== number || number === 0 ? 0 : (number > 0 ? floor$1 : ceil$1)(number);
  };

  var toIntegerOrInfinity$4 = toIntegerOrInfinity$5;
  var max$2 = Math.max;
  var min$2 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex$2 = function (index, length) {
    var integer = toIntegerOrInfinity$4(index);
    return integer < 0 ? max$2(integer + length, 0) : min$2(integer, length);
  };

  var toIntegerOrInfinity$3 = toIntegerOrInfinity$5;
  var min$1 = Math.min; // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength

  var toLength$4 = function (argument) {
    return argument > 0 ? min$1(toIntegerOrInfinity$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$3 = toLength$4; // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike

  var lengthOfArrayLike$4 = function (obj) {
    return toLength$3(obj.length);
  };

  var toIndexedObject$3 = toIndexedObject$5;
  var toAbsoluteIndex$1 = toAbsoluteIndex$2;
  var lengthOfArrayLike$3 = lengthOfArrayLike$4; // `Array.prototype.{ indexOf, includes }` methods implementation

  var createMethod$3 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$3($this);
      var length = lengthOfArrayLike$3(O);
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
    includes: createMethod$3(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$3(false)
  };

  var uncurryThis$c = functionUncurryThis;
  var hasOwn$1 = hasOwnProperty_1;
  var toIndexedObject$2 = toIndexedObject$5;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$2 = hiddenKeys$4;
  var push$2 = uncurryThis$c([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$2(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push$2(result, key); // Don't enum bug & hidden keys


    while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$2(result, key);
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

  var getBuiltIn$2 = getBuiltIn$5;
  var uncurryThis$b = functionUncurryThis;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$6 = anObject$8;
  var concat$1 = uncurryThis$b([].concat); // all object keys, includes non-enumerable and symbols

  var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$6(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$3 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$3.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var fails$9 = fails$e;
  var isCallable$4 = isCallable$d;
  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : isCallable$4(detection) ? fails$9(detection) : !!detection;
  };

  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';
  var isForced_1 = isForced$1;

  var global$d = global$x;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
  var redefine$2 = redefine$3.exports;
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
      target = global$d;
    } else if (STATIC) {
      target = global$d[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$d[TARGET] || {}).prototype;
    }

    if (target) for (key in source) {
      sourceProperty = source[key];

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];

      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      } // add a flag to not completely full polyfills


      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$2(sourceProperty, 'sham', true);
      } // extend global


      redefine$2(target, key, sourceProperty, options);
    }
  };

  var wellKnownSymbol$a = wellKnownSymbol$c;
  var TO_STRING_TAG$1 = wellKnownSymbol$a('toStringTag');
  var test = {};
  test[TO_STRING_TAG$1] = 'z';
  var toStringTagSupport = String(test) === '[object z]';

  var global$c = global$x;
  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$3 = isCallable$d;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$9 = wellKnownSymbol$c;
  var TO_STRING_TAG = wellKnownSymbol$9('toStringTag');
  var Object$1 = global$c.Object; // ES3 wrong here

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


  var classof$6 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$3(O.callee) ? 'Arguments' : result;
  };

  var global$b = global$x;
  var classof$5 = classof$6;
  var String$1 = global$b.String;

  var toString$8 = function (argument) {
    if (classof$5(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String$1(argument);
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

  var fails$8 = fails$e;
  var global$a = global$x; // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError

  var $RegExp$2 = global$a.RegExp;
  var UNSUPPORTED_Y$1 = fails$8(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  }); // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008

  var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$8(function () {
    return !$RegExp$2('a', 'y').sticky;
  });
  var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$8(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });
  var regexpStickyHelpers = {
    BROKEN_CARET: BROKEN_CARET,
    MISSED_STICKY: MISSED_STICKY,
    UNSUPPORTED_Y: UNSUPPORTED_Y$1
  };

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
  var toIndexedObject$1 = toIndexedObject$5;
  var objectKeys = objectKeys$1; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe

  var objectDefineProperties = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$4(O);
    var props = toIndexedObject$1(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;

    while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);

    return O;
  };

  var getBuiltIn$1 = getBuiltIn$5;
  var html$1 = getBuiltIn$1('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */
  var anObject$3 = anObject$8;
  var defineProperties = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$4;
  var html = html$1;
  var documentCreateElement$1 = documentCreateElement$2;
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
    var iframe = documentCreateElement$1('iframe');
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

  var fails$7 = fails$e;
  var global$9 = global$x; // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError

  var $RegExp$1 = global$9.RegExp;
  var regexpUnsupportedDotAll = fails$7(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$6 = fails$e;
  var global$8 = global$x; // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError

  var $RegExp = global$8.RegExp;
  var regexpUnsupportedNcg = fails$6(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

  /* eslint-disable regexp/no-useless-quantifier -- testing */


  var call$4 = functionCall;
  var uncurryThis$a = functionUncurryThis;
  var toString$7 = toString$8;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var shared = shared$4.exports;
  var create$1 = objectCreate;
  var getInternalState = internalState.get;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;
  var nativeReplace = shared('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$3 = uncurryThis$a(''.charAt);
  var indexOf = uncurryThis$a(''.indexOf);
  var replace$1 = uncurryThis$a(''.replace);
  var stringSlice$4 = uncurryThis$a(''.slice);

  var UPDATES_LAST_INDEX_WRONG = function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call$4(nativeExec, re1, 'a');
    call$4(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  }();

  var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  if (PATCH) {
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState(re);
      var str = toString$7(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$4(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y && re.sticky;
      var flags = call$4(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = replace$1(flags, 'y', '');

        if (indexOf(flags, 'g') === -1) {
          flags += 'g';
        }

        strCopy = stringSlice$4(str, re.lastIndex); // Support anchored sticky behavior.

        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$3(str, re.lastIndex - 1) !== '\n')) {
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
      match = call$4(nativeExec, sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = stringSlice$4(match.input, charsAdded);
          match[0] = stringSlice$4(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }

      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        call$4(nativeReplace, match[0], reCopy, function () {
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

  var $$6 = _export;
  var exec$1 = regexpExec$2; // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec

  $$6({
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== exec$1
  }, {
    exec: exec$1
  });

  var FunctionPrototype = Function.prototype;
  var apply$1 = FunctionPrototype.apply;
  var bind$2 = FunctionPrototype.bind;
  var call$3 = FunctionPrototype.call; // eslint-disable-next-line es/no-reflect -- safe

  var functionApply = typeof Reflect == 'object' && Reflect.apply || (bind$2 ? call$3.bind(apply$1) : function () {
    return call$3.apply(apply$1, arguments);
  });

  var uncurryThis$9 = functionUncurryThis;
  var redefine$1 = redefine$3.exports;
  var regexpExec$1 = regexpExec$2;
  var fails$5 = fails$e;
  var wellKnownSymbol$8 = wellKnownSymbol$c;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
  var SPECIES$3 = wellKnownSymbol$8('species');
  var RegExpPrototype = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$8(KEY);
    var DELEGATES_TO_SYMBOL = !fails$5(function () {
      // String methods call symbol-named RegEp methods
      var O = {};

      O[SYMBOL] = function () {
        return 7;
      };

      return ''[KEY](O) != 7;
    });
    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$5(function () {
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

        re.constructor[SPECIES$3] = function () {
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
      var uncurriedNativeRegExpMethod = uncurryThis$9(/./[SYMBOL]);
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$9(nativeMethod);
        var $exec = regexp.exec;

        if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return {
              done: true,
              value: uncurriedNativeRegExpMethod(regexp, str, arg2)
            };
          }

          return {
            done: true,
            value: uncurriedNativeMethod(str, regexp, arg2)
          };
        }

        return {
          done: false
        };
      });
      redefine$1(String.prototype, KEY, methods[0]);
      redefine$1(RegExpPrototype, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$1(RegExpPrototype[SYMBOL], 'sham', true);
  };

  var uncurryThis$8 = functionUncurryThis;
  var toIntegerOrInfinity$2 = toIntegerOrInfinity$5;
  var toString$6 = toString$8;
  var requireObjectCoercible$5 = requireObjectCoercible$8;
  var charAt$2 = uncurryThis$8(''.charAt);
  var charCodeAt = uncurryThis$8(''.charCodeAt);
  var stringSlice$3 = uncurryThis$8(''.slice);

  var createMethod$2 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$6(requireObjectCoercible$5($this));
      var position = toIntegerOrInfinity$2(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? charAt$2(S, position) : first : CONVERT_TO_STRING ? stringSlice$3(S, position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
  };

  var charAt$1 = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex

  var advanceStringIndex$2 = function (S, index, unicode) {
    return index + (unicode ? charAt$1(S, index).length : 1);
  };

  var uncurryThis$7 = functionUncurryThis;
  var toObject$2 = toObject$4;
  var floor = Math.floor;
  var charAt = uncurryThis$7(''.charAt);
  var replace = uncurryThis$7(''.replace);
  var stringSlice$2 = uncurryThis$7(''.slice);
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g; // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution

  var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

    if (namedCaptures !== undefined) {
      namedCaptures = toObject$2(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }

    return replace(replacement, symbols, function (match, ch) {
      var capture;

      switch (charAt(ch, 0)) {
        case '$':
          return '$';

        case '&':
          return matched;

        case '`':
          return stringSlice$2(str, 0, position);

        case "'":
          return stringSlice$2(str, tailPos);

        case '<':
          capture = namedCaptures[stringSlice$2(ch, 1, -1)];
          break;

        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;

          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
            return match;
          }

          capture = captures[n - 1];
      }

      return capture === undefined ? '' : capture;
    });
  };

  var global$7 = global$x;
  var call$2 = functionCall;
  var anObject$2 = anObject$8;
  var isCallable$2 = isCallable$d;
  var classof$4 = classofRaw$1;
  var regexpExec = regexpExec$2;
  var TypeError$3 = global$7.TypeError; // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec

  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;

    if (isCallable$2(exec)) {
      var result = call$2(exec, R, S);
      if (result !== null) anObject$2(result);
      return result;
    }

    if (classof$4(R) === 'RegExp') return call$2(regexpExec, R, S);
    throw TypeError$3('RegExp#exec called on incompatible receiver');
  };

  var apply = functionApply;
  var call$1 = functionCall;
  var uncurryThis$6 = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var fails$4 = fails$e;
  var anObject$1 = anObject$8;
  var isCallable$1 = isCallable$d;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$5;
  var toLength$2 = toLength$4;
  var toString$5 = toString$8;
  var requireObjectCoercible$4 = requireObjectCoercible$8;
  var advanceStringIndex$1 = advanceStringIndex$2;
  var getMethod$1 = getMethod$3;
  var getSubstitution = getSubstitution$1;
  var regExpExec$1 = regexpExecAbstract;
  var wellKnownSymbol$7 = wellKnownSymbol$c;
  var REPLACE = wellKnownSymbol$7('replace');
  var max$1 = Math.max;
  var min = Math.min;
  var concat = uncurryThis$6([].concat);
  var push$1 = uncurryThis$6([].push);
  var stringIndexOf$1 = uncurryThis$6(''.indexOf);
  var stringSlice$1 = uncurryThis$6(''.slice);

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  }; // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0


  var REPLACE_KEEPS_$0 = function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  }(); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string


  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }

    return false;
  }();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$4(function () {
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
      var O = requireObjectCoercible$4(this);
      var replacer = searchValue == undefined ? undefined : getMethod$1(searchValue, REPLACE);
      return replacer ? call$1(replacer, searchValue, O, replaceValue) : call$1(nativeReplace, toString$5(O), searchValue, replaceValue);
    }, // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject$1(this);
      var S = toString$5(string);

      if (typeof replaceValue == 'string' && stringIndexOf$1(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf$1(replaceValue, '$<') === -1) {
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
        push$1(results, result);
        if (!global) break;
        var matchStr = toString$5(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$2(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;

      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = toString$5(result[0]);
        var position = max$1(min(toIntegerOrInfinity$1(result.index), S.length), 0);
        var captures = []; // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

        for (var j = 1; j < result.length; j++) push$1(captures, maybeToString(result[j]));

        var namedCaptures = result.groups;

        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push$1(replacerArgs, namedCaptures);
          var replacement = toString$5(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }

        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice$1(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }

      return accumulatedResult + stringSlice$1(S, nextSourcePosition);
    }];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var wellKnownSymbol$6 = wellKnownSymbol$c;
  var create = objectCreate;
  var definePropertyModule$1 = objectDefineProperty;
  var UNSCOPABLES = wellKnownSymbol$6('unscopables');
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

  var isObject$3 = isObject$9;
  var classof$3 = classofRaw$1;
  var wellKnownSymbol$5 = wellKnownSymbol$c;
  var MATCH$1 = wellKnownSymbol$5('match'); // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp

  var isRegexp = function (it) {
    var isRegExp;
    return isObject$3(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$3(it) == 'RegExp');
  };

  var global$6 = global$x;
  var isRegExp = isRegexp;
  var TypeError$2 = global$6.TypeError;

  var notARegexp = function (it) {
    if (isRegExp(it)) {
      throw TypeError$2("The method doesn't accept regular expressions");
    }

    return it;
  };

  var wellKnownSymbol$4 = wellKnownSymbol$c;
  var MATCH = wellKnownSymbol$4('match');

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
  var uncurryThis$5 = functionUncurryThis;
  var notARegExp = notARegexp;
  var requireObjectCoercible$3 = requireObjectCoercible$8;
  var toString$4 = toString$8;
  var correctIsRegExpLogic = correctIsRegexpLogic;
  var stringIndexOf = uncurryThis$5(''.indexOf); // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes

  $$4({
    target: 'String',
    proto: true,
    forced: !correctIsRegExpLogic('includes')
  }, {
    includes: function includes(searchString
    /* , position = 0 */
    ) {
      return !!~stringIndexOf(toString$4(requireObjectCoercible$3(this)), toString$4(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var classof$2 = classofRaw$1; // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe

  var isArray$3 = Array.isArray || function isArray(argument) {
    return classof$2(argument) == 'Array';
  };

  var toPropertyKey = toPropertyKey$3;
  var definePropertyModule = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$3;

  var createProperty$2 = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
  };

  var uncurryThis$4 = functionUncurryThis;
  var fails$3 = fails$e;
  var isCallable = isCallable$d;
  var classof$1 = classof$6;
  var getBuiltIn = getBuiltIn$5;
  var inspectSource = inspectSource$3;

  var noop = function () {
    /* empty */
  };

  var empty = [];
  var construct = getBuiltIn('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = uncurryThis$4(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable(argument)) return false;

    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable(argument)) return false;

    switch (classof$1(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction':
        return false;
    }

    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor

  var isConstructor$2 = !construct || fails$3(function () {
    var called;
    return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
      called = true;
    }) || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var global$5 = global$x;
  var isArray$2 = isArray$3;
  var isConstructor$1 = isConstructor$2;
  var isObject$2 = isObject$9;
  var wellKnownSymbol$3 = wellKnownSymbol$c;
  var SPECIES$2 = wellKnownSymbol$3('species');
  var Array$2 = global$5.Array; // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;

    if (isArray$2(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (isConstructor$1(C) && (C === Array$2 || isArray$2(C.prototype))) C = undefined;else if (isObject$2(C)) {
        C = C[SPECIES$2];
        if (C === null) C = undefined;
      }
    }

    return C === undefined ? Array$2 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1; // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesCreate$2 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var fails$2 = fails$e;
  var wellKnownSymbol$2 = wellKnownSymbol$c;
  var V8_VERSION$1 = engineV8Version;
  var SPECIES$1 = wellKnownSymbol$2('species');

  var arrayMethodHasSpeciesSupport$3 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$2(function () {
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
  var global$4 = global$x;
  var fails$1 = fails$e;
  var isArray$1 = isArray$3;
  var isObject$1 = isObject$9;
  var toObject$1 = toObject$4;
  var lengthOfArrayLike$2 = lengthOfArrayLike$4;
  var createProperty$1 = createProperty$2;
  var arraySpeciesCreate$1 = arraySpeciesCreate$2;
  var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$3;
  var wellKnownSymbol$1 = wellKnownSymbol$c;
  var V8_VERSION = engineV8Version;
  var IS_CONCAT_SPREADABLE = wellKnownSymbol$1('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
  var TypeError$1 = global$4.TypeError; // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679

  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$1(function () {
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
      var O = toObject$1(this);
      var A = arraySpeciesCreate$1(O, 0);
      var n = 0;
      var i, k, length, len, E;

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];

        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike$2(E);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError$1(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

          for (k = 0; k < len; k++, n++) if (k in E) createProperty$1(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError$1(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty$1(A, n++, E);
        }
      }

      A.length = n;
      return A;
    }
  });

  var uncurryThis$3 = functionUncurryThis;
  var arraySlice = uncurryThis$3([].slice);

  var $$2 = _export;
  var global$3 = global$x;
  var isArray = isArray$3;
  var isConstructor = isConstructor$2;
  var isObject = isObject$9;
  var toAbsoluteIndex = toAbsoluteIndex$2;
  var lengthOfArrayLike$1 = lengthOfArrayLike$4;
  var toIndexedObject = toIndexedObject$5;
  var createProperty = createProperty$2;
  var wellKnownSymbol = wellKnownSymbol$c;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$3;
  var un$Slice = arraySlice;
  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('slice');
  var SPECIES = wellKnownSymbol('species');
  var Array$1 = global$3.Array;
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
      var length = lengthOfArrayLike$1(O);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

      var Constructor, result, n;

      if (isArray(O)) {
        Constructor = O.constructor; // cross-realm fallback

        if (isConstructor(Constructor) && (Constructor === Array$1 || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }

        if (Constructor === Array$1 || Constructor === undefined) {
          return un$Slice(O, k, fin);
        }
      }

      result = new (Constructor === undefined ? Array$1 : Constructor)(max(fin - k, 0));

      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

      result.length = n;
      return result;
    }
  });

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof = classof$6; // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine = redefine$3.exports;
  var toString$3 = objectToString; // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  if (!TO_STRING_TAG_SUPPORT) {
    redefine(Object.prototype, 'toString', toString$3, {
      unsafe: true
    });
  }

  var global$2 = global$x;
  var toIntegerOrInfinity = toIntegerOrInfinity$5;
  var toString$2 = toString$8;
  var requireObjectCoercible$2 = requireObjectCoercible$8;
  var RangeError = global$2.RangeError; // `String.prototype.repeat` method implementation
  // https://tc39.es/ecma262/#sec-string.prototype.repeat

  var stringRepeat = function repeat(count) {
    var str = toString$2(requireObjectCoercible$2(this));
    var result = '';
    var n = toIntegerOrInfinity(count);
    if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

    for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

    return result;
  };

  var uncurryThis$2 = functionUncurryThis;
  var toLength$1 = toLength$4;
  var toString$1 = toString$8;
  var $repeat = stringRepeat;
  var requireObjectCoercible$1 = requireObjectCoercible$8;
  var repeat = uncurryThis$2($repeat);
  var stringSlice = uncurryThis$2(''.slice);
  var ceil = Math.ceil; // `String.prototype.{ padStart, padEnd }` methods implementation

  var createMethod$1 = function (IS_END) {
    return function ($this, maxLength, fillString) {
      var S = toString$1(requireObjectCoercible$1($this));
      var intMaxLength = toLength$1(maxLength);
      var stringLength = S.length;
      var fillStr = fillString === undefined ? ' ' : toString$1(fillString);
      var fillLen, stringFiller;
      if (intMaxLength <= stringLength || fillStr == '') return S;
      fillLen = intMaxLength - stringLength;
      stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length));
      if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen);
      return IS_END ? S + stringFiller : stringFiller + S;
    };
  };

  var stringPad = {
    // `String.prototype.padStart` method
    // https://tc39.es/ecma262/#sec-string.prototype.padstart
    start: createMethod$1(false),
    // `String.prototype.padEnd` method
    // https://tc39.es/ecma262/#sec-string.prototype.padend
    end: createMethod$1(true)
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

  var uncurryThis$1 = functionUncurryThis;
  var aCallable = aCallable$2;
  var bind$1 = uncurryThis$1(uncurryThis$1.bind); // optional / simple context binding

  var functionBindContext = function (fn, that) {
    aCallable(fn);
    return that === undefined ? fn : bind$1 ? bind$1(fn, that) : function
      /* ...args */
    () {
      return fn.apply(that, arguments);
    };
  };

  var bind = functionBindContext;
  var uncurryThis = functionUncurryThis;
  var IndexedObject = indexedObject;
  var toObject = toObject$4;
  var lengthOfArrayLike = lengthOfArrayLike$4;
  var arraySpeciesCreate = arraySpeciesCreate$2;
  var push = uncurryThis([].push); // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

  var createMethod = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = IndexedObject(O);
      var boundFunction = bind(callbackfn, that);
      var length = lengthOfArrayLike(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
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
              push(target, value);
            // filter
          } else switch (TYPE) {
            case 4:
              return false;
            // every

            case 7:
              push(target, value);
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
    forEach: createMethod(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod(7)
  };

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

  var call = functionCall;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var anObject = anObject$8;
  var toLength = toLength$4;
  var toString = toString$8;
  var requireObjectCoercible = requireObjectCoercible$8;
  var getMethod = getMethod$3;
  var advanceStringIndex = advanceStringIndex$2;
  var regExpExec = regexpExecAbstract; // @@match logic

  fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [// `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
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

  var documentCreateElement = documentCreateElement$2;
  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;
  var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

  var fails = fails$e;

  var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
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

  var global$1 = global$x;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty = createNonEnumerableProperty$5;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    if (DOMIterables[COLLECTION_NAME]) {
      handlePrototype(global$1[COLLECTION_NAME] && global$1[COLLECTION_NAME].prototype);
    }
  }

  handlePrototype(DOMTokenListPrototype);

  /* Copyright Spinitron LLC */

  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
  window.ark2Player = function (container, options) {
    var stationName = options.stationName,
        timeZone = options.timeZone,
        _options$enableDebug = options.enableDebug,
        enableDebug = _options$enableDebug === void 0 ? false : _options$enableDebug,
        _options$hlsBaseUrl = options.hlsBaseUrl,
        hlsBaseUrl = _options$hlsBaseUrl === void 0 ? 'https://ark2.spinitron.com/ark2' : _options$hlsBaseUrl,
        _options$errorReportU = options.errorReportUrl,
        errorReportUrl = _options$errorReportU === void 0 ? 'https://ark2.spinitron.com/errorlog/' : _options$errorReportU;
    /** @type {HTMLMediaElement} */

    var theMediaElement = container.querySelector('.ark-player__media-element');
    var myhls;
    var pleaseReload = true;
    var baseStart = container.dataset.arkStart || "".concat(new Date(new Date().getTime() - 7200000).toISOString().substring(0, 13).replace(/-/g, ''), "0000Z");
    var pickerOpts = {
      dates: [],
      hours: {}
    };
    var arkStartTime = null;
    debug('ark player init: ', options); // Uee localeStuff as argument to Date.toLocaleString() etc. If browser can't do timezones, empty array
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
    var playerPicker = container.querySelector('.ark-player__picker');
    resetPlayer(); // Initialize pickerOpts, the date-time picker database.

    (function () {
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

    function resetPlayer() {
      debug('resetPlayer');
      arkStartTime = null;
      pleaseReload = true;
      playerStatus.querySelector('.ark-player__date').innerHTML = '--/--/--';
      playerStatus.querySelector('.ark-player__time').innerHTML = '-:--:-- --';
      playerStatus.classList.toggle('waiting', true);
    }

    function playButton() {
      if (pleaseReload) {
        startArk(baseStart);
      } else {
        if (theMediaElement.paused) {
          theMediaElement.play();
        } else {
          theMediaElement.pause();
        }

        updateDisplay();
      }
    }

    function pressPlay() {
      theMediaElement.play();

      theMediaElement.ontimeupdate = function () {
        updateTime();
      };

      updateDisplay();
    }

    function startArk(startTimestamp) {
      debug("startArk(".concat(startTimestamp, ")"));
      setupPicker(startTimestamp);
      var d = startTimestamp.match(/^(\d\d\d\d)(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)Z$/).slice(1).map(function (δ) {
        return parseInt(δ, 10);
      });
      arkStartTime = Date.UTC(d[0], d[1] - 1, d[2], d[3], d[4], d[5]);
      var playlistUrl = "".concat(hlsBaseUrl, "/").concat(stationName, "-").concat(startTimestamp, "/index.m3u8");

      if (Hls.isSupported()) {
        debug("Using Hls.js");

        if (myhls === undefined) {
          myhls = new Hls();
        }

        myhls.attachMedia(theMediaElement);
        myhls.on(Hls.Events.MEDIA_ATTACHED, function () {
          myhls.loadSource(playlistUrl);
          pleaseReload = false;
          myhls.on(Hls.Events.ERROR, handleHlsError);
          myhls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            pressPlay();
          });
        });
        document.querySelector('.ark-player__mode-hint').innerHTML = 'H';
      } else if (theMediaElement.canPlayType('application/vnd.apple.mpegurl')) {
        debug("Using native HLS");
        theMediaElement.src = playlistUrl;
        pleaseReload = false;
        pressPlay();
        document.querySelector('.ark-player__mode-hint').innerHTML = 'N';
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
          theMediaElement.volume = (muted ? 0 : vol) / 100;
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

    function updateDisplay() {
      var hide = 'ark-player_hide'; // Show the player if it was hidden when no start time provided.

      container.classList.toggle(hide, false);
      playerControl.querySelector('.ark-player__play').classList.toggle(hide, !theMediaElement.paused);
      playerControl.querySelector('.ark-player__pause').classList.toggle(hide, theMediaElement.paused);
      playerPicker.classList.toggle(hide, !theMediaElement.paused);
      playerStatus.classList.toggle(hide, theMediaElement.paused);
    }

    function updateTime() {
      if (arkStartTime) {
        var arkTime = new Date(arkStartTime + Math.round(1000 * theMediaElement.currentTime));
        var timestring = arkTime.toLocaleDateString.apply(arkTime, _toConsumableArray(localeStuff)).replace(/(^\d\d?\/\d\d?\/)\d\d(\d\d)/, '$1$2');
        playerStatus.querySelector('.ark-player__date').innerHTML = timestring;
        playerStatus.querySelector('.ark-player__time').innerHTML = arkTime.toLocaleTimeString.apply(arkTime, _toConsumableArray(localeStuff));
        playerStatus.classList.toggle('waiting', false);
      }
    }

    function telemetry(data) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', errorReportUrl, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      var body = JSON.stringify({
        userAgent: navigator.userAgent,
        location: document.location.href,
        stationName: stationName,
        timeZone: timeZone,
        hlsBaseUrl: hlsBaseUrl,
        data: data
      });
      xhr.send(body);
    }

    function debug() {
      if (enableDebug) {
        var _console;

        for (var _len = arguments.length, stuff = new Array(_len), _key = 0; _key < _len; _key++) {
          stuff[_key] = arguments[_key];
        }

        (_console = console).log.apply(_console, ["".concat(new Date().toLocaleTimeString(), " ")].concat(stuff));

        telemetry(stuff);
      }
    }

    function handleHlsError(event, data) {
      if (data.fatal) {
        telemetry(data);

        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            debug('fatal network error');
            myhls.startLoad();
            break;

          case Hls.ErrorTypes.MEDIA_ERROR:
            debug('fatal media error');
            myhls.recoverMediaError();
            break;

          default:
            debug('unrecoverable fatal error, des');
            myhls.destroy();
        }
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
