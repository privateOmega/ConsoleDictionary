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
        const headWord = inflectionOf && inflectionOf.id;
        return headWord;
    } catch (error) {
        throw error;
    }
}

exports.getDefinitions = async (word) => {
    try {
        let headWord = await getHeadWord(word);
        if (headWord) {
            const definitionResponse = await axios.get(`/entries/${languageCode}/${headWord}`);
            const definitionResponseData = definitionResponse && definitionResponse.data;
            const definitionResponseResult = definitionResponseData && definitionResponseData.results && Array.isArray(definitionResponseData.results) && definitionResponseData.results[0];
            const definitionLexicalEntry = definitionResponseResult && definitionResponseResult.lexicalEntries && Array.isArray(definitionResponseResult.lexicalEntries) && definitionResponseResult.lexicalEntries[0];
            const definitionEntry = definitionLexicalEntry && definitionLexicalEntry.entries && Array.isArray(definitionLexicalEntry.entries) && definitionLexicalEntry.entries[0];
            const definitionSense = definitionEntry && definitionEntry.senses && Array.isArray(definitionEntry.senses) && definitionEntry.senses[0];
            const wordDefinition = definitionSense && definitionSense.definitions && Array.isArray(definitionSense.definitions) && definitionSense.definitions[0];
            return wordDefinition;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
};
