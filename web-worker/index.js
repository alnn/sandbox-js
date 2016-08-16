var w = new Worker('web-worker.js');

w.onmessage = function(e) {
    var app = document.getElementById('app'),
        p   = document.createElement('p');
    p.innerText = 'Message from background thread: ' + e.data;
    app.appendChild(p);
};
