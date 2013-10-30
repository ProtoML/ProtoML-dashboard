var lightbox = (function() {
	var lb = {}
        , box = $('#lbox')
        , closeX = $('#boxclose')
        , search = $('#searchBox')
        ;


    //Public functions
    lb.search = function() {
        _open(search);
    };

    lb.transformTab = function(whichClass) {
        var settings = $('.selected').children(whichClass);
        _open(settings);
    };

    lb.close = function(/* Event */ e) {
        var target = $(e.target);
        if(closeX[0] != target[0] && box[0] != target[0])
        {
            return;
        }
        box.addClass('hidden');
        var contentID = box.children('#id')[0].value;
        console.log('#' + contentID);
        $('#' + contentID)[0].innerHTML = box.find('#content')[0].innerHTML;
    };

    //Private functions
    _open = function(elem) {
        box.removeClass('hidden');
        box.find('#content')[0].innerHTML = elem[0].innerHTML;
        elem[0].innerHTML = "";
        box.children('#id')[0].value = elem[0].id;
    };

    //Return public object
    return lb;
}());


