export const getWordSchema = {
    description: 'Get word card',
    tags: ['dictionary'],
    body: {
        type: 'object',
        properties: {
            word: { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            description: 'Word',
            properties: {
                id: { type: 'string' },
                initialForm: { type: 'string' },
                meaning: {
                    type: 'array',
                    items: { type: 'string' },
                },
                pronunciation: { type: 'string' },
                lexicalCategory: { type: 'string' },
                commonPhrases: {
                    type: 'array',
                    items: { type: 'string' },
                },
                usageExamples: {
                    type: 'array',
                    items: { type: 'string' },
                },
                synonyms: {
                    type: 'array',
                    items: { type: 'string' },
                },
                forms: {
                    type: 'array',
                    items: { type: 'string' },
                },
            },
        },
        400: {
            type: 'object',
            description: 'Bad Request',
            properties: { message: { type: 'string' } },
        },
        403: {
            type: 'object',
            description: 'Forbidden',
            properties: { message: { type: 'string' } },
        },
    },
}
