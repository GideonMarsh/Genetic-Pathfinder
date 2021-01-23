
const XSIZE = 500;
const YSIZE = 500;

const POPULATION_SIZE = 500;
const CYCLE_LIMIT = 500;
const MUTATION_CHANCE = 0.005;

let blockades = [];
let agents = [];
let allAgents = [];
let cycles = 0;
let generation = 1;

let totalBest = 0;
let fitnessAve = 0;
let previousAve = 0;

let cycleSpan;
let genSpan;
let bestAgent;
let champSpan;
let aveSpan;

let showBrain = false;

function setup() {
	// create the canvas
	let canvas = createCanvas(XSIZE,YSIZE);
	canvas.parent('canvascontainer');
	
	// get references to the display elements
	cycleSpan = select('#counter');
	genSpan = select('#gen');
	champSpan = select('#champ');
	aveSpan = select('#ave');
	
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
	bestAgent = allAgents[0];
	
	// pressing 'b' toggles the display of the best agent's flowfield
	document.addEventListener('keydown', function(event) {
		if (event.keyCode === 66) {
			showBrain = !showBrain;
		}
	});
}

// reset the simulation and create a new set of agents
function nextGeneration() {
	cycles = 0;
	generation++;
	
	// calculate the average fitness of all agents
	let ave = 0;
	for (let i = 0; i < allAgents.length; i++) {
		ave = ave + allAgents[i].fitness;
	}
	ave = Math.max(ave / POPULATION_SIZE, 1);
	
	let breedingList = []
	let fitnessTotal = 0;
	
	// only agents whos performance is average or better are added to the pool of potential parents
	// higher performing agents are added to the pool more times, resulting in them having a higher chance to be chosen as parents
	for (let i = 0; i < allAgents.length; i++) {
		fitnessTotal = allAgents[i].fitness >= ave ? Math.floor(allAgents[i].fitness - ave) : 0;
		for (let j = 0; j < fitnessTotal; j++) {
			breedingList[breedingList.length] = allAgents[i];
		}
	}
	
	// create a new population of agents
	// randomly select two parents from the pool of potential parents and randomly combine their flowfields to create the flowfield for each agent
	// the same parent may be chosen to be both of a new agent's parents
	let parent1;
	let parent2;
	
	for (let i = 0; i < POPULATION_SIZE; i++) {
		let a = new Agent();
		
		parent1 = breedingList[Math.floor(breedingList.length * Math.random())];
		parent2 = breedingList[Math.floor(breedingList.length * Math.random())];
		
		a.setBrain(new FlowField(XSIZE, YSIZE, 10, MUTATION_CHANCE, parent1, parent2));
		
		agents[i] = a;
	}
	// The best performer from the last generation is always carried over without changes
	agents[0].setBrain(bestAgent.brain);
	bestAgent = agents[0];
	allAgents = [...agents];
	
	// update the display of average improvement
	let newAve = Math.floor(ave - previousAve);
	
	if (newAve >= 0) {
		aveSpan.html("+" + newAve);
	}
	else {
		aveSpan.html(newAve);
	}
	previousAve = ave;
	
	fitnessAve = 0;
}

function draw() {
	background(0);
	
	// update agent position and fitness
	// if an agent has moved outside of the canvas or has hit a blockade, remove them from the agents array
	// only update agents in the agents array
	for (let i = 0; i < agents.length; i++) {
		agents[i].update();
		if (agents[i].x < 0 || agents[i].x > XSIZE || agents[i].y < 0 || agents[i].y > YSIZE) {
			agents.splice(i, 1);
		}
		else {
			for (let j = 0; j < blockades.length; j++) {
				if (blockades[j].hits(agents[i])) {
					// penalize agents for colliding with blockades
					agents[i].fitness = Math.max(agents[i].fitness - 50,0);
					agents.splice(i, 1);
					break;
				}
			}
		}
	}
		
	// find the average fitness and the current best performing agent
	// if the record for performance has been broken, update it
	fitnessAve = 0;
	
	for (let i = 0; i < allAgents.length; i++) {
		if (allAgents[i].fitness > bestAgent.fitness) {
			bestAgent.best = false;
			bestAgent = allAgents[i];
			bestAgent.best = true;
		}
		if (allAgents[i].fitness > totalBest) {
			totalBest = Math.floor(allAgents[i].fitness);
		}
		fitnessAve = fitnessAve + allAgents[i].fitness;
	}
	
	fitnessAve = Math.max(fitnessAve / POPULATION_SIZE, 1);
	
	// draw the blockades
	for (let i = 0; i < blockades.length; i++) {
		blockades[i].show();
	}
	
	// set the colors of the agents and draw them
	for (let i = 0; i < allAgents.length; i++) {
		allAgents[i].color = Math.min(Math.max(127 * allAgents[i].fitness / fitnessAve, 0), 255);
		allAgents[i].show();
	}
	
	// increment the cycle counter
	cycles++;
	
	if (showBrain) {bestAgent.brain.show();}
	
	// if cycle limit has been reached, make a new generation
	if (cycles >= CYCLE_LIMIT || agents.length == 0) {nextGeneration();}
	
	// update display elements
	cycleSpan.html(cycles);
	genSpan.html(generation);
	champSpan.html(totalBest);
}