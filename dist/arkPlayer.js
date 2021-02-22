"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.some");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.pad-start");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
    populateMinutes(minutesEl, 15);

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