const fs = require('fs');

const input = fs.readFileSync('day8-input.txt', 'utf8').split`\r\n`

const instructions = input[0].split``.map(v => v === 'R' ? 1 : 0)

const parsedData = input.slice(2).reduce((acc, curr) => {
	const [key, values] = curr.split` = `
	const parsedValues = values.replace(/[() ]/g, '').split`,`;
	acc[key] = parsedValues
	return acc
}, {});

let resultPart1 = 0;
let instructionIndex = 0;
let nodeIndex = Object.keys(parsedData).indexOf('AAA');
let currentNode;

const targetNode = 'ZZZ'
const network = Object.entries(parsedData);
const nodes = Object.keys(parsedData);

while (currentNode !== targetNode) {
	const [_, nodeValues] = network[nodeIndex];
	const instruction = instructions[instructionIndex]
	currentNode = nodeValues[instruction];
	nodeIndex = nodes.indexOf(currentNode);
	instructionIndex = (instructionIndex + 1) % instructions.length
	resultPart1++;
}

console.log(resultPart1);
