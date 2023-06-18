export const getListSchema = {
    description: 'Get list of words',
    tags: ['dictionary'],
    query: {
        type: 'object',
        properties: {
            offset: { type: 'number', nullable: true },
            limit: { type: 'number', nullable: true },
        },
    },
    response: {
        200: {
            description: 'List of words',
            type: 'object',
            properties: {
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            word: { type: 'string' },
                        },
                    },
                },
                total: { type: 'number' },
            },
        },
        400: {
            type: 'object',
            description: 'Bad Request',
            properties: { message: { type: 'string' } },
            required: ['message'],
        },
        403: {
            type: 'object',
            description: 'Forbidden',
            properties: { message: { type: 'string' } },
            required: ['message'],
        },
    },
}
