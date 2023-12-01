const fs = require('fs');

const input = fs.readFileSync('day1-input.txt', 'utf8').split``

const result = input.reduce((result, instruction, index) => {
	result.part1 += instruction === '(' ? 1 : -1
	if (result.part1 === -1 && !result.part2) {
		result.part2 = index + 1
	}
	return result
}, { part1: 0, part2: null })

console.log(result);


