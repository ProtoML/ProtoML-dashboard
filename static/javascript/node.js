const anEndpointSource = {
    endpoint: "Dot",
    cssClass: "rightEnd",
    isSource: true,
    isTarget: false,
    maxConnections: -1,
    anchor: "Right"
};
const anEndpointDestination = {
    endpoint: "Rectangle",
    cssClass: "leftEnd",
    isSource: false,
    isTarget: true,
    maxConnections: -1,
    anchor: "Left"
};
function Node(/* String */ id) {
    this.id = id;

    this.width = 0;
    this.height = 0;
    this.layout = null;
    this.element = null;
}
Node.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
}
/*
 * TODO: remove this
 */
createTransform = function(/* String */ id) {
    //Create transform object
    var movie = $('#movie');
    var jNode = $("<div class='box'></div>");
    //Add to page
    movie.append(jNode);
    jNode[0].id = id;
    //Add jsPlumbing
    jsPlumb.draggable(jNode);
    this.startPoint = jsPlumb.addEndpoint(
        jNode,
        anEndpointSource
    );
    
    this.endPoint = jsPlumb.addEndpoint(
        jNode,
        anEndpointDestination
    );
    //Update event handlers
    jNode.dblclick( function(/*Event*/ e) {
        $(".ui.modal.api").modal('show');
    });

    return [jNode, startPoint, endPoint];
};

Node.prototype.addToPage = function() {
    transArray = createTransform(this.id);
    this.element = transArray[0];
    this.startPoint = transArray[1];
    this.endPoint = transArray[2];
    this.element.offset({ top: this.layout.y, left: this.layout.x });
}

/*
deleteTransform = function() {
    var selected = $('.selected');
    arrow.deleteArrows(selected);
    selected.remove();
};
*/

// Getters and Setters
Node.prototype.setLayout = function(/* Dagre node */ layout) {
    this.layout = layout;
}
Node.prototype.getId = function() {
    return this.id;
}
Node.prototype.getWidth = function() {
    return this.width;
}
Node.prototype.getHeight = function() {
    return this.height;
}
Node.prototype.getElement = function() {
    return this.element;
}
Node.prototype.getLeft = function() {
    return this.endPoint;
}
Node.prototype.getRight = function() {
    return this.startPoint;
}
