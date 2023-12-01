const fs = require('fs');

const input = fs.readFileSync('day1-input.txt', 'utf8').split`\n`

const part1 = input.reduce((sum, r) => sum + +((d = r.replace(/\D/g, '')).length > 2 ? `${d[0]}${d.slice(-1)}` : d.length === 1 ? `${d}${d}` : d), 0);

console.log(part1);








