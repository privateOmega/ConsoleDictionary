'use strict';

const minimist = require('minimist');
const chalk = require('chalk');
require('dotenv').config();
const {
    getDefinitions,
    getSynonyms,
    getAntonyms,
    getExamples,
    getWordOfTheDay
} = require('./src/console-dictionary');

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
    switch (command) {
        case 'def':
            console.log(`${chalk.red('Definitions')}: ${chalk.blue(await getDefinitions(word))}`);
            break;
        case 'syn':
            console.log(`${chalk.red('Synonyms')}: ${chalk.blue(await getSynonyms(word))}`);
            break;
        case 'ant':
            console.log(`${chalk.red('Antonyms')}: ${chalk.blue(await getAntonyms(word))}`);
            break;
        case 'ex':
            console.log(`${chalk.red('Examples')}: ${chalk.blue(await getExamples(word))}`);
            break;
        case 'dict':
            await getDetails(word);
            break;
        case 'play':
            playGame();
    }
}

async function getDetails(word) {
    let definitionsList = getDefinitions(word);
    let synonymsList = getSynonyms(word);
    let antonymsList = getAntonyms(word);
    let examplesList = getExamples(word);
    console.log(`${chalk.red('Definitions')}: ${chalk.blue(await definitionsList)}`);
    console.log(`${chalk.red('Synonyms')}: ${chalk.blue(await synonymsList)}`);
    console.log(`${chalk.red('Antonyms')}: ${chalk.blue(await antonymsList)}`);
    console.log(`${chalk.red('Examples')}: ${chalk.blue(await examplesList)}`);
}

async function getDetailsForWordOfTheDay() {
    let word = await getWordOfTheDay();
    await getDetails(word);
}

async function playGame() {
    // Show definition, synonym, antonym of a random word
    // TODO: Rewrite logic to find a random word, its synonym, antonym and definition etc
    let randomWord = 'random';
    let synonymsList = await getSynonyms(randomWord);
    try {
        let word = await prompt('Word: ');
        if (word.localeCompare(randomWord) || synonymsList.includes(word)) {
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