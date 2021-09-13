(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global$e =
	/* global globalThis -- safe */
	check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
	function () {
	  return this;
	}() || Function('return this')();

	var objectGetOwnPropertyDescriptor = {};

	var fails$b = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$a = fails$b; // Detect IE8's incomplete defineProperty implementation

	var descriptors = !fails$a(function () {
	  return Object.defineProperty({}, 1, {
	    get: function () {
	      return 7;
	    }
	  })[1] != 7;
	});

	var objectPropertyIsEnumerable = {};

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !nativePropertyIsEnumerable.call({
	  1: 2
	}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var createPropertyDescriptor$3 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var fails$9 = fails$b;
	var classof$4 = classofRaw;
	var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

	var indexedObject = fails$9(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$4(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// https://tc39.es/ecma262/#sec-requireobjectcoercible

	var requireObjectCoercible$8 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var IndexedObject$2 = indexedObject;
	var requireObjectCoercible$7 = requireObjectCoercible$8;

	var toIndexedObject$4 = function (it) {
	  return IndexedObject$2(requireObjectCoercible$7(it));
	};

	var isObject$8 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var isObject$7 = isObject$8; // `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string

	var toPrimitive$3 = function (input, PREFERRED_STRING) {
	  if (!isObject$7(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$7(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject$7(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$7(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has$6 = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var global$d = global$e;
	var isObject$6 = isObject$8;
	var document$1 = global$d.document; // typeof document.createElement is 'object' in old IE

	var EXISTS = isObject$6(document$1) && isObject$6(document$1.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$4 = descriptors;
	var fails$8 = fails$b;
	var createElement = documentCreateElement$1; // Thank's IE8 for his funny defineProperty

	var ie8DomDefine = !DESCRIPTORS$4 && !fails$8(function () {
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var DESCRIPTORS$3 = descriptors;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$2 = createPropertyDescriptor$3;
	var toIndexedObject$3 = toIndexedObject$4;
	var toPrimitive$2 = toPrimitive$3;
	var has$5 = has$6;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;
	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3 ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$3(O);
	  P = toPrimitive$2(P, true);
	  if (IE8_DOM_DEFINE$1) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {
	    /* empty */
	  }
	  if (has$5(O, P)) return createPropertyDescriptor$2(!propertyIsEnumerableModule.f.call(O, P), O[P]);
	};

	var objectDefineProperty = {};

	var isObject$5 = isObject$8;

	var anObject$7 = function (it) {
	  if (!isObject$5(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  }

	  return it;
	};

	var DESCRIPTORS$2 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var anObject$6 = anObject$7;
	var toPrimitive$1 = toPrimitive$3;
	var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty

	objectDefineProperty.f = DESCRIPTORS$2 ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject$6(O);
	  P = toPrimitive$1(P, true);
	  anObject$6(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$1 = descriptors;
	var definePropertyModule$4 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$3;
	var createNonEnumerableProperty$6 = DESCRIPTORS$1 ? function (object, key, value) {
	  return definePropertyModule$4.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var redefine$2 = {exports: {}};

	var global$c = global$e;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$6;

	var setGlobal$3 = function (key, value) {
	  try {
	    createNonEnumerableProperty$5(global$c, key, value);
	  } catch (error) {
	    global$c[key] = value;
	  }

	  return value;
	};

	var global$b = global$e;
	var setGlobal$2 = setGlobal$3;
	var SHARED = '__core-js_shared__';
	var store$3 = global$b[SHARED] || setGlobal$2(SHARED, {});
	var sharedStore = store$3;

	var store$2 = sharedStore;
	var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

	if (typeof store$2.inspectSource != 'function') {
	  store$2.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource$2 = store$2.inspectSource;

	var global$a = global$e;
	var inspectSource$1 = inspectSource$2;
	var WeakMap$1 = global$a.WeakMap;
	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$1(WeakMap$1));

	var shared$3 = {exports: {}};

	var store$1 = sharedStore;
	(shared$3.exports = function (key, value) {
	  return store$1[key] || (store$1[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.9.0',
	  mode: 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});

	var id = 0;
	var postfix = Math.random();

	var uid$2 = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var shared$2 = shared$3.exports;
	var uid$1 = uid$2;
	var keys = shared$2('keys');

	var sharedKey$2 = function (key) {
	  return keys[key] || (keys[key] = uid$1(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$9 = global$e;
	var isObject$4 = isObject$8;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$6;
	var objectHas = has$6;
	var shared$1 = sharedStore;
	var sharedKey$1 = sharedKey$2;
	var hiddenKeys$3 = hiddenKeys$4;
	var WeakMap = global$9.WeakMap;
	var set, get, has$4;

	var enforce = function (it) {
	  return has$4(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;

	    if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    }

	    return state;
	  };
	};

	if (NATIVE_WEAK_MAP) {
	  var store = shared$1.state || (shared$1.state = new WeakMap());
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;

	  set = function (it, metadata) {
	    metadata.facade = it;
	    wmset.call(store, it, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };

	  has$4 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey$1('state');
	  hiddenKeys$3[STATE] = true;

	  set = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty$4(it, STATE, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return objectHas(it, STATE) ? it[STATE] : {};
	  };

	  has$4 = function (it) {
	    return objectHas(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$4,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var global$8 = global$e;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$6;
	var has$3 = has$6;
	var setGlobal$1 = setGlobal$3;
	var inspectSource = inspectSource$2;
	var InternalStateModule = internalState;
	var getInternalState = InternalStateModule.get;
	var enforceInternalState = InternalStateModule.enforce;
	var TEMPLATE = String(String).split('String');
	(redefine$2.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var state;

	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has$3(value, 'name')) {
	      createNonEnumerableProperty$3(value, 'name', key);
	    }

	    state = enforceInternalState(value);

	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }
	  }

	  if (O === global$8) {
	    if (simple) O[key] = value;else setGlobal$1(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }

	  if (simple) O[key] = value;else createNonEnumerableProperty$3(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});

	var global$7 = global$e;
	var path$1 = global$7;

	var path = path$1;
	var global$6 = global$e;

	var aFunction$3 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn$3 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$3(path[namespace]) || aFunction$3(global$6[namespace]) : path[namespace] && path[namespace][method] || global$6[namespace] && global$6[namespace][method];
	};

	var objectGetOwnPropertyNames = {};

	var ceil$1 = Math.ceil;
	var floor$1 = Math.floor; // `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger

	var toInteger$5 = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$1 : ceil$1)(argument);
	};

	var toInteger$4 = toInteger$5;
	var min$2 = Math.min; // `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength

	var toLength$8 = function (argument) {
	  return argument > 0 ? min$2(toInteger$4(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toInteger$3 = toInteger$5;
	var max$2 = Math.max;
	var min$1 = Math.min; // Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

	var toAbsoluteIndex$2 = function (index, length) {
	  var integer = toInteger$3(index);
	  return integer < 0 ? max$2(integer + length, 0) : min$1(integer, length);
	};

	var toIndexedObject$2 = toIndexedObject$4;
	var toLength$7 = toLength$8;
	var toAbsoluteIndex$1 = toAbsoluteIndex$2; // `Array.prototype.{ indexOf, includes }` methods implementation

	var createMethod$4 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$2($this);
	    var length = toLength$7(O.length);
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
	  includes: createMethod$4(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$4(false)
	};

	var has$2 = has$6;
	var toIndexedObject$1 = toIndexedObject$4;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$1(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) !has$2(hiddenKeys$2, key) && has$2(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (has$2(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;
	var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames

	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$1);
	};

	var objectGetOwnPropertySymbols = {};

	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$2 = getBuiltIn$3;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$5 = anObject$7; // all object keys, includes non-enumerable and symbols

	var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$5(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var has$1 = has$6;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$3 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$3.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has$1(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var fails$7 = fails$b;
	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails$7(detection) : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';
	var isForced_1 = isForced$1;

	var global$5 = global$e;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$6;
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
	*/

	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

	  if (GLOBAL) {
	    target = global$5;
	  } else if (STATIC) {
	    target = global$5[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$5[TARGET] || {}).prototype;
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
	      createNonEnumerableProperty$2(sourceProperty, 'sham', true);
	    } // extend global


	    redefine$1(target, key, sourceProperty, options);
	  }
	};

	var classof$3 = classofRaw; // `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray

	var isArray$3 = Array.isArray || function isArray(arg) {
	  return classof$3(arg) == 'Array';
	};

	var requireObjectCoercible$6 = requireObjectCoercible$8; // `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject

	var toObject$5 = function (argument) {
	  return Object(requireObjectCoercible$6(argument));
	};

	var toPrimitive = toPrimitive$3;
	var definePropertyModule$2 = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$3;

	var createProperty$2 = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) definePropertyModule$2.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
	};

	var fails$6 = fails$b;
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$6(function () {
	  // Chrome 38 Symbol has incorrect toString conversion

	  /* global Symbol -- required for testing */
	  return !String(Symbol());
	});

	var NATIVE_SYMBOL$1 = nativeSymbol;
	var useSymbolAsUid = NATIVE_SYMBOL$1
	/* global Symbol -- safe */
	&& !Symbol.sham && typeof Symbol.iterator == 'symbol';

	var global$4 = global$e;
	var shared = shared$3.exports;
	var has = has$6;
	var uid = uid$2;
	var NATIVE_SYMBOL = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;
	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global$4.Symbol;
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol$8 = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (NATIVE_SYMBOL && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  }

	  return WellKnownSymbolsStore[name];
	};

	var isObject$3 = isObject$8;
	var isArray$2 = isArray$3;
	var wellKnownSymbol$7 = wellKnownSymbol$8;
	var SPECIES$3 = wellKnownSymbol$7('species'); // `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate

	var arraySpeciesCreate$2 = function (originalArray, length) {
	  var C;

	  if (isArray$2(originalArray)) {
	    C = originalArray.constructor; // cross-realm fallback

	    if (typeof C == 'function' && (C === Array || isArray$2(C.prototype))) C = undefined;else if (isObject$3(C)) {
	      C = C[SPECIES$3];
	      if (C === null) C = undefined;
	    }
	  }

	  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var getBuiltIn$1 = getBuiltIn$3;
	var engineUserAgent = getBuiltIn$1('navigator', 'userAgent') || '';

	var global$3 = global$e;
	var userAgent$1 = engineUserAgent;
	var process = global$3.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (userAgent$1) {
	  match = userAgent$1.match(/Edge\/(\d+)/);

	  if (!match || match[1] >= 74) {
	    match = userAgent$1.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var fails$5 = fails$b;
	var wellKnownSymbol$6 = wellKnownSymbol$8;
	var V8_VERSION$1 = engineV8Version;
	var SPECIES$2 = wellKnownSymbol$6('species');

	var arrayMethodHasSpeciesSupport$3 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$5(function () {
	    var array = [];
	    var constructor = array.constructor = {};

	    constructor[SPECIES$2] = function () {
	      return {
	        foo: 1
	      };
	    };

	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$a = _export;
	var fails$4 = fails$b;
	var isArray$1 = isArray$3;
	var isObject$2 = isObject$8;
	var toObject$4 = toObject$5;
	var toLength$6 = toLength$8;
	var createProperty$1 = createProperty$2;
	var arraySpeciesCreate$1 = arraySpeciesCreate$2;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$3;
	var wellKnownSymbol$5 = wellKnownSymbol$8;
	var V8_VERSION = engineV8Version;
	var IS_CONCAT_SPREADABLE = wellKnownSymbol$5('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679

	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$4(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});
	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$2('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject$2(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$1(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species

	$$a({
	  target: 'Array',
	  proto: true,
	  forced: FORCED
	}, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$4(this);
	    var A = arraySpeciesCreate$1(O, 0);
	    var n = 0;
	    var i, k, length, len, E;

	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];

	      if (isConcatSpreadable(E)) {
	        len = toLength$6(E.length);
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

	var aFunction$2 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  }

	  return it;
	};

	var aFunction$1 = aFunction$2; // optional / simple context binding

	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
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

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	var bind = functionBindContext;
	var IndexedObject$1 = indexedObject;
	var toObject$3 = toObject$5;
	var toLength$5 = toLength$8;
	var arraySpeciesCreate = arraySpeciesCreate$2;
	var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

	var createMethod$3 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_OUT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$3($this);
	    var self = IndexedObject$1(O);
	    var boundFunction = bind(callbackfn, that, 3);
	    var length = toLength$5(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
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
	            // filterOut
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
	  // `Array.prototype.filterOut` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterOut: createMethod$3(7)
	};

	var fails$3 = fails$b;

	var arrayMethodIsStrict$3 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$3(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () {
	      throw 1;
	    }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var arrayMethodIsStrict$2 = arrayMethodIsStrict$3;
	var STRICT_METHOD$2 = arrayMethodIsStrict$2('forEach'); // `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach

	var arrayForEach = !STRICT_METHOD$2 ? function forEach(callbackfn
	/* , thisArg */
	) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	var $$9 = _export;
	var forEach$1 = arrayForEach; // `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach

	$$9({
	  target: 'Array',
	  proto: true,
	  forced: [].forEach != forEach$1
	}, {
	  forEach: forEach$1
	});

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3; // `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys

	var objectKeys$1 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS = descriptors;
	var definePropertyModule$1 = objectDefineProperty;
	var anObject$4 = anObject$7;
	var objectKeys = objectKeys$1; // `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties

	var objectDefineProperties = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$4(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;

	  while (length > index) definePropertyModule$1.f(O, key = keys[index++], Properties[key]);

	  return O;
	};

	var getBuiltIn = getBuiltIn$3;
	var html$1 = getBuiltIn('document', 'documentElement');

	var anObject$3 = anObject$7;
	var defineProperties = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys = hiddenKeys$4;
	var html = html$1;
	var documentCreateElement = documentCreateElement$1;
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
	    /* global ActiveXObject -- old IE */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {
	    /* ignore */
	  }

	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
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

	var wellKnownSymbol$4 = wellKnownSymbol$8;
	var create = objectCreate;
	var definePropertyModule = objectDefineProperty;
	var UNSCOPABLES = wellKnownSymbol$4('unscopables');
	var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: create(null)
	  });
	} // add a key to Array.prototype[@@unscopables]


	var addToUnscopables$1 = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $$8 = _export;
	var $includes = arrayIncludes.includes;
	var addToUnscopables = addToUnscopables$1; // `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes

	$$8({
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

	var $$7 = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$3;
	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('map'); // `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species

	$$7({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$1
	}, {
	  map: function map(callbackfn
	  /* , thisArg */
	  ) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var aFunction = aFunction$2;
	var toObject$2 = toObject$5;
	var IndexedObject = indexedObject;
	var toLength$4 = toLength$8; // `Array.prototype.{ reduce, reduceRight }` methods implementation

	var createMethod$2 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction(callbackfn);
	    var O = toObject$2(that);
	    var self = IndexedObject(O);
	    var length = toLength$4(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }

	      index += i;

	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }

	    for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }

	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod$2(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$2(true)
	};

	var classof$2 = classofRaw;
	var global$2 = global$e;
	var engineIsNode = classof$2(global$2.process) == 'process';

	var $$6 = _export;
	var $reduce = arrayReduce.left;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$3;
	var CHROME_VERSION = engineV8Version;
	var IS_NODE = engineIsNode;
	var STRICT_METHOD$1 = arrayMethodIsStrict$1('reduce'); // Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982

	var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83; // `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce

	$$6({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD$1 || CHROME_BUG
	}, {
	  reduce: function reduce(callbackfn
	  /* , initialValue */
	  ) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$5 = _export;
	var isObject$1 = isObject$8;
	var isArray = isArray$3;
	var toAbsoluteIndex = toAbsoluteIndex$2;
	var toLength$3 = toLength$8;
	var toIndexedObject = toIndexedObject$4;
	var createProperty = createProperty$2;
	var wellKnownSymbol$3 = wellKnownSymbol$8;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$3;
	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
	var SPECIES$1 = wellKnownSymbol$3('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max; // `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects

	$$5({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT
	}, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength$3(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

	    var Constructor, result, n;

	    if (isArray(O)) {
	      Constructor = O.constructor; // cross-realm fallback

	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$1(Constructor)) {
	        Constructor = Constructor[SPECIES$1];
	        if (Constructor === null) Constructor = undefined;
	      }

	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }

	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

	    result.length = n;
	    return result;
	  }
	});

	var $$4 = _export;
	var $some = arrayIteration.some;
	var arrayMethodIsStrict = arrayMethodIsStrict$3;
	var STRICT_METHOD = arrayMethodIsStrict('some'); // `Array.prototype.some` method
	// https://tc39.es/ecma262/#sec-array.prototype.some

	$$4({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD
	}, {
	  some: function some(callbackfn
	  /* , thisArg */
	  ) {
	    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $$3 = _export;
	var toObject$1 = toObject$5;
	var nativeKeys = objectKeys$1;
	var fails$2 = fails$b;
	var FAILS_ON_PRIMITIVES = fails$2(function () {
	  nativeKeys(1);
	}); // `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys

	$$3({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES
	}, {
	  keys: function keys(it) {
	    return nativeKeys(toObject$1(it));
	  }
	});

	var anObject$2 = anObject$7; // `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

	var regexpFlags$1 = function () {
	  var that = anObject$2(this);
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

	var fails$1 = fails$b; // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.

	function RE(s, f) {
	  return RegExp(s, f);
	}

	regexpStickyHelpers.UNSUPPORTED_Y = fails$1(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});
	regexpStickyHelpers.BROKEN_CARET = fails$1(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpFlags = regexpFlags$1;
	var stickyHelpers = regexpStickyHelpers;
	var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.

	var nativeReplace = String.prototype.replace;
	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	}();

	var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.
	// eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing

	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
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

	      strCopy = String(str).slice(re.lastIndex); // Support anchored sticky behavior.

	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
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

	    return match;
	  };
	}

	var regexpExec$2 = patchedExec;

	var $$2 = _export;
	var exec = regexpExec$2; // `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec

	$$2({
	  target: 'RegExp',
	  proto: true,
	  forced: /./.exec !== exec
	}, {
	  exec: exec
	});

	var isObject = isObject$8;
	var classof$1 = classofRaw;
	var wellKnownSymbol$2 = wellKnownSymbol$8;
	var MATCH$1 = wellKnownSymbol$2('match'); // `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp

	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$1(it) == 'RegExp');
	};

	var isRegExp = isRegexp;

	var notARegexp = function (it) {
	  if (isRegExp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  }

	  return it;
	};

	var wellKnownSymbol$1 = wellKnownSymbol$8;
	var MATCH = wellKnownSymbol$1('match');

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

	var $$1 = _export;
	var notARegExp = notARegexp;
	var requireObjectCoercible$5 = requireObjectCoercible$8;
	var correctIsRegExpLogic = correctIsRegexpLogic; // `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes

	$$1({
	  target: 'String',
	  proto: true,
	  forced: !correctIsRegExpLogic('includes')
	}, {
	  includes: function includes(searchString
	  /* , position = 0 */
	  ) {
	    return !!~String(requireObjectCoercible$5(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var redefine = redefine$2.exports;
	var fails = fails$b;
	var wellKnownSymbol = wellKnownSymbol$8;
	var regexpExec$1 = regexpExec$2;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$6;
	var SPECIES = wellKnownSymbol('species');
	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;

	  re.exec = function () {
	    var result = [];
	    result.groups = {
	      a: '7'
	    };
	    return result;
	  };

	  return ''.replace(re, '$<a>') !== '7';
	}); // IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

	var REPLACE_KEEPS_$0 = function () {
	  return 'a'.replace(/./, '$0') === '$0';
	}();

	var REPLACE = wellKnownSymbol('replace'); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }

	  return false;
	}(); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper


	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  // eslint-disable-next-line regexp/no-empty-group -- required for testing
	  var re = /(?:)/;
	  var originalExec = re.exec;

	  re.exec = function () {
	    return originalExec.apply(this, arguments);
	  };

	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);
	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};

	    O[SYMBOL] = function () {
	      return 7;
	    };

	    return ''[KEY](O) != 7;
	  });
	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
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

	      re.constructor[SPECIES] = function () {
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

	  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec$1) {
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
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];
	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	    ? function (string, arg) {
	      return regexMethod.call(string, this, arg);
	    } // 21.2.5.6 RegExp.prototype[@@match](string)
	    // 21.2.5.9 RegExp.prototype[@@search](string)
	    : function (string) {
	      return regexMethod.call(string, this);
	    });
	  }

	  if (sham) createNonEnumerableProperty$1(RegExp.prototype[SYMBOL], 'sham', true);
	};

	var toInteger$2 = toInteger$5;
	var requireObjectCoercible$4 = requireObjectCoercible$8; // `String.prototype.{ codePointAt, at }` methods implementation

	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible$4($this));
	    var position = toInteger$2(pos);
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

	var classof = classofRaw;
	var regexpExec = regexpExec$2; // `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec

	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;

	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);

	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }

	    return result;
	  }

	  if (classof(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
	var anObject$1 = anObject$7;
	var toLength$2 = toLength$8;
	var requireObjectCoercible$3 = requireObjectCoercible$8;
	var advanceStringIndex$1 = advanceStringIndex$2;
	var regExpExec$1 = regexpExecAbstract; // @@match logic

	fixRegExpWellKnownSymbolLogic$1('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
	  return [// `String.prototype.match` method
	  // https://tc39.es/ecma262/#sec-string.prototype.match
	  function match(regexp) {
	    var O = requireObjectCoercible$3(this);
	    var matcher = regexp == undefined ? undefined : regexp[MATCH];
	    return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, // `RegExp.prototype[@@match]` method
	  // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	  function (regexp) {
	    var res = maybeCallNative(nativeMatch, regexp, this);
	    if (res.done) return res.value;
	    var rx = anObject$1(regexp);
	    var S = String(this);
	    if (!rx.global) return regExpExec$1(rx, S);
	    var fullUnicode = rx.unicode;
	    rx.lastIndex = 0;
	    var A = [];
	    var n = 0;
	    var result;

	    while ((result = regExpExec$1(rx, S)) !== null) {
	      var matchStr = String(result[0]);
	      A[n] = matchStr;
	      if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$2(rx.lastIndex), fullUnicode);
	      n++;
	    }

	    return n === 0 ? null : A;
	  }];
	});

	var toInteger$1 = toInteger$5;
	var requireObjectCoercible$2 = requireObjectCoercible$8; // `String.prototype.repeat` method implementation
	// https://tc39.es/ecma262/#sec-string.prototype.repeat

	var stringRepeat = ''.repeat || function repeat(count) {
	  var str = String(requireObjectCoercible$2(this));
	  var result = '';
	  var n = toInteger$1(count);
	  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

	  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

	  return result;
	};

	var toLength$1 = toLength$8;
	var repeat = stringRepeat;
	var requireObjectCoercible$1 = requireObjectCoercible$8;
	var ceil = Math.ceil; // `String.prototype.{ padStart, padEnd }` methods implementation

	var createMethod = function (IS_END) {
	  return function ($this, maxLength, fillString) {
	    var S = String(requireObjectCoercible$1($this));
	    var stringLength = S.length;
	    var fillStr = fillString === undefined ? ' ' : String(fillString);
	    var intMaxLength = toLength$1(maxLength);
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

	var userAgent = engineUserAgent; // eslint-disable-next-line unicorn/no-unsafe-regex -- safe

	var stringPadWebkitBug = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

	var $ = _export;
	var $padStart = stringPad.start;
	var WEBKIT_BUG = stringPadWebkitBug; // `String.prototype.padStart` method
	// https://tc39.es/ecma262/#sec-string.prototype.padstart

	$({
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

	var toObject = toObject$5;
	var floor = Math.floor;
	var replace = ''.replace;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g; // https://tc39.es/ecma262/#sec-getsubstitution

	var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
	  var tailPos = position + matched.length;
	  var m = captures.length;
	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

	  if (namedCaptures !== undefined) {
	    namedCaptures = toObject(namedCaptures);
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

	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var anObject = anObject$7;
	var toLength = toLength$8;
	var toInteger = toInteger$5;
	var requireObjectCoercible = requireObjectCoercible$8;
	var advanceStringIndex = advanceStringIndex$2;
	var getSubstitution = getSubstitution$1;
	var regExpExec = regexpExecAbstract;
	var max = Math.max;
	var min = Math.min;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	}; // @@replace logic


	fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
	  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
	  return [// `String.prototype.replace` method
	  // https://tc39.es/ecma262/#sec-string.prototype.replace
	  function replace(searchValue, replaceValue) {
	    var O = requireObjectCoercible(this);
	    var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
	  }, // `RegExp.prototype[@@replace]` method
	  // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
	  function (regexp, replaceValue) {
	    if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
	      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	      if (res.done) return res.value;
	    }

	    var rx = anObject(regexp);
	    var S = String(this);
	    var functionalReplace = typeof replaceValue === 'function';
	    if (!functionalReplace) replaceValue = String(replaceValue);
	    var global = rx.global;

	    if (global) {
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	    }

	    var results = [];

	    while (true) {
	      var result = regExpExec(rx, S);
	      if (result === null) break;
	      results.push(result);
	      if (!global) break;
	      var matchStr = String(result[0]);
	      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	    }

	    var accumulatedResult = '';
	    var nextSourcePosition = 0;

	    for (var i = 0; i < results.length; i++) {
	      result = results[i];
	      var matched = String(result[0]);
	      var position = max(min(toInteger(result.index), S.length), 0);
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
	        var replacement = String(replaceValue.apply(undefined, replacerArgs));
	      } else {
	        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	      }

	      if (position >= nextSourcePosition) {
	        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	        nextSourcePosition = position + matched.length;
	      }
	    }

	    return accumulatedResult + S.slice(nextSourcePosition);
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

	var global$1 = global$e;
	var DOMIterables = domIterables;
	var forEach = arrayForEach;
	var createNonEnumerableProperty = createNonEnumerableProperty$6;

	for (var COLLECTION_NAME in DOMIterables) {
	  var Collection = global$1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
	  } catch (error) {
	    CollectionPrototype.forEach = forEach;
	  }
	}

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
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
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

	/* Copyright Spinitron LLC */

	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
	// Vars with relative time (e.g. a duration) are in seconds. AudioContext uses floats. Sometimes integer.
	// Date-time vars have a suffix:
	//   Timestamp (string) UTC date/time like "20200822T162000Z"
	//   Time (integer) JavaScript date/time, i.e. milliseconds since the unix epoc
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
	  var baseStart = container.dataset.arkStart;
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

	  var arkStartedAt = null; // unix millisec in the archive corresponding to arkStartedAt

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

}());
