const fs = require('fs/promises');

async function automata(location = null) {

    const transitions = {
        1: { w: 12, e: 15, other: 1 },
        12: { e: 135, w: 12, other: 1 },
        135: { b: 146, e: 15, w: 12, other: 1 },
        18: { w: 12, e: 15, other: 1 },
        146: { a: 17, e: 15, w: 12, other: 1 },
        15: { w: 12, e: 15, b: 16, other: 1 },
        16: { w: 12, a: 17, e: 15, other: 1 },
        17: { w: 12, y: 18, e: 15, other: 1 }
    }

    const acceptanceStates = { 18: 'ebay', 146: 'web' };

    try {
        let content = await fs.readFile('./files/EjemploWebEbayCETI.txt', { encoding: 'utf-8' });
        content = content.toLowerCase();
        characters = content.split('');

        const counters = { ebay: 0, web: 0 };

        process(transitions, characters, acceptanceStates, 1, counters);

        return { status: 200, counters, characters };

    } catch (error) {
        return { status: 500, message: error };
    }

}

function process(transitions, characters, acceptanceStates, currentState, counters) {

    if (Object.hasOwnProperty.call(acceptanceStates, currentState)) {
        counters[acceptanceStates[currentState]] += 1;
    }

    if (characters.length > 0) {

        const character = characters.shift();

        for (const key in transitions[currentState]) {
            const element = transitions[currentState][key];
            if (character === key) {
                return process(transitions, characters, acceptanceStates, element, counters);
            }
        }

        return process(transitions, characters, acceptanceStates, transitions[currentState].other, counters);
    }

    return counters;

}

// Guarda el archivo el archivo y retorna la ubicacion
function saveFile(file) {
    const location = `./files/${file.name}`;
    file.mv(location, (err) => {
        if (err) {
            return { status: false, message: err };
        }
        return { message: 'File upload', status: true, location };

    })

}

module.exports = { automata, saveFile };