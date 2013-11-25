var search = (function() {
	var srch = {}
        , _dataOptions = { "ExclusiveType" : true, "Tags" : true, "FileFormat" : true }
        ;

    //Public functions
    srch.toggleDataOption = function(elem, param) {
        $(elem).toggleClass("teal");
        _dataOptions[param] = !_dataOptions[param];
        srch.dataQuery();
    };
    srch.dataQuery = function() {
        var   query = $('#searchQuery')[0].value
            , address = "http://localhost:9200/protoml/data/_search"
            , queryList = ""
            , jsonQuery = ""
            , prev = false
            ;
        if(_dataOptions["ExclusiveType"]) { //ExclusiveType
            queryList += '{"prefix":{"ExclusiveType":"'+ query + '"}}';
            prev = true;
        }
        if(_dataOptions["Tags"]) { //Tags
            if(prev) {
                queryList += ",";
            }
            queryList += '{"prefix":{"Tags":"'+ query + '"}}';
            prev = true;
        }
        if(_dataOptions["FileFormat"]) { //FileFormat
            if(prev) {
                queryList += ",";
            }
            queryList += '{"prefix":{"FileFormat":"'+ query + '"}}';
        }
        jsonQuery = '{"query":{"filtered":{"filter":{"or":[ ' + queryList + ']}}}}';
        if(!(queryList == "")) {
            $.ajax({
                type: "POST",
                data: jsonQuery,
                url: address,
                success: _processDataResults,
                error: _processError
            });
        }
        else {
            $('#searchResults')[0].innerHTML = "";
        }
    };

    //Private functions
    var _processDataResults = function(data, status, xhr) {
        if(status != "success") {
            console.log("Elasticsearch returned: " + status);
            return;
        }
        var results = data.hits
            , resultDiv = $('#searchResults')
            ;
        resultDiv[0].innerHTML = "";
        if(results.hits.length == 0) {
           resultDiv[0].innerHTML = "<tr><td>No results</td></tr>";
        }
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
    var _processTransformResults = function(data, status, xhr) {
        if(status != "success") {
            console.log("Elasticsearch returned: " + status);
            return;
        }
        var results = data.hits
            , resultDiv = $('#searchResults')
            ;
        resultDiv[0].innerHTML = "";
        if(results.hits.length == 0) {
           resultDiv[0].innerHTML = "<tr><td>No results</td></tr>";
        }
        results.hits.forEach(function(element, index, array) {
            var result = "<tr><td>";
            result += JSON.stringify(element._source.Source);
            result += "</td><td>"
            result += JSON.stringify(element._source.FileFormat);
            result += "</td><td>"
            result += JSON.stringify(element._source.Columns.ExclusiveType);
            result += "</td><td><i class='add icon plus' onclick='createData()'></i></td></tr>";
            resultDiv[0].innerHTML += result;
        });
    };
    var _processError = function(xhr, status, error) {
        console.log(error);
    };

    //Return public object
    return srch;
}());
