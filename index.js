'use strict';

const minimist = require('minimist');
const chalk = require('chalk');
require('dotenv').config();
const {
    getDefinitions,
    getSynonyms,
    getAntonyms,
    getExamples
} = require('./src/console-dictionary');
const randomWordList = require('./random-word-list').randomWordList;

// Define static list of dictionary commands
const commandList = ['def', 'syn', 'ant', 'ex', 'dict', 'play'];

// Extract command and word from command line arguments
const processArguments = minimist(process.argv.slice(2));
let command = processArguments._[0];
let word = processArguments._[1];


if (commandList.includes(command)) {
    runCommand(command, word);
} else {
    word = command || '';
    if (word) {
        getDetails(word);
    } else {
        getDetailsForWordOfTheDay();
    }
}

async function runCommand(command, word) {
    let definitionsList, synonymsList, antonymsList, examplesList;
    switch (command) {
        case 'def':
            definitionsList = await getDefinitions(word);
            if (definitionsList && Array.isArray(definitionsList) && definitionsList.length > 0) {
                console.log(`${chalk.blue('Definitions')}:`);
                for (const definition of definitionsList) {
                    console.log(`   ${chalk.green(definition)}`);
                }
            } else {
                console.log(`${chalk.red('No definitions found for the word')}`);
            }
            break;
        case 'syn':
            synonymsList = await getSynonyms(word);
            if (synonymsList && Array.isArray(synonymsList) && synonymsList.length > 0) {
                console.log(`${chalk.blue('Synonyms')}:`);
                for (const synonym of synonymsList) {
                    console.log(`   ${chalk.green(synonym)}`);
                }
            } else {
                console.log(`${chalk.red('No synonyms found for the word')}`);
            }
            break;
        case 'ant':
            antonymsList = await getAntonyms(word);
            if (antonymsList && Array.isArray(antonymsList) && antonymsList.length > 0) {
                console.log(`${chalk.blue('Antonyms')}:`);
                for (const antonym of antonymsList) {
                    console.log(`   ${chalk.green(antonym)}`);
                }
            } else {
                console.log(`${chalk.red('No antonyms found for the word')}`);
            }
            break;
        case 'ex':
            examplesList = await getExamples(word);
            if (examplesList && Array.isArray(examplesList) && examplesList.length > 0) {
                console.log(`${chalk.blue('Examples')}:`);
                for (const example of examplesList) {
                    console.log(`   ${chalk.green(example)}`);
                }
            } else {
                console.log(`${chalk.red('No examples found for the word')}`);
            }
            break;
        case 'dict':
            await getDetails(word);
            break;
        case 'play':
            await playGame();
            break;
    }
}

async function getDetails(word) {
    let definitionsList, synonymsList, antonymsList, examplesList;
    definitionsList = getDefinitions(word);
    synonymsList = getSynonyms(word);
    antonymsList = getAntonyms(word);
    examplesList = getExamples(word);
    definitionsList = await definitionsList;
    synonymsList = await synonymsList;
    antonymsList = await antonymsList;
    examplesList = await examplesList;
    if (definitionsList && Array.isArray(definitionsList) && definitionsList.length > 0) {
        console.log(`${chalk.blue('Definitions')}:`);
        for (const definition of definitionsList) {
            console.log(`   ${chalk.green(definition)}`);
        }
    } else {
        console.log(`${chalk.red('No definitions found for the word')}`);
    }
    if (synonymsList && Array.isArray(synonymsList) && synonymsList.length > 0) {
        console.log(`${chalk.blue('Synonyms')}:`);
        for (const synonym of synonymsList) {
            console.log(`   ${chalk.green(synonym)}`);
        }
    } else {
        console.log(`${chalk.red('No synonyms found for the word')}`);
    }
    if (antonymsList && Array.isArray(antonymsList) && antonymsList.length > 0) {
        console.log(`${chalk.blue('Antonyms')}:`);
        for (const antonym of antonymsList) {
            console.log(`   ${chalk.green(antonym)}`);
        }
    } else {
        console.log(`${chalk.red('No antonyms found for the word')}`);
    }
    if (examplesList && Array.isArray(examplesList) && examplesList.length > 0) {
        console.log(`${chalk.blue('Examples')}:`);
        for (const example of examplesList) {
            console.log(`   ${chalk.green(example)}`);
        }
    } else {
        console.log(`${chalk.red('No examples found for the word')}`);
    }
}

async function getDetailsForWordOfTheDay() {
    let randomWord = randomWordList[Math.floor(Math.random() * randomWordList.length)];
    console.log(`${chalk.blue('Word Of The Day')}:   ${chalk.green(randomWord)}`);
    await getDetails(randomWord);
}

async function playGame() {
    let randomWord = randomWordList[Math.floor(Math.random() * randomWordList.length)];
    let definitionsList = getDefinitions(randomWord);
    let synonymsList = getSynonyms(randomWord);
    let antonymsList = getAntonyms(randomWord);
    definitionsList = await definitionsList;
    synonymsList = await synonymsList;
    antonymsList = await antonymsList;
    let randomStringArray = [`${chalk.blue('Definition')}:   ${chalk.green(definitionsList[Math.floor(Math.random() * definitionsList.length)])}`, `${chalk.blue('Synonym')}:   ${chalk.green(synonymsList[Math.floor(Math.random() * synonymsList.length)])}`, `${chalk.blue('Antonym')}:   ${chalk.green(antonymsList[Math.floor(Math.random() * antonymsList.length)])}`];
    console.log(randomStringArray[Math.floor(Math.random() * randomStringArray.length)]);
    try {
        let word = '';
        let correct = false;
        let choice = 3;
        do {
            word = await prompt('Word: ');
            correct = word.toLowerCase() === randomWord.toLowerCase() || synonymsList.includes(word);
            if (correct) {
                break;
            }
            choice = await prompt('1. Try Again\t2. Hint\t3. Quit:\n');
            switch (parseInt(choice)) {
                case 1:
                    break;
                case 2:
                    randomStringArray[3] = `${chalk.blue('Scrambled Word')}:   ${chalk.green(randomWord.split(' ').map(function (w) {
                        return w.shuffle();
                    }).join(' '))}`;
                    console.log(randomStringArray[Math.floor(Math.random() * randomStringArray.length)]);
                    break;
                case 3:
                    await getDetails(randomWord);
                    break;
                default:
                    throw ('Wrong choice');
            }
        } while (parseInt(choice) !== 3);
        if (correct) {
            console.log(`${chalk.blue('Word is correct')}`);
        }
    } catch (error) {
        throw error;
    }
}

function prompt(promptStatement) {
    return new Promise((resolve, reject) => {
        const {
            stdin,
            stdout
        } = process;
        stdin.resume();
        stdout.write(promptStatement);
        stdin.on('data', (data) => {
            resolve(data.toString().trim());
        });
        stdin.on('error', (error) => {
            reject(error);
        });
    });
}