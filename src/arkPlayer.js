/* Copyright Spinitron LLC */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

 window.ark2Player = function (container, options) {
    const {
        stationName,
        timeZone,
        enableDebug = false,
        hlsBaseUrl = 'https://ark2.spinitron.com/ark2',
        errorReportUrl = 'https://ark2.spinitron.com/errorlog/',
    } = options;

    /** @type {HTMLMediaElement} */
    var theMediaElement = container.querySelector('.ark-player__media-element');
    var myhls;
    var pleaseReload = true;
    let baseStart =
        container.dataset.arkStart ||
        `${new Date(new Date().getTime() - 7200000).toISOString().substring(0, 13).replace(/-/g, '')}0000Z`;
    const pickerOpts = { dates: [], hours: {} };
    var arkStartTime = null;

    debug('ark player init: ', options);

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

    resetPlayer();

    // Initialize pickerOpts, the date-time picker database.
    (() => {
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
        theMediaElement.ontimeupdate = () => {
            updateTime();
        };
        updateDisplay();
    }

    function startArk(startTimestamp) {
        debug(`startArk(${startTimestamp})`);

        setupPicker(startTimestamp);

        const d = startTimestamp
            .match(/^(\d\d\d\d)(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)Z$/)
            .slice(1)
            .map((δ) => parseInt(δ, 10));
        arkStartTime = Date.UTC(d[0], d[1] - 1, d[2], d[3], d[4], d[5]);

        const playlistUrl = `${hlsBaseUrl}/${stationName}-${startTimestamp}/index.m3u8`;

        if (theMediaElement.canPlayType('application/vnd.apple.mpegurl')) {
            debug("Using native HLS");
            theMediaElement.src = playlistUrl;
            pleaseReload = false;
            pressPlay();
        } else if (Hls.isSupported()) {
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
                theMediaElement.volume = (muted ? 0 : vol) / 100;
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

    function updateDisplay() {
        const hide = 'ark-player_hide';
        // Show the player if it was hidden when no start time provided.
        container.classList.toggle(hide, false);
        playerControl.querySelector('.ark-player__play').classList.toggle(hide, !theMediaElement.paused);
        playerControl.querySelector('.ark-player__pause').classList.toggle(hide, theMediaElement.paused);
        playerPicker.classList.toggle(hide, !theMediaElement.paused);
        playerStatus.classList.toggle(hide, theMediaElement.paused);
    }

    function updateTime() {
        if (arkStartTime) {
            const arkTime = new Date(arkStartTime + Math.round(1000 * theMediaElement.currentTime));
            const timestring = arkTime
                .toLocaleDateString(...localeStuff)
                .replace(/(^\d\d?\/\d\d?\/)\d\d(\d\d)/, '$1$2');
            playerStatus.querySelector('.ark-player__date').innerHTML = timestring;
            playerStatus.querySelector('.ark-player__time').innerHTML = arkTime.toLocaleTimeString(...localeStuff);
            playerStatus.classList.toggle('waiting', false);
        }
    }

    function telemetry(data) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', errorReportUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        const body = JSON.stringify({
            userAgent: navigator.userAgent,
            location: document.location.href,
            stationName,
            timeZone,
            hlsBaseUrl,
            data,
        });
        xhr.send(body);
    }

    function debug(...stuff) {
        if (enableDebug) {
            console.log(`${new Date().toLocaleTimeString()} `, ...stuff);
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
