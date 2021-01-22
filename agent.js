
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
	
	// set the flowfield of this agent
	setBrain(ff) {
		if (ff instanceof FlowField) {
			this.brain = ff;
		}
	}
	
	// update agent position and fitness
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
		
		// move agent
		this.x = this.x + Math.cos(this.direction) * this.speed;
		this.y = this.y + Math.sin(this.direction) * this.speed;
		
		// check if fitness should be increased
		if (this.y - 50 > this.fitness) {
			this.fitness = this.y - 50;
		}
		
		// if agent hits top of the canvas, set their fitness to 0
		if (this.y <= 0) {
			this.fitness = 0;
		}
		
		// if agent hits the bottom of the canvas, increase their fitness based on the remaining time in this generation
		if (this.y >= YSIZE) {
			this.fitness = this.fitness + (CYCLE_LIMIT - cycles) * 2;
		}
	}
	
	// display function
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