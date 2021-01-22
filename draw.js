
const XSIZE = 500;
const YSIZE = 500;

let blockades = [];
let agents = [];

function setup() {
	let canvas = createCanvas(XSIZE,YSIZE);
	canvas.parent('canvascontainer');
	/*
	// create the blockades
	blockades[0] = new Blockade(0, 150, 250, 30);
	blockades[1] = new Blockade(250, 250, 250, 30);
	blockades[2] = new Blockade(125, 350, 250, 30);*/
	
	agents[0] = new Agent();
	
	agents[0].setBrain(new FlowField(XSIZE, YSIZE, 10));
}

function draw() {
	background(0);
	
	
	// draw everything
	for (let i = 0; i < blockades.length; i++) {
		blockades[i].show();
	}
	
	agents[0].update();
	
	agents[0].show();
	agents[0].brain.show();
}