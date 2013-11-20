$(document).ready(function() {
    var myWorker = new Worker("static/javascript/worker.js");
    myWorker.onmessage = function(e) {
        console.log("Worker said: " + e.data);
    }

    prepModals();
    menuModal(".ui.modal.newtransform",".item.addtransform");
    menuModal(".ui.modal.search",".item.search");
    $(".ui.modal.api").modal("show");
});

prepModals = function() {
    $(".modal").modal('setting', 'transition', 'fade down');
}

menuModal = function(selector,eventSelector) {
    $(selector).modal('attach events', eventSelector, 'show');
}

loadDag = function() {
    var dagArray = [ [1,[3]],[2,[3]],[3,[4,5]],[4,[]],[5,[6]],[6,[7,8,9]],[7,[]],[8,[]],[9,[]] ];
    var dag = new Dag();
    dag.loadFromList(dagArray);
    dag.render();
};
