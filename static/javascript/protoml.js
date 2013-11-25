$(document).ready(function() {
    var myWorker = new Worker("static/javascript/worker.js");
    myWorker.onmessage = function(e) {
        console.log("Worker said: " + e.data);
    }

    prepModals();
    menuModal(".ui.modal.newtransform",".item.addtransform");
    menuModal(".ui.modal.newdata",".item.adddata");
    menuModal(".ui.modal.search",".item.search");

    api.loadDag();
});

prepModals = function() {
    $(".modal").modal('setting', 'transition', 'fade down');
}

menuModal = function(selector,eventSelector) {
    $(selector).modal('attach events', eventSelector, 'show');
}

