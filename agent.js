
class Agent {
	constructor() {
		this.x = 250;
		this.y = 50;
		this.direction = 0;
		this.brain;
		this.speed = 3;
		this.fitness = 0;	// fitness is the record highest y value for this organism
		this.best = false;
		this.color = 0;
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
		
		if (this.y - 50 > this.fitness) {
			this.fitness = this.y - 50;
		}
	}
	
	show() {
		if (this.best) {
			stroke(255 - this.color,this.color,255, 150);
			fill(255 - this.color,this.color,255, 50);

		}
		else {
			stroke(255 - this.color,this.color,0, 200);
			fill(255 - this.color,this.color,0, 100);
		}
		
		ellipse(this.x, this.y, 10, 10);
	}
}