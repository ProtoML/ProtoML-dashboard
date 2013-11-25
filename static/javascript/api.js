var api = (function() {
	var ap = {}
      , transforms = {}
      ;

    //Public functions
    ap.getTransforms = function() {
        var address = "http://localhost:9200/protoml/transform/_search"
            ;
        if(Object.keys(transforms).length > 0) {
            _loadTransforms();
            ap.loadTransformData();
        }
        else {
            $.ajax({
                type: "GET",
                url: address,
                success: _processTransformResults,
                error: _processError
            });
        }
    };
    ap.loadDag = function() {
        var address = "http://localhost:8080/graph"
            ;
        $.ajax({
            type: "GET",
            url: address,
            success: _processDagResults,
            error: _processError
        });
    };
    ap.loadTransformData = function() {
        var id = $('#tfTemplateID')[0].value
          , transform = transforms[id]
          , data = ""
          , functionList = $('#tfFunction')[0]
          , parameterList = $('#tfParameters')[0]
          , hyperParameterList = $('#tfHyperParameters')[0]
          ;
        //Add functions:
        Object.keys(transform.Functions).forEach(function(fName, index, array) {
            data += "<option value='";
            data += fName;
            data += "'>";
            data += fName;
            data += "</option>";
        });
        functionList.innerHTML = data;
        data = "";
        //Add parameters:
        if(transform.PrimaryParameters != null) {
            Object.keys(transform.PrimaryParameters).forEach(function(pName, index, array) {
                var parameter = transform.PrimaryParameters[pName];
                data += "<div>";
                data += "<label for='tfParameter" + index + "'>";
                data += pName + ":";
                data += "</label>"
                data += "<input type='text' id='tfParameter" + index + "'";
                data +=  " value='" + parameter.Default + "'></input>";
                data += "</div>";
                data += "<div>" + parameter.Description + "</div>";
            });
        }
        parameterList.innerHTML = data;
        data = "";
        if(transform.PrimaryHyperParameters != null) {
            //Add hyper parameters:
            Object.keys(transform.PrimaryHyperParameters).forEach(function(pName, index, array) {
                var hyperParameter = transform.PrimaryHyperParameters[pName];
                data += "<div>";
                data += "<label for='tfHyperParameter" + index + "'>";
                data += pName + ":";
                data += "</label>"
                data += "<input type='text' id='tfHyperParameter" + index + "'";
                data +=  " value='" + hyperParameter.Default + "'></input>";
                data += "</div>";
                data += "<div>" + hyperParameter.Description + "</div>";
            });
        }
        hyperParameterList.innerHTML = data;
    };
    ap.countStates = function(/* String */ id) {
        var transform = transforms[$("#tfTemplateID").val()];
        return Object.keys(transform.PrimaryOutputStates).length;
    };

    //Private functions
    var _processDagResults = function(data, status, xhr) {
        if(status != "success") {
            console.log("Graph returned: " + status);
            return;
        }
        var dag = new Dag()
          , vertArray = data.Vertices
          , edgeArray = data.Edges
          ;
        dag.loadFromMap(vertArray, edgeArray);
        dag.render();
    }
    ,   _processTransformResults = function(data, status, xhr) {
        if(status != "success") {
            console.log("Elasticsearch returned: " + status);
            return;
        }
        var results = data.hits
            , transformSelector = $('#tfTemplateID')[0]
            , tsData = ""
            ;
        results.hits.forEach(function(element, index, array) {
            transforms[element._id] = element._source;
            tsData += "<option value='";
            tsData += element._id;
            tsData += "'>";
            tsData += element._source.Name;
            tsData += "</option>";
        });
        transformSelector.innerHTML = tsData;
        ap.loadTransformData();
    }
    ,   _loadTransforms = function() {
        var tsData = ""
          , transformSelector = $('#tfTemplateID')[0]
          ;
        Object.keys(transforms).forEach(function(transformId, index, array) {
            var transform = transforms[transformId];
            tsData += "<option value='";
            tsData += transformId;
            tsData += "'>";
            tsData += transform._source.Name;
            tsData += "</option>";
        });
        transformSelector.innerHTML = tsData;
    }
    ,   _processError = function(xhr, status, error) {
        console.log(error);
    }
    ;

    //Return public object
    return ap;
}());
