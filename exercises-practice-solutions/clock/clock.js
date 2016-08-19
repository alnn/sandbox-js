'use strict';

function pad(num) {
    return ('0' + num).slice(-2);
}

module.exports.at = function(hours, minutes) {
    var time = (hours || 0) * 60 + (minutes || 0);

    return {
        plus: function(m) {
            time += m;
            return this;
        },
        minus: function(m) {
            time -= m;
            return this;
        },
        equals: function(clock) {
            return (this + '') == clock;
        },
        toString: function() {
            var h, m;
            time = time - parseInt(time / (24 * 60)) * 24 * 60; // subtract full days
            if (time < 0) {
                time += 24 * 60; // add extra day
            }
            h = parseInt(time / 60); // extract full hours
            m = time - h * 60;

            return pad(h) + ':' + pad(m);
        }
    };
};
