AJAX = new XMLHttpRequest();
poll = function() {
    AJAX.open("GET", "/api", false);
    AJAX.send(null);
    var ean = AJAX.responseText;
    if (ean != '') {
        postMessage(ean);
    }
};
setInterval( poll, 10*60*1000); //every 10 minutes
poll();
