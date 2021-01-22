
class Blockade {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	
	// check if an agent's position is within this blockade
	hits(agent) {
		if (agent instanceof Agent) {
			if (agent.x > this.x && agent.x < this.x + this.w && agent.y > this.y && agent.y < this.y + this.h) {
				return true;
			}
		}
		return false;
	}
	
	// display function
	show() {
		stroke(150);
		fill(150);
		rect(this.x, this.y, this.w, this.h);
	}
}