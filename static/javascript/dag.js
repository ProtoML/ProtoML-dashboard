function Dag() {
    this.nodes = {};
    this.inEdges = {};
    this.outEdges = {};
}

Dag.prototype.loadFromMap = function(/* Array */ vertices, /* Array */ edges) {
    var self = this;
    vertices.forEach(function(element, index, array) {
        self.addNode(element[0], element[1]);
    });
}

Dag.prototype.addNode = function(/* String */ className, /* String */ id) {
    //Create new node
    var newNode = new Node(id);
    newNode.setClass(className);
    if(className == "data") {
        newNode.setSize(100, 100);
    }
    else if(className == "transform") {
        newNode.setSize(140, 100);
    }
    else if(className == "state") {
        newNode.setSize(60, 60);
    }
    else {
        //no-op
    }
    this.nodes[id] = newNode;
}
Dag.prototype.addEdge = function() {
    for(var i in parents) {
		var element = parents[i];
		if(!(element in this.outEdges))
			this.outEdges[element] = [];
		if(!(id in this.inEdges))
			this.inEdges[id] = [];
		this.outEdges[element].push(id);
		this.inEdges[id].push(element);
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
    jsPlumb.repaintEverything();
    layout.eachEdge(function(e, inId, outId, value) {
        var inBox = self.getNodeById(inId).getRight()
        ,   outBox = self.getNodeById(outId).getLeft()
        ;
        console.log(inBox);
        jsPlumb.connect({source:inBox, target:outBox});
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
