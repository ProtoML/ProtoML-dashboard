var search = (function() {
	var srch = {}
        addressString = "http://localhost:9200/protoml/%s/_search?q=%s:%s"
        ;


    //Public functions
    srch.query = function() {
        var AJAX = new XMLHttpRequest()
            , type = $('#searchType')[0].value
            , query = $('#searchQuery')[0].value
            , results = $('#searchResults')
            , address = sprintf(addressString, type, "name", query)
            ;
        AJAX.open("GET", address, false);
        AJAX.send(null);
        results[0].innerHTML = AJAX.responseText;
    };

    //Private functions
    _open = function(elem) {
        box.removeClass('hidden');
        box.find('#content')[0].innerHTML = elem[0].innerHTML;
        box.children('#id')[0].value = elem[0].id;
    };

    //Return public object
    return srch;
}());


