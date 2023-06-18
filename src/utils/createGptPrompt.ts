export const createPrompt = (word: string) => {
    const SOURCE_LANG = 'English'
    return `SYSTEM: You are a multilingual dictionary. Provide strictly verified information only.
    
    The word "${word}" is in "${SOURCE_LANG}", provide the following for it:
    Provide phonetic transcription of the word "${word}" in brackets. 
          Provide word's initial form.
          Provide word's meaning.
          Provide word's part of speech.
          Provide examples with "${word}" in "${SOURCE_LANG}" and what part of speech the word "${word}" is in these examples. CHECK that all examples are SPELT CORRECTLY and you have identified the parts of speech in these examples CORRECTLY! 
          List all forms of the word "${word}" in "${SOURCE_LANG}". If there's only one form of this word, provide only one form.
          Provide 3 synonyms for the word "${word}". 
          Provide 3 common phrases with "${word}". For each time "${word}" or it's form occure in phrase, wrap it with double square brackets.
                    
          Present in:
                      
          {
            "initialForm": value,
            "meaning": "value",
            "partOfSpeech": "value"
            "pronunciation:": "[value]",
            "usageExamples": ["value"],
            "forms": ["value”],
            "synonyms": ["synonym", "synonym"],
            "commonPhrases": [value]
          }

          If "${SOURCE_LANG}" doesn't have "${word}" or you don't know this word, or there is any other reason why you can't provide with information, return '404'.`
}
