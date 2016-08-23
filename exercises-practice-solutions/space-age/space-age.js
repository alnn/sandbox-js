'use strict';

var PLANET_YEAR_MAP = {
        Mercury: 0.2408467,
        Venus: 0.61519726,
        Earth: 1,
        Mars: 1.8808158,
        Jupiter: 11.862615,
        Saturn: 29.447498,
        Uranus: 84.016846,
        Neptune: 164.79132
    },
    EARTH_YEAR_SEC = 31557600;

module.exports = function(seconds) {
    this.seconds = seconds;
    Object.keys(PLANET_YEAR_MAP).forEach(function(planet) {

        this['on' + planet] = function() {
            return +(seconds / (PLANET_YEAR_MAP[planet] * EARTH_YEAR_SEC)).toFixed(2);
        };

    }.bind(this));
};
