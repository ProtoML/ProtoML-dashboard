function Dag() {
    this.nodes = {};
    this.inEdges = {};
    this.outEdges = {};
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
Dag.prototype.loadFromList = function(/* Array */ data) {
    var self = this;
    data.forEach(function(element, index, array) {
        self.addNode(element[0], element[1]);
    });
}

Dag.prototype.addNode = function(/* String */ id, /* Array */ parents) {
    //Create new node
    var newNode = new Node(id);
    newNode.setSize(140, 100);
    this.nodes[id] = newNode;

    //Set parents -> new node connections
    for(var i in parents) {
	var element = parents[i];
	this.outEdges[element] = (element in this.outEdges) ? this.outEdges[element].push(id) : [id];
        this.inEdges[id] = (id in this.inEdges) ? this.inEdges[id].push(element) : [element];
    }
}

Dag.prototype.getNodeById = function(/* String */ id) {
    return this.nodes[id];
}
Dag.prototype.getChildren = function(/* String */ id) {
    return this.outEdges[id];
}
Dag.prototype.getParents = function(/* String */ id) {
    return this.inEdges[id];
}
Dag.prototype.render = function() {
    var g = new dagre.Digraph();
    //Add nodes to dagre
    for(var id in this.nodes) {
	var node = this.getNodeById(id);
        g.addNode(id, { label: id, width: node.getWidth(), height: node.getHeight() });
    };
    //Add edges to dagre 
    for(var parent in this.outEdges) {
	    var children = this.outEdges[parent];
        for(var child in children) {
            g.addEdge(null,parent,children[child]);
        }
    }
    //Calculate layout
    var layout = dagre.layout().nodeSep(100).rankSep(100).rankDir('LR').run(g);
    var self = this;
    layout.eachNode(function(id, value) {
        var node = self.getNodeById(id);
        node.setLayout(value);
        node.addToPage();
    });
    layout.eachEdge(function(e, inId, outId, value) {
        var inNode = self.getNodeById(inId)
        ,   outNode = self.getNodeById(outId)
        ;
        arrow.edgeArrow(inNode, outNode);
    });
}
/*
Dag.prototype.getWidth = function() {
    var lastChild, child, parents, newWidth = 0;
    if(this.width != -1) {
        return this.width;
    }
    lastChild = this.getNodeByPosition(0);
    child = this.getChildByPosition(0);
    while(child) {
       lastChild = child;
       child = this.getChildByPosition(lastChild.getPosition());
    }
    parents = this.getParentsByPosition(lastChild.getPosition());
    while(
}*/
