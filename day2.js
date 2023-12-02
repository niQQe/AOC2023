const fs = require('fs');

const input = fs.readFileSync('day2-input.txt', 'utf8').split`\n`

const bag = {
	red: 12,
	green: 13,
	blue: 14,
}

const parsedGames = input.map(gameString => {
	return gameString.split(':')[1].split(';').map(subset => {
		return subset.trim().split(',').reduce((acc, colorCount) => {
			const [value, color] = colorCount.trim().split(' ');
			acc[color] = +value
			return acc;
		}, {});
	});
});

const result = parsedGames.reduce((acc, game, index) => {
	const gameId = index + 1;
	const isPossible = game.every(subset =>
		Object.entries(subset).every(([color, value]) => value <= bag[color])
	);
	return isPossible ? acc + gameId : acc;
}, 0);

console.log(result);
