
const XSIZE = 500;
const YSIZE = 500;

const POPULATION_SIZE = 100;
const CYCLE_LIMIT = 500;
const MUTATION_CHANCE = 0.001;

let blockades = [];
let agents = [];
let allAgents = [];
let cycles = 0;
let generation = 1;

let currentBest = 0;
let totalBest = 0;

let cycleSpan;
let genSpan;
let bestSpan;
let champSpan;

function setup() {
	let canvas = createCanvas(XSIZE,YSIZE);
	canvas.parent('canvascontainer');
	
	cycleSpan = select('#counter');
	genSpan = select('#gen');
	bestSpan = select('#best');
	champSpan = select('#champ');
	
	// create the blockades
	blockades[0] = new Blockade(0, 150, 250, 30);
	blockades[1] = new Blockade(250, 250, 250, 30);
	blockades[2] = new Blockade(125, 350, 250, 30);
	blockades[3] = new Blockade(0, 450, 125, 30);
	blockades[4] = new Blockade(375, 450, 125, 30);
	
	// create the initial pool of agents
	for (let i = 0; i < POPULATION_SIZE; i++) {
		let a = new Agent();
		a.setBrain(new FlowField(XSIZE, YSIZE, 10));
		
		agents[i] = a;
	}
	allAgents = [...agents];
}

function nextGeneration() {
	cycles = 0;
	generation++;
	
	let sum = 0;
	for (let i = 0; i < allAgents.length; i++) {
		sum = sum + allAgents[i].y;
	}
	
	let breedingList = []
	let fitness = 0;
	
	for (let i = 0; i < allAgents.length; i++) {
		fitness = Math.floor((allAgents[i].y / sum) * 500);
		for (let j = 0; j < fitness; j++) {
			breedingList[breedingList.length] = allAgents[i];
		}
	}
	
	let parent1;
	let parent2;
	
	for (let i = 0; i < POPULATION_SIZE; i++) {
		let a = new Agent();
		
		parent1 = breedingList[Math.floor(breedingList.length * Math.random())];
		parent2 = breedingList[Math.floor(breedingList.length * Math.random())];
		
		a.setBrain(new FlowField(XSIZE, YSIZE, 10, MUTATION_CHANCE, parent1, parent2));
		
		agents[i] = a;
	}
	allAgents = [...agents];
	
	currentBest = 0;
}

function draw() {
	background(0);
	
	// move agents
	for (let i = 0; i < agents.length; i++) {
		agents[i].update();
		if (agents[i].x < 0 || agents[i].x > XSIZE || agents[i].y < 0 || agents[i].y > YSIZE) {
			agents.splice(i, 1);
		}
		else {
			for (let j = 0; j < blockades.length; j++) {
				if (blockades[j].hits(agents[i])) {
					agents.splice(i, 1);
				}
			}
		}
	}
	
	for (let i = 0; i < blockades.length; i++) {
		blockades[i].show();
	}
	
	for (let i = 0; i < allAgents.length; i++) {
		allAgents[i].show();
		if (allAgents[i].y > currentBest) {
			currentBest = Math.floor(allAgents[i].y);
		}
		if (allAgents[i].y > totalBest) {
			totalBest = Math.floor(allAgents[i].y);
		}
	}
	
	cycles++;
	
	if (cycles >= CYCLE_LIMIT || agents.length == 0) {nextGeneration();}
	
	cycleSpan.html(cycles);
	genSpan.html(generation);
	bestSpan.html(currentBest);
	champSpan.html(totalBest);
}