export const createPrompt = (word: string) => {
    const SOURCE_LANG = 'English'
    return `SYSTEM: You are a multilingual dictionary. Provide strictly verified information only.
    
    The word "${word}" is in "${SOURCE_LANG}", provide the following for it:
    Provide word's initial form.
    Provide phonetic transcription of word's initial form in brackets. 
          Provide word's meanings.
          Provide word's part of speech.
          Provide examples with "${word}" in "${SOURCE_LANG}" and what part of speech the word "${word}" is in these examples. CHECK that all examples are SPELT CORRECTLY and you have identified the parts of speech in these examples CORRECTLY!
          For each time "${word}" or it's form occur in the example, wrap it with double square brackets.
          List all forms of the word "${word}" in "${SOURCE_LANG}", including the original word, each in one word. If there's only one form of this word, provide only one form.
          Provide 3 synonyms for the word "${word}". 
          Provide 3 common phrases with "${word}". For each time "${word}" or it's form occur in the phrase, wrap it with double square brackets.
                    
          Present in:
                      
          {
            "initialForm": value,
            "meaning": ["value"],
            "partOfSpeech": "value"
            "pronunciation:": "[value]",
            "usageExamples": ["value"],
            "forms": ["value”],
            "synonyms": ["synonym", "synonym"],
            "commonPhrases": [value]
          }

          If "${SOURCE_LANG}" doesn't have "${word}" or you don't know this word, or there is any other reason why you can't provide with information, return '404'.`
}
