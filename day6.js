const fs = require('fs');
const input = fs.readFileSync('day6-input.txt', 'utf-8').split('\r\n').map(v => v.split`: `[1].trim()).map(v => v.split` `.filter(v => v))

const groupedRaces = input[0].reduce((accumulator, current, i) => {
	const value = `${current} ${input[1][i]}`;
	accumulator.push(value)
	return accumulator;
}, [])

const resultPart1 = Object.values(groupedRaces.reduce((acc, _, index) => {
	const [time, distance] = groupedRaces[index].split` `.map(v => +v)
	for (const i of Array(time + 1).keys()) {
		const travel = (time - i) * i;
		if (travel > distance) acc[index]++;
	}
	return acc
}, groupedRaces.reduce((acc, _, i) => {
	acc[i] = 0;
	return acc;
}, {}))).reduce((a, b) => a * b)

console.log(resultPart1);
