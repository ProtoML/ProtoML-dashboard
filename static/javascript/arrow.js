const Sarrow = "M%s %s L%s %s L%s %s";
const Sline = "M%s %s L%s %s";
Raphael.fn.arrow = function (x1, y1, x2, y2, n) {
    s = 8;
    //Arrowhead
    var angle = Math.atan2(x1-x2,y2-y1);
    angle = (angle / (2 * Math.PI)) * 360;
    var arrowPath = this.path(sprintf(Sarrow, x2, y2, x2-s, y2-s, x2-s,y2+s, x2, y2)).attr("fill","black").transform("R" + (90+angle));
    arrowPath.id = "arrowHead" + n;
    //Line
    var linePath = this.path(sprintf(Sline, x1, y1, x2, y2));
    linePath.id = "arrowLine" + n;
    return [linePath, arrowPath];
};
var arrow = (function() {
	var arr = {}
        , _currHeads = []
        , _currNum = 1
        ;

    //Public functions
    arr.deleteArrows = function(/* Element */ elem) {
        elem.children('.lBox').each( function( index, value) {
            if(value.id != "")
            {
                var idArray = value.id.split(",");
                for(var i=1; i<idArray.length; i++ ) {
                    _deleteArrow(idArray[i]);
                }
            }
        });
        elem.children('.rBox').each( function( index, value) {
            if(value.id != "")
            {
                _deleteArrow(value.id);
            }
        });
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
            $('.lBox').each( function( index, value) {
                var idArray = value.id.split(",");
                value.id = "";
                for(var i=1; i<idArray.length; i++ ) {
                    if(idArray[i] != elem[0].id)
                    {
                        value.id += "," + idArray[i];
                    }
                }
            });
            _currHeads.push(elem[0].id); 
        }
        $(document).mousemove(_moveArrows);
    };
    arr.edgeArrow = function(/* Node */ inNode, /* Node */ outNode) {
        var startElem = inNode.getElement()
            , startOff = startElem.offset()
            , startX = startOff.left + startElem.width()
            , startY = startOff.top + startElem.height()/2
            , endElem = outNode.getElement()
            , endOff = endElem.offset()
            , endX = endOff.left + 10
            , endY = endOff.top + endElem.height()/2
            , rBox = startElem.children('.rBox')
            , lBox = endElem.children('.lBox')
            ;
        lBox[0].id += "," + _currNum;
        rBox[0].id = _currNum;
        paper.arrow(startX, startY, endX, endY, _currNum++);
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
        var linePath = sprintf(Sline, x1, y1, x2, y2);
        var arrowPath = sprintf(Sarrow, x2, y2, x2-s, y2-s, x2-s,y2+s, x2, y2);
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
        var linePath = sprintf(Sline, x1, y1, x2, y2);
        var arrowPath = sprintf(Sarrow, x2, y2, x2-s, y2-s, x2-s,y2+s, x2, y2);
        paper.getById('arrowLine' + n).attr({path: linePath});
        paper.getById('arrowHead' + n).attr({path: arrowPath}).transform("r" + (90+angle));
    };

    //Private functions
    _moveArrows = function(/* Event */ e) {
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
    _deleteArrow = function(id) {
        //Remove the arrow
        var line = paper.getById('arrowLine' + id)
        if(line)
        {
            line.remove();
        }
        var head = paper.getById('arrowHead' + id)
        if(head)
        {
            head.remove();
        }
        //Remove references to arrow
        $('.lBox').each( function( index, value) {
            var idArray = value.id.split(",");
            value.id = "";
            for(var i=1; i<idArray.length; i++ ) {
                if(idArray[i] != id) {
                    value.id += "," + idArray[i];
                }
            }
        });
        $('.rBox').each( function( index, value) {
            if(value.id == id) {
                value.id = "";
            }
        });
    };

    //Return public object
    return arr;
}());


