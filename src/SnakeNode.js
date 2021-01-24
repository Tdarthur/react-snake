class SnakeNode {
    constructor(position = { x: 0, y: 0 }, previous = null, next = null) {
        this.position = position;
        this.previous = previous;
        this.next = next;
    }

    append(node) {
        if (node.previous) {
            this.previous = node.previous;
            node.previous.next = this;
        }
        this.next = node;
        node.previous = this;
    }
}

export default SnakeNode;
