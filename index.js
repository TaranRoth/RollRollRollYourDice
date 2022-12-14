function init() {
    form = document.getElementById("dice-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let numDice = parseInt(form.elements["num-of-dice"].value);
        let timesToRoll = parseInt(form.elements["times-to-roll"].value);
        let rolls = rollDie(numDice, timesToRoll);
        let sums = convertToSums(rolls);
        let freq = convertToFreq(sums, numDice);
        let doubles = numDice > 1 ? countDoubles(rolls) : -1;
        let triples = numDice > 2 ? countTriples(rolls) : -1;
        let mean = sums.reduce((total, currentValue) => {
            return total + currentValue;
        }) / sums.length;
        let median = sums.sort()[Math.floor(sums.length / 2)];
        let mode;
        let max_freq = 0;
        for (const key in freq) {
            if (freq[key] > max_freq) {
                max_freq = freq[key];
                mode = key;
            }
        }
        display(freq, doubles, triples, mean, median, mode, numDice);
        
    });
}

function display(freq, doubles, triples, mean, median, mode, numDice) {
    let table = document.getElementById("info-table")
    let html = "";
    for (const key in freq) {
        html += `<tr><td>Frequency of ${key}</td><td>${freq[key]}</td></tr>`;
    }
    if (numDice > 1) html += `<tr><td>Amount of doubles</td><td>${doubles}</td></tr>`;
    if (numDice > 2) html += `<tr><td>Amount of triples</td><td>${triples}</td></tr>`;  
    html += `<tr><td>Mean</td><td>${mean}</td></tr>`;
    html += `<tr><td>Median</td><td>${median}</td></tr>`
    html += `<tr><td>Mode</td><td>${mode}</td></tr>`
    table.innerHTML = html;
}

function rollDie(numDice, timesToRoll) {
    let rolls = [];
    for (let i = 0; i < timesToRoll; i++) {
        rolls.push(getRollSet(numDice));
    }
    return rolls;
}

function getRollSet(numDice) {
    let rolls = [];
    for (let i = 0; i < numDice; i++) rolls.push(getRandomNumber(1, 6))
    return rolls;
}

function getRandomNumber(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
}

function printMatrix(matrix) {
    for (var i = 0; i < matrix.length; i++) {
        var row = matrix[i];
        for (var j = 0; j < row.length; j++) {
            console.log(row[j]);
        }
        console.log("\n");
  }
}

function convertToSums(rolls) {
    let arrOfSums = []
    rolls.forEach((r) => {
        let c = 0;
        r.forEach((roll) => c += roll);
        arrOfSums.push(c);
    })
    return arrOfSums;
}

function convertToFreq(sums, numDice) {
    let dictOfFreq = {}
    let upper = numDice == 1 ? 6 : numDice == 2 ? 12 : 18;
    for (i = numDice; i <= upper; i++) {
        dictOfFreq[i] = 0;
    }
    sums.forEach((sum) => {
        dictOfFreq[sum] += 1;
    })
    return dictOfFreq;
}

function countDoubles(rolls) {
    let c = 0;
    rolls.forEach((r) => {
        doubleFound = false;
        for (i = 0; i < r.length; i++) {
            if (r.indexOf(r[i]) !== i) doubleFound = true;
        }
        if (doubleFound) c++;
    });
    return c;
}

function countTriples(rolls) {
    let c = 0;
    rolls.forEach((r) => {
        if (r[0] == r[1] && r[1] == r[2]) c++;
    });
    return c;
}