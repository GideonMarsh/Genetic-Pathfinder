
const XSIZE = 500;
const YSIZE = 500;

const POPULATION_SIZE = 100;

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
	
	// create the initial pool of agents
	for (let i = 0; i < POPULATION_SIZE; i++) {
		agents[i] = new Agent();
		agents[i].setBrain(new FlowField(XSIZE, YSIZE, 10));
	}
}

function draw() {
	background(0);
	
	// move agents
	for (let i = 0; i < agents.length; i++) {
		agents[i].update();
	}
	
	
	// draw everything
	for (let i = 0; i < blockades.length; i++) {
		blockades[i].show();
	}
	
	for (let i = 0; i < agents.length; i++) {
		agents[i].show();
	}
	agents[0].brain.show();
}