const input = fs.readFileSync('day9-input.txt', 'utf8').split`\r\n`.map(v => v.split` `.map(v => +v))

const resultPart1 = input.reduce((totalSum, dataset) => {
	const history = [[...dataset]]
	let historyIndex = 0

	while (!history.at(-1).every(n => n === 0)) {
		const sequences = []
		for (let numberIndex = 0; numberIndex < history[historyIndex].length; numberIndex++) {
			const currentValue = history[historyIndex][numberIndex]
			const nextValue = history[historyIndex][numberIndex + 1]
			if (nextValue === undefined) break
			if (currentValue < nextValue) {
				sequences.push(Math.abs(currentValue - nextValue))
			} else {
				sequences.push(nextValue - currentValue)
			}
		}
		history.push(sequences)
		historyIndex++
	}

	const sum = history.reduce((totalSequenceSum, sequence) => totalSequenceSum += sequence.at(-1), 0)
	return totalSum += sum
}, 0)

console.log(resultPart1);

