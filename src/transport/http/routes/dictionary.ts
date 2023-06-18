import { FastifyInstance } from 'fastify'
import { GetListRequest, GetWordRequest } from '../../../types/requests'

export const dictionaryRoutesFactory = (schemas, controllers) => async (fastify: FastifyInstance) => {
    fastify.post<GetWordRequest>('/words', {
        schema: schemas.getWordSchema,
        handler: controllers.getWord,
    })

    fastify.get<GetListRequest>('/words', {
        schema: schemas.getListSchema,
        handler: controllers.getWords,
    })
}
