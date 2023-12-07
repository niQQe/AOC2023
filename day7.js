const fs = require('fs');

const input = fs.readFileSync('day7-input.txt', 'utf8').split`\r\n`

const cardValues = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
const handTypes = ['high-card', 'one-pair', 'two-pair', 'three-of-a-kind', 'full-house', 'four-of-a-kind', 'five-of-a-kind'];

const resultPart1 = Object.keys(cardsByType = Object.entries(input.reduce((acc, curr, i) => {
	const [hand, bid] = curr.split` `
	const cards = hand.split``
	acc[`${i}-${bid}`] = {}
	for (const card of cards) {
		acc[`${i}-${bid}`][card] = (acc[`${i}-${bid}`][card] || 0) + 1
	}
	return acc
}, {})).reduce((acc, curr) => {
	const [indexAndBid, hand] = Object.entries(curr);
	const [index, bid] = indexAndBid[1].split('-');
	const handValues = Object.values(hand[1]);
	const handTypes = {
		pairs: handValues.filter(v => v === 2).length,
		threeOfAKind: handValues.includes(3),
		fourOfAKind: handValues.includes(4),
		fiveOfAKind: handValues.includes(5),
		isFullHouse: handValues.includes(3) && handValues.includes(2),
		isHighCard: handValues.every(v => v === 1)
	};
	const cardNumber = input[index].split(' ')[0];

	if (handTypes.fiveOfAKind) acc['five-of-a-kind'].push({ number: cardNumber, bid });
	if (handTypes.isFullHouse) acc['full-house'].push({ number: cardNumber, bid });
	if (handTypes.fourOfAKind) acc['four-of-a-kind'].push({ number: cardNumber, bid });
	if (handTypes.threeOfAKind && !handTypes.isFullHouse) acc['three-of-a-kind'].push({ number: cardNumber, bid });
	if (handTypes.pairs === 2) acc['two-pair'].push({ number: cardNumber, bid });
	if (handTypes.pairs === 1 && !handTypes.threeOfAKind) acc['one-pair'].push({ number: cardNumber, bid });
	if (handTypes.isHighCard) acc['high-card'].push({ number: cardNumber, bid });

	return acc;
}, handTypes.reduce((acc, handType) => {
	acc[handType] = [];
	return acc;
}, {}))).reduce((acc, type) => {
	const values = cardsByType[type]
	const sortedCards = values.sort((a, b) => {
		const currentCards = a.number.split('').map(v => cardValues[v]);
		const nextCards = b.number.split('').map(v => cardValues[v]);
		const order = currentCards.findIndex((card, index) => card !== nextCards[index]);
		return order === -1 ? 0 : currentCards[order] < nextCards[order] ? -1 : 1;
	})
	acc.push(sortedCards)
	return acc
}, []).flat()
	.map((item, index) => +item.bid * (index + 1))
	.reduce((sum, value) => sum + value, 0);

console.log(resultPart1);


