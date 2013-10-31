var search = (function() {
	var srch = {}
        addressString = "http://localhost:9200/protoml/%s/_search?q=%s:%s"
        ;
        //data TypeName query
        //type field query

    //Public functions
    srch.query = function() {
        var AJAX = new XMLHttpRequest()
            , type = $('#searchType')[0].value
            , field = $('#searchField')[0].value
            , query = $('#searchQuery')[0].value
            , address = sprintf(addressString, type, field, query)
            ;
        console.log(address);
        AJAX.open("GET", address, false);
        AJAX.send(null);
        if(AJAX.status == 200) {
            _processResults(AJAX.responseText);
        }
    };

    //Private functions
    _processResults = function(resultString) {
        var results = JSON.parse(resultString).hits
            , resultDiv = $('#searchResults')
            ;
        resultDiv[0].innerHTML = "";
        results.hits.forEach(function(element, index, array) {
            var result = "<tr><td>";
            result += JSON.stringify(element._source.Source);
            result += "</td><td>"
            result += JSON.stringify(element._source.FileFormat);
            result += "</td><td>"
            result += JSON.stringify(element._source.Columns.ExclusiveType);
            result += "</td></tr>";
            resultDiv[0].innerHTML += result;
        });
    };

    //Return public object
    return srch;
}());
