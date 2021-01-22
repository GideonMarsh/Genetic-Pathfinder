
class FlowField {
	constructor(canvaswidth, canvasheight, resolution, mutate, parent1, parent2) {
		this.field = [];
		this.cols = Math.floor(canvaswidth / resolution);
		this.rows = Math.floor(canvasheight / resolution);
		this.resolution = resolution;

		if (parent1 instanceof Agent && parent2 instanceof Agent) {
			this.field = this.combine(parent1, parent2, mutate);
		}
		else {
			for (let i = 0; i < this.rows * this.cols; i++) {
				this.field[i] = Math.random() * Math.PI * 2;
			}
		}
	}
	
	combine(p1, p2, m) {
		let newField = [];
		
		for (let i = 0; i < this.rows * this.cols; i++) {
			if (Math.random() < m) {
				newField[i] = Math.random() * Math.PI * 2;
			}
			else {
				let sum = p1.fitness + p2.fitness;
				if (Math.random() * sum < p1.fitness) {
					newField[i] = p1.brain.field[i];
				}
				else {
					newField[i] = p2.brain.field[i];
				}
			}
		}
		return newField;
	}
	
	show() {
		var x;
		var y;
		var size = this.resolution / 2;
		stroke(100);
		for (let i = 0; i < this.field.length; i++) {
			x = (i % this.cols) * this.resolution + size;
			y = Math.floor(i / this.cols) * this.resolution + size;
			
			line(x,y,Math.cos(this.field[i]) * size + x,Math.sin(this.field[i]) * size + y);
		}
	}
	
	getAngle(x, y) {
		return this.field[Math.floor(y / this.resolution) * this.cols + Math.floor(x / this.resolution)];
	}
}
