$(document).ready(function() {
    paper = new Raphael("raphael",2000, 2000);
    var myWorker = new Worker("static/worker.js");
    myWorker.onmessage = function(e) {
        console.log("Worker said: " + e.data);
    }
    events.initialize();
});

test = function() {
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

transformTab = function(whichClass) {
    var settings = $('.selected').children(whichClass);
    settings.removeClass('hidden');
    var editor = ace.edit("editor");
};

closeTransformTab = function(/* Event */ e) {
    var elem = $(e.target);
    if(!elem.parent().hasClass('box'))
    {
        return;
    }
    elem.addClass('hidden');
};
