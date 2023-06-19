import { WordEntry } from '../../entities/WordEntry.js'
import { NotFoundError } from '../../errors/domain/index.js'
import { IDictionaryService } from '../../interfaces/IDictionaryService.js'
import { IGenericRepository } from '../../interfaces/IGenericRepository.js'
import { IGptClient } from '../../interfaces/IGptClient.js'
import { IWordSpecification } from '../../interfaces/IWordSpecification.js'
import { PaginatedList, WordsListItem } from '../../types/common.js'
import { WordsSpecification } from './WordsSpecification.js'

export class DictionaryService implements IDictionaryService {
    dictionaryRepo: IGenericRepository<WordEntry, IWordSpecification>
    gptClient: IGptClient

    constructor(deps: {
        gptClient: IGptClient,
        dictionaryRepo: IGenericRepository<WordEntry, IWordSpecification>
    }) {
        this.gptClient = deps.gptClient
        this.dictionaryRepo = deps.dictionaryRepo
    }

    async getWord(data): Promise<WordEntry> {
        const { word } = data

        let wordData
        try {
            const formSpecification = new WordsSpecification()
            formSpecification.setWord(word)

            const wordForm = await this.dictionaryRepo.getOne(formSpecification, 'words_forms')

            const wordSpecification = new WordsSpecification()
            wordSpecification.setId(wordForm.initial)

            wordData = await this.dictionaryRepo.getOne(wordSpecification, 'words_cards')
        } catch (e) {
            if (e instanceof NotFoundError) {
                wordData = await this.gptClient.getWordData({ word })

                if (wordData === null) {
                    throw new NotFoundError()
                }

                if (wordData.forms.length) {
                    if (!wordData.forms.includes(word)) {
                        wordData.forms.push(word)
                    }
                    const newWord = await this.saveWord(wordData)
                    newWord.forms = wordData.forms

                    await this.saveForms(newWord)
                }
            } else { throw e }
        }

        // const gptResponse = this.gptClient.getWordData({ word })

        return wordData
    }

    async getWords(query): Promise<PaginatedList<WordsListItem>> {
        const { offset, limit } = query
        const specification = new WordsSpecification()

        if (offset) specification.setOffset(offset)
        if (limit) specification.setLimit(limit)

        return await this.dictionaryRepo.getList(specification)
    }

    private async saveWord(word: WordEntry): Promise<WordEntry> {
        // if (!word.forms.length) return
        return this.dictionaryRepo.createOne(word, 'words')
    }

    private async saveForms(word: WordEntry) {
        return this.dictionaryRepo.createMany(word, 'words_forms')
    }
}
