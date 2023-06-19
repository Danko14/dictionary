import { IDictionaryService } from '../../../interfaces/IDictionaryService'

export const dictionaryControllersFactory = (deps: {
    dictionaryService: IDictionaryService,
}) => ({
    async getWord(req) {
        const { word } = req.body
        return deps.dictionaryService.getWord({ word: word.toLowerCase() })
    },

    async getWords(req) {
        return deps.dictionaryService.getWords(req.query)
    },
})
