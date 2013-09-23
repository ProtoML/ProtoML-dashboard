Raphael.fn.arrow = function (x1, y1, x2, y2, size, n) {
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

updateArrow = function(x2, y2, size, n) {
    var arrowLinePath = paper.getById('arrowLine' + n).attr("path");
    var x1 = arrowLinePath[0][1];
    var y1 = arrowLinePath[0][2];
    //Arrowhead
    var angle = Math.atan2(x1-x2,y2-y1);
    angle = (angle / (2 * Math.PI)) * 360;
    //Line
    var linePath = "M" + x1 + " " + y1 + " L" + x2 + " " + y2;
    var arrowPath = "M" + x2 + " " + y2 + " L" + (x2  - size) + " " + (y2  - size) + " L" + (x2  - size)  + " " + (y2  + size) + " L" + x2 + " " + y2;
    console.log();
    paper.getById('arrowLine' + n).attr({path: linePath});
    paper.getById('arrowHead' + n).attr({path: arrowPath}).transform("r" + (90+angle));
}

$(document).ready(function() {
    paper = new Raphael("raphael",2000, 2000);
    arr = false;
    m = 1;
    currArrow = [];
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
    rBoxen.bind('click', dragStart);
    lBoxen = $('.lBox');
    lBoxen.bind('click', drop);
    boxen = $('.box');
    boxen.bind('click', moveBox);
}

moveBox = function(/* Event */ e) {
    var elem = $(e.target);
    $(document).on('mousemove', function(e) {
        var x = elem.width()/2;
        var y = elem.height()/2;
        elem.offset({left: e.pageX-x, top: e.pageY-y});
    });
    elem.bind('click', stopBox);
}

stopBox = function(/* Event */ e) {
    var elem = $(e.target);
    $(document).off('mousemove');
    elem.bind('click', moveBox);
}

dragStart = function(/* Event */ e) {
    e.stopPropagation();
    var elem = $(e.target);
    var off = elem.offset();
    startX = off.left + elem.width();
    startY = off.top + elem.height()/2;
    if(!elem[0].id)
    {
        elem[0].id = m;
        currArrow.push(-m);
        m++;
    }
    else
    {
       currArrow.push(elem[0].id); 
    }
    $(document).mousemove(function(e) {
        for (var i in currArrow) {
            if(currArrow[i] > 0)
            {
                updateArrow(e.pageX,e.pageY, 8, currArrow[i]);
            }
            else
            {
                currArrow[i] = -1 * currArrow[i];
                arr = paper.arrow(startX,startY,e.pageX,e.pageY,8, currArrow[i]);
            }
        }
    });
}

drop = function(/* Event */ e) {
    e.stopPropagation();
    $(document).off('mousemove');
    currArrow = [];
}
