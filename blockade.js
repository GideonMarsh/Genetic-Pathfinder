
class Blockade {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	
	hits(Agent) {
		if (Agent.x > this.x && Agent.x < this.x + this.w && Agent.y > this.y && Agent.y < this.y + this.h) {
			return true;
		}
		return false;
	}
	
	show() {
		stroke(150);
		fill(150);
		rect(this.x, this.y, this.w, this.h);
	}
}