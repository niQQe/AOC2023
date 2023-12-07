const fs = require('fs');

const input = fs.readFileSync('day7-input.txt', 'utf8').split`\r\n`

const cardValues = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
const handTypes = ['highCard', 'onePair', 'twoPairs', 'threeOfaKind', 'fullHouse', 'fourOfAKind', 'fiveOfAKind'];

const resultPart1 = Object.keys(cardsByType = Object.entries(input.reduce((acc, curr, i) => {
	const [hand, bid] = curr.split` `
	const cards = hand.split``
	acc[`${i}-${bid}`] = {}
	for (const card of cards) {
		acc[`${i}-${bid}`][card] = (acc[`${i}-${bid}`][card] || 0) + 1
	}
	return acc
}, {})).reduce((groupedTypes, curr) => {
	const [indexAndBid, hand] = Object.entries(curr);
	const [index, bid] = indexAndBid[1].split('-');
	const handValues = Object.values(hand[1]);
	const handTypes = {
		onePair: handValues.filter(v => v === 2).length === 1 && !handValues.includes(3),
		twoPairs: handValues.filter(v => v === 2).length === 2,
		threeOfaKind: handValues.includes(3) && !handValues.includes(2),
		fourOfAKind: handValues.includes(4),
		fiveOfAKind: handValues.includes(5),
		fullHouse: handValues.includes(3) && handValues.includes(2),
		highCard: handValues.every(v => v === 1)
	};

	const card = input[index].split(' ')[0];

	for (const type in handTypes) {
		if (handTypes[type]) groupedTypes[type].push({ card, bid });
	}

	return groupedTypes;
}, handTypes.reduce((acc, handType) => {
	acc[handType] = [];
	return acc;
}, {}))).reduce((acc, type) => {
	const values = cardsByType[type]
	const sortedCards = values.sort((a, b) => {
		const currentCards = a.card.split('').map(v => cardValues[v]);
		const nextCards = b.card.split('').map(v => cardValues[v]);
		const order = currentCards.findIndex((card, index) => card !== nextCards[index]);
		return order === -1 ? 0 : currentCards[order] < nextCards[order] ? -1 : 1;
	})
	acc.push(sortedCards)
	return acc
}, []).flat()
	.map((item, index) => +item.bid * (index + 1))
	.reduce((sum, value) => sum + value, 0);

console.log(resultPart1);


