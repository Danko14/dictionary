import { IDictionaryService } from './interfaces/IDictionaryService'

export class Application {
    dictionaryService: IDictionaryService

    constructor(deps: { dictionaryService: IDictionaryService }) {
        this.dictionaryService = deps.dictionaryService
    }
}
