
class Agent {
	constructor() {
		this.x = 250;
		this.y = 490;
		this.direction = 0;
		this.brain;
		this.speed = 2;
	}
	
	setBrain(ff) {
		if (ff instanceof FlowField) {
			this.brain = ff;
		}
	}
	
	update() {
		// first update movement direction
		let newAngle = this.brain.getAngle(this.x, this.y);
		
		let difference = Math.abs(this.direction - newAngle);
		if (difference > Math.PI) {
			difference = difference - Math.PI;
			difference = difference / 2;
			this.direction = this.direction > newAngle ? this.direction + difference : newAngle + difference;
			this.direction = this.direction % (Math.PI * 2);
		}
		else {
			difference = difference / 2;
			this.direction = this.direction > newAngle ? newAngle + difference : this.direction + difference;
		}
		
		
		//this.direction = newAngle;//((this.direction + this.direction + newAngle) / 3) % (Math.PI * 2);
		
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