const fs = require('fs');

const input = fs.readFileSync('day4-input.txt', 'utf8').split`\r\n`

const resultPart1 = input.reduce((totalPoints, card) => {
	const parsedCard = card.split(/: |\|/).map(v => v.trim().split` `.filter(v => v))
	const [_, winningNumbers, yourNumbers] = parsedCard
	const pointsPerCard = yourNumbers.reduce((points, number) => {
		if (winningNumbers.includes(number)) {
			points === 0 ? points += 1 : points += points
		}
		return points
	}, 0)
	return totalPoints += pointsPerCard
}, 0)

console.log(resultPart1);