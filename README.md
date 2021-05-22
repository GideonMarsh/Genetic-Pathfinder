# Genetic-Pathfinder
A small program demonstrating a genetic algorithm

## Overview
The goal of the genetic algorithm is to have the members of the population, called agents, reach the bottom of the traversable area without colliding with walls or obstacles. This is accomplished by creating a population of agents that each move at random, testing their ability to progress, and then creating a new population using the best performers of the previous population as the templates. This repeats across "generations" of agents, resulting in a gradual improvement in average agent performance over time. This is the basis of genetic algorithms.

## The Area
All agents start at the top center of the traversable area. Within the area are several blockades, which are consistent across generations. If an agent collides with the walls of the area or a blockade, it stops moving. The goal of each agent is to collide with the bottom of the traversable area as quickly as possible. Every agent runs the course at the same time, but they do not interact with one another.

## The Fitness Function
The fitness function determines how well any given agent has performed and how suitable they are to be used as a "parent" for the next generation of agents. Fitness is based on how close a given agent has gotten to the bottom of the screen and whether they have reached it (it is not determined by current distance, but overall closest). Agents that reach the bottom of the screen receive a fitness bonus based on the amount of time it took for them to get there. Agents that collide with the top of the screen have their fitness set to 0. Agents that collide with a blockade receive a small fitness penalty.

## The Agents
Each agent is represented as a colored bubble. The color is based on their performance compared to the rest of the population: a gradient between green and red is used, where top performers are more green and bottom performers are more red. Additionally, the generations current best performer will be shown as cyan. 

## Creating each Population
The movement of each agent is determined by a flowfield, which serves as the genetics of that agent (a basic representation of the current best agent's flowfield can be toggled by pressing 'b'). The first generation's flowfields are generated randomly. For each subsequent generation, the flowfields are created by "breeding" the previous generation's best performers. Only agents whose performance is average or better are used as parents. The better a given agent's fitness, the more likely it is to be chosen as a parent. To create each agent in the next generation two parents are chosen and their flowfields are randomly combined to create a new flowfield. Additionally, there is a very small chance mutation will occur and a given section of the flowfield will be determined randomly instead of inherited.

## Other Information
The current generation number, the highest agent fitness seen overall, and the average change in fitness from the previous generation can be seen below the traversable field. Additionally, the cycle count is shown. Each generation contains 500 agents and runs for 500 cycles.
