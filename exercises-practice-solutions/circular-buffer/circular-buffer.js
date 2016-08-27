'use strict';

module.exports = {
    circularBuffer: function(len) {
        var _self = module.exports,
            data = new Array(len),
            wrIndex = 0, rdIndex = 0;
        return {
            read: function() {
                if (!data[rdIndex]) {
                    throw new Error(_self.bufferEmptyException());
                }
                try {
                    return data[rdIndex];
                } finally {
                    delete data[rdIndex];
                    rdIndex = this.updateIndex(rdIndex);
                }
            },
            write: function(value) {
                if (!value) {
                    return;
                }
                if (data[wrIndex]) {
                    throw new Error(_self.bufferFullException());
                }
                data[wrIndex] = value;
                wrIndex = this.updateIndex(wrIndex);
            },
            forceWrite: function(value) {
                if (data[wrIndex]) {
                    this.read();
                }
                this.write(value);
            },
            clear: function() {
                wrIndex = 0;
                rdIndex = 0;
                data.fill(undefined);
            },
            updateIndex: function(index) {
                return (index + 1) === len ? 0 : ++index;
            }
        };
    },
    bufferEmptyException: function() { return 'Buffer is empty';},
    bufferFullException: function() { return 'Buffer is full';}
};
