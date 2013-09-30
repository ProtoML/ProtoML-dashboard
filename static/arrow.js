Raphael.fn.arrow = function (x1, y1, x2, y2, n) {
    size = 8;
    //Arrowhead
    var angle = Math.atan2(x1-x2,y2-y1);
    angle = (angle / (2 * Math.PI)) * 360;
    var arrowPath = this.path("M" + x2 + " " + y2 + " L" + (x2  - size) + " " + (y2  - size) + " L" + (x2  - size)  + " " + (y2  + size) + " L" + x2 + " " + y2 ).attr("fill","black").transform("R" + (90+angle));
    arrowPath.id = "arrowHead" + n;
    //Line
    var linePath = this.path("M" + x1 + " " + y1 + " L" + x2 + " " + y2);
    linePath.id = "arrowLine" + n;
    return [linePath, arrowPath];
};
var arrow = (function() {
	var arr = {}
        , _currHeads = []
        , _currNum = 1
        ;

    arr.moveArrows = function(/* Event */ e) {
        for (var i in _currHeads) {
            if(_currHeads[i] > 0)
            {
                arrow.updateHead(e.pageX,e.pageY, _currHeads[i]);
            }
            else
            {
                _currHeads[i] = -1 * _currHeads[i];
                arr = paper.arrow(startX,startY,e.pageX,e.pageY, _currHeads[i]);
            }
        }
    };
    arr.newArrow = function(/* Event */ e) {
        e.stopPropagation();
        var elem = $(e.target);
        var off = elem.offset();
        startX = off.left + elem.width();
        startY = off.top + elem.height()/2;
        if(!elem[0].id)
        {
            elem[0].id = _currNum;
            _currHeads.push(-_currNum);
            _currNum++;
        }
        else
        {
           _currHeads.push(elem[0].id); 
        }
        $(document).mousemove(arrow.moveArrows);
    };
    arr.stop = function(/* Event */ e) {
        e.stopPropagation();
        var elem = $(e.target)[0];
        for (var i in _currHeads) {
            elem.id += "," + _currHeads[i];
        }
        $(document).off('mousemove');
        _currHeads = [];
    };

    arr.updateHead = function(x2, y2, n) {
        var s = 8;
        var arrowLinePath = paper.getById('arrowLine' + n).attr("path");
        var x1 = arrowLinePath[0][1];
        var y1 = arrowLinePath[0][2];
        //Arrowhead
        var angle = Math.atan2(x1-x2,y2-y1);
        angle = (angle / (2 * Math.PI)) * 360;
        //Line
        var linePath = "M" + x1 + " " + y1 + " L" + x2 + " " + y2;
        var arrowPath = "M" + x2 + " " + y2 + " L" + (x2  - s) + " " + (y2  - s) + " L" + (x2  - s)  + " " + (y2  + s) + " L" + x2 + " " + y2;
        paper.getById('arrowLine' + n).attr({path: linePath});
        paper.getById('arrowHead' + n).attr({path: arrowPath}).transform("r" + (90+angle));
    };
    arr.updateTail = function(x1, y1, n) {
        var s = 8;
        var arrowLinePath = paper.getById('arrowLine' + n).attr("path");
        var x2 = arrowLinePath[1][1];
        var y2 = arrowLinePath[1][2];
        //Arrowhead
        var angle = Math.atan2(x1-x2,y2-y1);
        angle = (angle / (2 * Math.PI)) * 360;
        //Line
        var linePath = "M" + x1 + " " + y1 + " L" + x2 + " " + y2;
        var arrowPath = "M" + x2 + " " + y2 + " L" + (x2  - s) + " " + (y2  - s) + " L" + (x2  - s)  + " " + (y2  + s) + " L" + x2 + " " + y2;
        paper.getById('arrowLine' + n).attr({path: linePath});
        paper.getById('arrowHead' + n).attr({path: arrowPath}).transform("r" + (90+angle));
    };

    return arr;
}());


