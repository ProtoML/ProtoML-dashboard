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

Node.prototype.addToPage = function() {
    var movie = $('#movie');
    var jNode = $($('#transform')[0].innerHTML);
    jNode[0].id = this.id;
    movie.append(jNode);
    this.element = jNode;
    var yOff = this.layout.y;// - this.height/2;
    var xOff = this.layout.x;// - this.width/2;
    jNode.offset({ top: yOff, left: xOff });
    events.updateHandlers();
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
