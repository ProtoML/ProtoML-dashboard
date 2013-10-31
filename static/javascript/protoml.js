$(document).ready(function() {
    paper = new Raphael("raphael",2000, 2000);
    var myWorker = new Worker("static/javascript/worker.js");
    myWorker.onmessage = function(e) {
        console.log("Worker said: " + e.data);
    }
    events.initialize();
    $("#searchForm").change(search.query());

    menuModal(".ui.modal.newtransform",".item.addtransform");
    menuModal(".ui.modal.searchtransform",".item.searchtransform");
});

menuModal = function(selector,eventSelector) {
    $(selector).modal('setting', 'transition', 'fade down');
    $(selector).modal('attach events', eventSelector, 'show');
}

loadDag = function() {
    var dagArray = [ [1,[3]],[2,[3]],[3,[4,5]],[4,[]],[5,[6]],[6,[7,8,9]],[7,[]],[8,[]],[9,[]] ];
    var dag = new Dag();
    dag.loadFromList(dagArray);
    dag.render();
};
createTransform = function() {
    var movie = $('#movie');
    var jNode = $($('#transform')[0].innerHTML);
    movie.append(jNode);
    events.updateHandlers();
};
