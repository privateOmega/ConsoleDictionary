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

// Define static list of dictionary commands
const commandList = ['def', 'syn', 'ant', 'ex', 'dict'];

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
