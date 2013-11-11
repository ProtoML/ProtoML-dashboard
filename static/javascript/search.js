var search = (function() {
	var srch = {}
        addressString = "http://localhost:9200/protoml/%s/_search?q=%s:%s"
        ;
        //data TypeName query
        //type field query

    //Public functions
    srch.query = function() {
        var type = $('#searchType')[0].value
            , field = $('#searchField')[0].value
            , query = $('#searchQuery')[0].value
            , address = sprintf(addressString, type, field, query)
            ;
        $.ajax({
            type: "GET",
            url: address,
            success: _processResults,
            error: _processError
        });
    };

    //Private functions
    _processResults = function(data, status, xhr) {
        if(status != 200) {
            console.log("Elasticsearch returned: " + status);
            return;
        }
        var results = JSON.parse(xhr.resultString).hits
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
    _processError = function(xhr, status, error) {
        console.log(error);
    };

    //Return public object
    return srch;
}());
