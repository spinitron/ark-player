/* Copyright Spinitron LLC */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

// Vars with relative time (e.g. a duration) are in seconds. AudioContext uses floats. Sometimes integer.
// Date-time vars have a suffix:
//   Timestamp (string) UTC date/time like "20200822T162000Z"
//   Time (integer) JavaScript date/time, i.e. milliseconds since the unix epoc

const AUDIO_CONTEXT =
    window.AudioContext || window.webkitAudioContext ? new (window.AudioContext || window.webkitAudioContext)() : null;

// Nominal duration (seconds) to calculate next segment URL from previous
const DEFAULT_SEGMENT_DURATION = 300;

// Start fetching next segment ahead of end of playback of the current one
const DEFAULT_FETCH_AHEAD = 15;

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
        document.querySelectorAll('.ark-play-button').forEach((e) => e.classList.add('ark-ark-play-button_hide'));
    }

    try {
        if (
            typeof AUDIO_CONTEXT !== 'object' ||
            typeof AUDIO_CONTEXT.resume !== 'function' ||
            typeof AUDIO_CONTEXT.state !== 'string'
        ) {
            badLuck();
            return;
        }
    } catch (ignore) {
        badLuck();
        return;
    }

    const {
        template,
        data = {},
        timeZone,
        enableDebug = false,
        segmentDuration = DEFAULT_SEGMENT_DURATION,
        fetchAhead = DEFAULT_FETCH_AHEAD,
    } = options;
    let baseStart = container.dataset.arkStart || `${(new Date((new Date()).getTime() - 7200000)).toISOString().substring(0, 13).replace(/-/g, '')}0000Z`;
    const baseUrl = Object.keys(data).reduce((url, key) => url.replaceAll(`{${key}}`, data[key]), template);
    let myFetchAhead = fetchAhead;
    const pickerOpts = { dates: [], hours: {} };

    ensureAudioContextState('suspended');
    debug('ark player init: ', options, 'baseUrl', baseUrl);

    // Uee localeStuff as argument to Date.toLocaleString() etc. If browser can't do timezones, empty array
    // means use client's time zone instead of the station's.
    const localeStuff = (() => {
        let β = '?';
        try {
            β = new Date().toLocaleString(['en-US', { timeZone }]);
        } catch (ignore) {
            return [];
        }
        debug(β);
        return ['en-US', { timeZone }];
    })();

    const playerControl = container.querySelector('.ark-player__control');
    const playerStatus = container.querySelector('.ark-player__status');
    const playerPicker = container.querySelector('.ark-player__picker');

    // AudioContext time when the Ark was started
    let arkStartedAt = null;
    // unix millisec in the archive corresponding to arkStartedAt
    let arkStartTime = null;

    // setInterval timer ID for the monitor
    let monitorInterval;

    // currentSegment and nextSegment can be a dictionary with
    //   segmentTime: unix milliseconds used to make the segment URL
    //   source: AudioBufferSourceNode with the segment's audio
    //   started: AudioContext's time at which the audio is/was scheduled to start
    //   offset: how much of the first segment to skip. 0 for subsequent segments

    // currentSegment is always a segment dictionary after Ark start
    let currentSegment = null;

    // nextSegment may be
    // - null when the current segment is simply playing or before Ark start
    // - an XMLHttpRequest if the next segment was requested but is not yet received and decoded
    // - a segment dictionary like currentSegment when it's ready
    let nextSegment = null;

    // on 404, try to download this many next segments
    let remainingTryNexts = 5;

    resetPlayer();

    (() => {
        // Initialize pickerOpts, the date-time picker database.
        const n = new Date();
        const stop = n.getTime() - 14 * 86400 * 1000;
        let hour = new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours()).getTime();
        let hourDate;
        let date;
        while (hour > stop) {
            hour -= 3600 * 1000;
            hourDate = new Date(hour);
            date = hourDate.toLocaleDateString(...localeStuff).replace(/\d\d(\d\d)$/, '$1');
            if (!pickerOpts.dates.includes(date)) {
                pickerOpts.dates.push(date);
                pickerOpts.hours[date] = [];
            }
            pickerOpts.hours[date].push([
                hourDate.toLocaleTimeString(...localeStuff).replace(/:00:00 /, ' '),
                hourDate.toISOString().substring(0, 13).replace(/-/g, ''),
            ]);
        }

        // Initialize the date-time picker selectors and their options.
        const dateEl = container.querySelector('[name=date]');
        const hoursEl = container.querySelector('[name=hours]');
        const minutesEl = container.querySelector('[name=minutes]');

        populateDate(dateEl);
        dateEl.addEventListener('change', () => {
            populateHours(hoursEl, dateEl.value);
            pickerChanged();
        });

        hoursEl.addEventListener('change', pickerChanged);
        populateHours(hoursEl, dateEl.value);

        minutesEl.addEventListener('change', pickerChanged);
        populateMinutes(minutesEl, 15);

        function pickerChanged() {
            resetPlayer();
            baseStart = `${hoursEl.value}${minutesEl.value}00Z`;
        }

        setupPicker();
    })();

    /**
     * Adjust the date-time picker to the given start.
     * @param {String} timestamp in ark player format
     */
    function setupPicker(timestamp) {
        const copyOfTimestampParam = timestamp === undefined ? baseStart : timestamp;
        const seekDateHour = copyOfTimestampParam.slice(0, 11);

        // Search the date-time picker's database for seekDateHour
        let date;
        pickerOpts.dates.some((d) => {
            return pickerOpts.hours[d].some((h) => {
                if (seekDateHour === h[1]) {
                    date = d;
                    return true;
                }
                return false;
            });
        });

        if (date) {
            // Adjust the picker's selections and hour options.
            const c = container;
            c.querySelector('[name=date]').value = date;
            populateHours(c.querySelector('[name=hours]'), date);
            c.querySelector('[name=hours]').value = seekDateHour;
            c.querySelector('[name=minutes]').value = `${
                Math.floor(parseInt(copyOfTimestampParam.slice(11, 13), 10) / 15) * 15
            }`.padStart(2, '0');
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

    const volume = (() => {
        let muted = false;
        const slider = document.querySelector('.ark-player__volume-slider');
        const slash = document.querySelector('.ark-player__volume-slash');
        const mute = document.querySelector('.ark-player__mute-button');
        let vol;
        const m = {
            muteButton: () => {
                muted = !muted;
                m.either();
            },
            slider: () => {
                vol = parseInt(slider.value, 10);
                m.either();
            },
            either: () => {
                slider.value = muted ? '0' : `${vol}`;
                slash.style.cssText = muted || vol === 0 ? '' : 'display:none';
                const gain = (muted ? 0 : vol) / 100;
                if (currentSegment && currentSegment.gainNode) {
                    currentSegment.gainNode.gain.setValueAtTime(gain, AUDIO_CONTEXT.currentTime);
                }
                if (nextSegment && nextSegment.gainNode) {
                    nextSegment.gainNode.gain.setValueAtTime(gain, AUDIO_CONTEXT.currentTime);
                }
            },
        };
        slider.addEventListener('change', m.slider);
        slider.addEventListener('input', m.slider);
        mute.addEventListener('click', m.muteButton);
        m.slider();

        return m;
    })();

    /**
     * Play/pause button.
     */
    playerControl.addEventListener('click', playButton);

    /**
     * Start playing when almost any element with specified [data-ark-start] is clicked.
     */
    document.addEventListener('click', (e) => {
        const element = e.target.closest('[data-ark-start]');
        if (!element || element === container) {
            return;
        }
        e.preventDefault();
        startArk(element.dataset.arkStart);
    });
    document.addEventListener('keydown', (e) => {
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

        const d = startTimestamp
            .match(/^(\d\d\d\d)(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)Z$/)
            .slice(1)
            .map((δ) => parseInt(δ, 10));

        arkStartTime = Date.UTC(d[0], d[1] - 1, d[2], d[3], d[4], d[5]);
        let segmentTime = Date.UTC(d[0], d[1] - 1, d[2], d[3], 0, 0);
        while (segmentTime + 1000 * segmentDuration <= arkStartTime) {
            segmentTime += 1000 * segmentDuration;
        }

        ensureAudioContextState('running');
        cueNextSegment({ segmentTime, offset: (arkStartTime - segmentTime) / 1000 });
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

        debug(`player state?! current: ${currentSegment} next: ${nextSegment} context: ${AUDIO_CONTEXT}. resetting`);
        resetPlayer();
        return 'not-started';
    }

    function ensureAudioContextState(toState) {
        if (AUDIO_CONTEXT.state === toState) {
            debug(`WebAudio was already ${toState}`);
            return;
        }
        if (toState === 'suspended') {
            AUDIO_CONTEXT.suspend().then(() => debug(`WebAudio now ${toState}`));
        } else if (toState === 'running') {
            AUDIO_CONTEXT.resume().then(() => debug(`WebAudio now ${toState}`));
        } else {
            return;
        }
    }

    /**
     * @param {boolean=} force
     */
    function togglePlay(force) {
        const oldPlayerState = getPlayerState();
        const isPlaying = force === undefined ? oldPlayerState !== 'playing' : force;

        if (oldPlayerState === 'playing' && !isPlaying) {
            ensureAudioContextState('suspended');
        } else if (oldPlayerState === 'paused' && isPlaying) {
            ensureAudioContextState('running');
        }
        updateDisplay(isPlaying);
    }

    function updateDisplay(force) {
        const isPlaying = force === undefined ? getPlayerState() === 'playing' : force;
        const hide = 'ark-player_hide';
        // Show the player if it was hidden when no start time provided.
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
            const currentEndsAt =
                currentSegment.started + currentSegment.source.buffer.duration - currentSegment.offset;
            if (AUDIO_CONTEXT.currentTime > currentEndsAt - myFetchAhead) {
                cueNextSegment({
                    segmentTime: currentSegment.segmentTime + 1000 * segmentDuration,
                    offset: 0,
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
            const arkTime = new Date(arkStartTime + Math.round(1000 * (AUDIO_CONTEXT.currentTime - arkStartedAt)));
            playerStatus.querySelector('.ark-player__date').innerHTML = arkTime
                .toLocaleDateString(...localeStuff)
                .replace(/(^\d\d?\/\d\d?\/)\d\d(\d\d)/, '$1$2');
            playerStatus.querySelector('.ark-player__time').innerHTML = arkTime.toLocaleTimeString(...localeStuff);
            playerStatus.classList.toggle('waiting', false);
        }
    }

    const audioCache = (() => {
        const cache = [];
        return {
            add: ({ url, audio }) => {
                cache.push({ url, audio });
                debug(`audio cache push ${url}`);
                if (cache.length > 3) {
                    const item = cache.shift();
                    debug(`audio cache discard ${item.url}`);
                    item.audio = null;
                }
                debug(`audio cache content: `, cache);
            },
            get: (url) => {
                for (let i = 0; i < cache.length; i += 1) {
                    if (cache[i].url === url) {
                        debug(`audio cache hit: ${url}`);
                        return cache[i].audio;
                    }
                }
                debug(`audio cache miss: ${url}`);
                return null;
            },
        };
    })();

    function cueNextSegment({ segmentTime, offset }) {
        const url = baseUrl.replace(
            '{time}',
            new Date(segmentTime)
                .toISOString()
                .replace(/[-:]/g, '')
                .replace(/\.\d{3}/, ''),
        );

        debug(`cuing next segment ${url} offset: ${offset}`);

        const cachedAudio = audioCache.get(url);
        if (cachedAudio !== null) {
            cueAudio({ segmentTime, offset }, cachedAudio);
            return;
        }

        const request = new XMLHttpRequest();
        const fetchStartTime = new Date().getTime();
        request.open('get', url, true);
        request.responseType = 'arraybuffer';

        request.onerror = () => {
            debug(`${request.statusText} getting ${url}`);
        };

        request.onload = () => {
            if (request.status === 200) {
                remainingTryNexts = 5;
                AUDIO_CONTEXT.decodeAudioData(request.response, (decodedAudio) => {
                    audioCache.add({ url, audio: decodedAudio });
                    const fetchDuration = (new Date().getTime() - fetchStartTime) / 1000;
                    debug(`fetch and decode took ${fetchDuration} s`);
                    if (fetchDuration + 5 > myFetchAhead) {
                        myFetchAhead = fetchDuration + 5;
                        debug(`increase fetch ahead time to ${myFetchAhead} s`);
                    }
                    cueAudio({ segmentTime, offset }, decodedAudio);
                });
            } else if (remainingTryNexts > 0) {
                debug(`Skip that segment and move on`);
                remainingTryNexts -= 1;
                cueNextSegment({
                    segmentTime: segmentTime + 1000 * segmentDuration,
                    offset: 0,
                });
            } else {
                debug(`Failed to fetch audio after several tries. Resetting player`);
                resetPlayer();
            }
        };

        nextSegment = request;
        request.send();
        updateDisplay(true);
    }

    function cueAudio({ segmentTime, offset }, audio) {
        const gainNode = AUDIO_CONTEXT.createGain();
        gainNode.connect(AUDIO_CONTEXT.destination);
        const source = AUDIO_CONTEXT.createBufferSource();
        source.buffer = audio;
        source.connect(gainNode);

        const startAt =
            currentSegment === null
                ? AUDIO_CONTEXT.currentTime + 0.05
                : Math.max(
                      AUDIO_CONTEXT.currentTime + 0.01,
                      currentSegment.started + currentSegment.source.buffer.duration - currentSegment.offset,
                  );

        nextSegment = { segmentTime, source, offset, started: startAt, gainNode };
        volume.slider();
        nextSegment.source.start(startAt, nextSegment.offset);
        if (currentSegment === null) {
            arkStartedAt = startAt;
        }
        updateDisplay();
        debug(`scheduled next segment to start at ${startAt} offset: ${offset}`);
    }

    function debug(...stuff) {
        if (enableDebug) {
            // eslint-disable-next-line no-console
            console.log(`${new Date().toLocaleTimeString()} ac.ct=${AUDIO_CONTEXT.currentTime}`, ...stuff);
        }
    }

    /**
     * @param {HTMLElement} selectEl
     */
    function populateDate(selectEl) {
        pickerOpts.dates.forEach((date, i) => {
            // eslint-disable-next-line no-param-reassign
            selectEl[i] = new Option(date, date);
        });
    }

    /**
     * @param {HTMLElement} selectEl
     */
    function populateHours(selectEl, date) {
        const hourSelect = selectEl;
        const previousSelection = hourSelect.selectedOptions[0] && hourSelect.selectedOptions[0].innerText;
        while (hourSelect.options.length > 0) {
            hourSelect.remove(0);
        }

        const l = pickerOpts.hours[date].length - 1;
        for (let i = 0; i <= l; i += 1) {
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
        ['00', '15', '30', '45'].forEach((minute, i) => {
            // eslint-disable-next-line no-param-reassign
            selectEl[i] = new Option(`:${minute}`, minute);
        });
    }
};
