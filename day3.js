const fs = require('fs');

const input = fs.readFileSync('day3-input.txt', 'utf8').split`\r\n`.map(v => v = v += '.')

const SPECIAL_CHARS = "*@#$%+-/=&'"

let resultpart1 = 0

for (let i = 0; i < input.length; i++) {
	const chars = input[i].split``
	let number = ''
	let latestState = []
	for (let j = 0; j < chars.length; j++) {
		if (!isNaN(chars[j])) {
			number += chars[j]
			const directions = {
				num: number,
				left: input[i][j - 1],
				right: input[i][j + 1],
				top: input[i !== 0 ? i - 1 : i][j],
				bottom: input[i !== input.length - 1 ? i + 1 : i][j],
				topLeft: input[i !== 0 ? i - 1 : i][j - 1],
				bottomLeft: input[i !== input.length - 1 ? i + 1 : i][j - 1],
				topRight: input[i !== 0 ? i - 1 : i][j + 1],
				bottomRight: input[i !== input.length - 1 ? i + 1 : i][j + 1]
			};
			latestState.push(directions)
		} else {
			if (number != '') {
				const { num } = latestState.at(-1)
				const values = latestState.map(v => Object.values(v)).flat()
				const state = values.some(v => SPECIAL_CHARS.includes(v))
				if (state) resultpart1 += +num
				latestState = []
				number = ''
			}
		}
	}
}

console.log(resultpart1);