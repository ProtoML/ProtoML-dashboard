var events = (function() {
	var ev = {}
        ;


    //Public functions
    ev.initialize = function() {
        $(document.body).bind('dblclick', _deselect);
    };
    ev.updateHandlers = function() {
        var rBoxen = $('.rBox');
        rBoxen.bind('click', arrow.newArrow);
        var lBoxen = $('.lBox');
        lBoxen.bind('click', arrow.stop);
        var boxen = $('.box');
        boxen.bind('click', _startBox);
        boxen.bind('dblclick', _selectBox);
    };

    //Private functions
    _deselect = function(/* Event */ e) {
        var selected = $('.selected');
        selected.removeClass('selected');
    };
    _selectBox = function(/* Event */ e) {
        e.stopPropagation();
        _deselect(null);
        var elem = $(e.target);
        elem.addClass('selected');
    };
    _startBox = function(/* Event */ e) {
        var elem = $(e.target);
        if(!elem.hasClass('box'))
        {
            return;
        }
        $(document).on('mousemove', _moveBox(elem));
        elem.bind('click', _stopBox);
    };
    _stopBox = function(/* Event */ e) {
        var elem = $(e.target);
        $(document).off('mousemove');
        elem.bind('click', _startBox);
    };
    _moveBox = function(elem) {
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

    //Return public object
    return ev;
}());


