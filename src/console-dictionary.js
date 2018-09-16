'use strict';

const axios = require('axios');

const baseURL = process.env.API_BASE_URL;
const appId = process.env.APPLICATION_ID;
const appKey = process.env.APPLICATION_KEY;
const languageCode = process.env.LANGUAGE_CODE;

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['app_id'] = appId;
axios.defaults.headers.common['app_key'] = appKey;
axios.defaults.headers.common['Content-Type'] = 'application/json';

async function getHeadWord(word) {
    try {
        const inflectionResponse = await axios.get(`/inflections/${languageCode}/${word}`);
        const inflectionResponseData = inflectionResponse && inflectionResponse.data;
        const inflectionResponseResult = inflectionResponseData && inflectionResponseData.results && Array.isArray(inflectionResponseData.results) && inflectionResponseData.results[0];
        const inflectionLexicalEntry = inflectionResponseResult && inflectionResponseResult.lexicalEntries && Array.isArray(inflectionResponseResult.lexicalEntries) && inflectionResponseResult.lexicalEntries[0];
        const inflectionOf = inflectionLexicalEntry && inflectionLexicalEntry.inflectionOf && Array.isArray(inflectionLexicalEntry.inflectionOf) && inflectionLexicalEntry.inflectionOf[0];
        const headWord = inflectionOf && inflectionOf.text;
        return headWord;
    } catch (error) {
        throw error;
    }
}

exports.getDefinitions = async (word) => {
    let definitionsList = [];
    try {
        let headWord = await getHeadWord(word);
        if (headWord) {
            const definitionResponse = await axios.get(`/entries/${languageCode}/${headWord}`);
            const definitionResponseData = definitionResponse && definitionResponse.data;
            const definitionResponseResult = definitionResponseData && definitionResponseData.results && Array.isArray(definitionResponseData.results) && definitionResponseData.results[0];
            const definitionLexicalEntry = definitionResponseResult && definitionResponseResult.lexicalEntries && Array.isArray(definitionResponseResult.lexicalEntries) && definitionResponseResult.lexicalEntries[0];
            const definitionEntry = definitionLexicalEntry && definitionLexicalEntry.entries && Array.isArray(definitionLexicalEntry.entries) && definitionLexicalEntry.entries[0];
            const definitionSense = definitionEntry && definitionEntry.senses && Array.isArray(definitionEntry.senses) && definitionEntry.senses[0];
            const wordDefinitions = definitionSense && definitionSense.definitions && Array.isArray(definitionSense.definitions) && definitionSense.definitions;
            for (const definition of wordDefinitions) {
                definitionsList.push(definition);
            }
            return definitionsList;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
};

exports.getSynonyms = async (word) => {
    let synonymsList = [];
    try {
        let headWord = await getHeadWord(word);
        if (headWord) {
            const synonymResponse = await axios.get(`/entries/${languageCode}/${headWord}/synonyms`);
            const synonymResponseData = synonymResponse && synonymResponse.data;
            const synonymResponseResult = synonymResponseData && synonymResponseData.results && Array.isArray(synonymResponseData.results) && synonymResponseData.results[0];
            const synonymLexicalEntry = synonymResponseResult && synonymResponseResult.lexicalEntries && Array.isArray(synonymResponseResult.lexicalEntries) && synonymResponseResult.lexicalEntries[0];
            const synonymEntry = synonymLexicalEntry && synonymLexicalEntry.entries && Array.isArray(synonymLexicalEntry.entries) && synonymLexicalEntry.entries[0];
            const synonymSense = synonymEntry && synonymEntry.senses && Array.isArray(synonymEntry.senses) && synonymEntry.senses[0];
            const wordSynonyms = synonymSense && synonymSense.synonyms && Array.isArray(synonymSense.synonyms) && synonymSense.synonyms;
            for (const synonym of wordSynonyms) {
                synonymsList.push(synonym && synonym.text);
            }
            return synonymsList;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
};

exports.getAntonyms = async (word) => {
    let antonymsList = [];
    try {
        let headWord = await getHeadWord(word);
        if (headWord) {
            const antonymResponse = await axios.get(`/entries/${languageCode}/${headWord}/antonyms`);
            const antonymResponseData = antonymResponse && antonymResponse.data;
            const antonymResponseResult = antonymResponseData && antonymResponseData.results && Array.isArray(antonymResponseData.results) && antonymResponseData.results[0];
            const antonymLexicalEntry = antonymResponseResult && antonymResponseResult.lexicalEntries && Array.isArray(antonymResponseResult.lexicalEntries) && antonymResponseResult.lexicalEntries[0];
            const antonymEntry = antonymLexicalEntry && antonymLexicalEntry.entries && Array.isArray(antonymLexicalEntry.entries) && antonymLexicalEntry.entries[0];
            const antonymSense = antonymEntry && antonymEntry.senses && Array.isArray(antonymEntry.senses) && antonymEntry.senses[0];
            const wordAntonyms = antonymSense && antonymSense.antonyms && Array.isArray(antonymSense.antonyms) && antonymSense.antonyms;
            for (const antonym of wordAntonyms) {
                antonymsList.push(antonym && antonym.text);
            }
            return antonymsList;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
};

exports.getExamples = async (word) => {
    let examplesList = [];
    try {
        let headWord = await getHeadWord(word);
        if (headWord) {
            const exampleResponse = await axios.get(`/entries/${languageCode}/${headWord}`);
            const exampleResponseData = exampleResponse && exampleResponse.data;
            const exampleResponseResult = exampleResponseData && exampleResponseData.results && Array.isArray(exampleResponseData.results) && exampleResponseData.results[0];
            const exampleLexicalEntry = exampleResponseResult && exampleResponseResult.lexicalEntries && Array.isArray(exampleResponseResult.lexicalEntries) && exampleResponseResult.lexicalEntries[0];
            const exampleEntry = exampleLexicalEntry && exampleLexicalEntry.entries && Array.isArray(exampleLexicalEntry.entries) && exampleLexicalEntry.entries[0];
            const exampleSense = exampleEntry && exampleEntry.senses && Array.isArray(exampleEntry.senses) && exampleEntry.senses[0];
            const wordExamples = exampleSense && exampleSense.examples && Array.isArray(exampleSense.examples) && exampleSense.examples;
            for (const example of wordExamples) {
                examplesList.push(example && example.text);
            }
            return examplesList;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
};