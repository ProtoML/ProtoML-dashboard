$(document).ready(function() {
    paper = new Raphael("raphael",2000, 2000);
    var myWorker = new Worker("static/worker.js");
    myWorker.onmessage = function(e) {
        console.log("Worker said: " + e.data);
    }
});

test = function() {
    html =  "<div class='box'>" +
            "   <div class='lBox'></div>" +
            "   <div class='rBox'></div>" +
            "</div>";
    movie = $('#movie')[0];
    movie.innerHTML += html;
    initialize();
};

initialize = function() {
    rBoxen = $('.rBox');
    rBoxen.bind('click', arrow.newArrow);
    lBoxen = $('.lBox');
    lBoxen.bind('click', arrow.stop);
    boxen = $('.box');
    boxen.bind('click', startBox);
};

startBox = function(/* Event */ e) {
    var elem = $(e.target);
    $(document).on('mousemove', moveBox(elem));
    elem.bind('click', stopBox);
};

moveBox = function(elem) {
    return function(e) {
        //Move the box
        var x = elem.width()/2;
        var y = elem.height()/2;
        elem.offset({left: e.pageX-x, top: e.pageY-y});
        //Move any arrows from box
        var rBox = elem.children('.rBox');
        if(rBox[0].id) {
            var off = rBox.offset();
            arrow.updateTail(off.left+rBox.width(), off.top+rBox.height()/2, rBox[0].id);
        }
        //Move any arrows to box
        var lBox = elem.children('.lBox');
        if(lBox[0].id) {
            var idArray = lBox[0].id.split(",");
            for(var i=1; i<idArray.length; i++ ) {
                var off = lBox.offset();
                arrow.updateHead(off.left+lBox.width()/2,off.top+lBox.height()/2, idArray[i]);
            }
        }
    };
};

stopBox = function(/* Event */ e) {
    var elem = $(e.target);
    $(document).off('mousemove');
    elem.bind('click', startBox);
};
