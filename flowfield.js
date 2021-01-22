
class FlowField {
	constructor(canvaswidth, canvasheight, resolution, parent1, parent2) {
		this.field = [];
		this.cols = Math.floor(canvaswidth / resolution);
		this.rows = Math.floor(canvasheight / resolution);
		this.resolution = resolution;

		if (parent1 instanceof FlowField && parent2 instanceof FlowField) {
			
		}
		else {
			for (let i = 0; i < this.rows * this.cols; i++) {
				this.field[i] = Math.random() * Math.PI * 2;
			}
		}
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
