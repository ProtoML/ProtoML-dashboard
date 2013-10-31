var search = (function() {
	var srch = {}
        addressString = "http://localhost:9200/protoml/%s/_search?q=%s:%s"
        ;


    //Public functions
    srch.query = function() {
        var AJAX = new XMLHttpRequest()
            , type = $('#searchType')[0].value
            , query = $('#searchQuery')[0].value
            , address = sprintf(addressString, type, "name", query)
            ;
        AJAX.open("GET", address, false);
        AJAX.send(null);
        _processResults(AJAX.responseText);
    };

    //Private functions
    _processResults = function(resultString) {
        var results = JSON.parse(resultString).hits
            , resultDiv = $('#searchResults')
            ;
        resultDiv[0].innerHTML = "Number of results: " + results.total + " ";
        results.hits.forEach(function(element, index, array) {
            resultDiv[0].innerHTML += JSON.stringify(element._source);
        });
        console.log(results);
    };

    //Return public object
    return srch;
}());


