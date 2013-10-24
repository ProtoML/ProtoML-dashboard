$(document).ready(function() {
    paper = new Raphael("raphael",2000, 2000);
    var myWorker = new Worker("static/worker.js");
    myWorker.onmessage = function(e) {
        console.log("Worker said: " + e.data);
    }
    events.initialize();
});

createTransform = function() {
    var html =  $('#transform')[0].innerHTML;
    var movie = $('#movie')[0];
    movie.innerHTML += html;
    events.updateHandlers();
};

deleteTransform = function() {
    var selected = $('.selected');
    arrow.deleteArrows(selected);
    selected.remove();
};
