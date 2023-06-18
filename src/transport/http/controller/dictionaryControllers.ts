import { IDictionaryService } from '../../../interfaces/IDictionaryService'

export const dictionaryControllersFactory = (deps: {
    dictionaryService: IDictionaryService,
}) => ({
    async getWord(req) {
        return deps.dictionaryService.getWord(req.body)
    },

    async getWords(req) {
        return deps.dictionaryService.getWords(req.query)
    },
})
