class SnakeNode {
    constructor(position = { x: 0, y: 0 }, previous = null) {
        this.position = position;
        this.previous = previous;
    }
}

export default SnakeNode;
