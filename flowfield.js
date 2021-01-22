
class FlowField {
	constructor(canvaswidth, canvasheight, resolution, mutate, parent1, parent2) {
		this.field = [];
		this.cols = Math.floor(canvaswidth / resolution);
		this.rows = Math.floor(canvasheight / resolution);
		this.resolution = resolution;

		// if this flowfield has parents, combine them to determine this flowfield's properties
		if (parent1 instanceof Agent && parent2 instanceof Agent) {
			this.field = this.combine(parent1, parent2, mutate);
		}
		// if no parents are provided, instantiate this flowfield with random values
		else {
			for (let i = 0; i < this.rows * this.cols; i++) {
				this.field[i] = Math.random() * Math.PI * 2;
			}
		}
	}
	
	// combine two agents' flowfields to create a new flowfield
	combine(p1, p2, m) {
		let newField = [];
		
		// for every value in the flowfield
		for (let i = 0; i < this.rows * this.cols; i++) {
			// check mutation chance
			// if mutation happens, set this value randomly
			if (Math.random() < m) {
				newField[i] = Math.random() * Math.PI * 2;
			}
			// if no mutation, choose one parent's value randomly
			else {
				//let sum = p1.fitness + p2.fitness;
				//if (Math.random() * sum < p1.fitness) {
				if (Math.random() > 0.5) {
					newField[i] = p1.brain.field[i];
				}
				else {
					newField[i] = p2.brain.field[i];
				}
			}
		}
		return newField;
	}
	
	// display function
	show() {
		var x;
		var y;
		var size = this.resolution / 2;
		stroke(100,100);
		for (let i = 0; i < this.field.length; i++) {
			x = (i % this.cols) * this.resolution + size;
			y = Math.floor(i / this.cols) * this.resolution + size;
			
			line(x,y,Math.cos(this.field[i]) * size + x,Math.sin(this.field[i]) * size + y);
		}
	}
	
	// get the flowfield's value at a given coordinate pair
	getAngle(x, y) {
		return this.field[Math.floor(y / this.resolution) * this.cols + Math.floor(x / this.resolution)];
	}
}
