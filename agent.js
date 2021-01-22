
class Agent {
	constructor() {
		this.x = 250;
		this.y = 490;
		this.direction = (3 * Math.PI) / 2;
		this.brain;
		this.speed = 1;
	}
	
	setBrain(ff) {
		if (ff instanceof FlowField) {
			this.brain = ff;
		}
	}
	
	update() {
		// first update movement direction
		let newAngle = this.brain.getAngle(this.x, this.y);
		this.direction = ((this.direction + this.direction + newAngle) / 3) % (Math.PI * 2);
		
		// move agent
		
		this.x = this.x + Math.cos(this.direction) * this.speed;
		this.y = this.y + Math.sin(this.direction) * this.speed;
	}
	
	show() {
		stroke(255);
		fill(255);
		
		ellipse(this.x, this.y, 10, 10);
	}
}