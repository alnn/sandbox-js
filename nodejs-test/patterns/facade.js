"use strict";

console.log('*****************FACADE*********************');

//FACADE
var myEvent = {
    // ...
    stop: function(e) {
        // IE
        if (typeof e.returnValue === "boolean") {
            e.returnValue = false;
        }
        if (typeof e.cancelBubble === "boolean") {
            e.cancelBubble = true;
        }
        // Others
        if (typeof e.preventDefault === "function") {
            e.preventDefault();
        }
        if (typeof e.stopPropagation === "function") {
            e.stopPropagation();
        }
    }
};

console.dir(myEvent);

console.log('********************************************');
