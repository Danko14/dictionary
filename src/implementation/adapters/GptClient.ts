import { WordEntry } from '../../entities/WordEntry.js'
import { IGptClient } from '../../interfaces/IGptClient.js'
import { createPrompt } from '../../utils/createGptPrompt.js'

class GptResponseParser {
    static parse(data) {
        const {
            initialForm,
            meaning,
            pronunciation,
            forms,
            synonyms,
            commonPhrases,
            partOfSpeech,
            usageExamples,
        } = JSON.parse(data)
        return new WordEntry({
            initialForm,
            meaning,
            pronunciation,
            forms,
            synonyms,
            lexicalCategory: partOfSpeech,
            commonPhrases,
            usageExamples,
        })
    }
}

export class GptClient implements IGptClient {
    async getWordData(payload: { word: string }): Promise<WordEntry> | null {
        const prompt = createPrompt(payload.word)

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GPT_API_KEY}`,
        }

        const body = JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', 'content': prompt }],
        })

        try {
            const response = await fetch(
                process.env.GPT_API_URL,
                {
                    method: 'POST',
                    headers,
                    body,
                },
            )

            const data = await response.json()

            if (data.choices[0].message.content === '404') return null

            return (GptResponseParser.parse(data.choices[0].message.content))
        } catch (error) {
            throw new Error(error)
        }
    }
}
