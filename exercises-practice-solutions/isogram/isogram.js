'use strict';

module.exports  = function(sentence) {
    this.isIsogram = function() {
        return sentence.replace(/([a-zàèéìòóù])(.)(?=.*\1)/gi, '').length === sentence.length;
    };
};
