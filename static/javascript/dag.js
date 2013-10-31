function Node(/* String */ id, /* Array */ parents) {
    this.id = id;
    this.position = position;
}
Node.prototype.getId() {
    return this.id;
}
Node.prototype.getPosition() {
    return this.position;
}

function Dag() {
    this.nodes = {};
    this.matrix = [][];
}

/** Loads dag data into dag assuming list of the form:
  [ [node, [node's parents] ]
  where:
  [ [1,[]], [2,[1]], [3,[2,4]], [4,[]] ]
  would represent:
  1 -> 2 -\
           --> 3
       4 -/
*/
Dag.prototype.loadFromList(/* Array */ data) {
    data.forEach(function(element, index, array) {
        this.addNode(element[0], element[1]);
    });
}

Dag.prototype.addNode(/* String */ id, /* Array */ parents) {
    this.matrix.forEach(function(element, index, array) {
        element.push(false);
    });
    var curLength = this.matrix.length;
    var newNode = Node(id, curLength);
    this.nodes[id] = newNode;
    var newRow = [false];
    while(curLength--) newRow.push(false);
    this.matrix.push(newRow);
    parents.forEach(function(element, index, array) {
        var node = Dag.getNodeById(element);
        this.matrix[node.getPosition()][this.matrix.length] = true;
    });
}

Dag.prototype.getNodeById(/* String */ id) {
    return this.nodes[id];
}
