import { WordEntry } from '../../entities/WordEntry.js'
import { IWordSpecification } from '../../interfaces/IWordSpecification.js'

export class WordsSpecification implements IWordSpecification {
    private id: WordEntry['id'] = null
    private word: string
    private limit: number | null = null
    private offset: number | null = null

    getId(): WordEntry['id'] | null {
        return this.id
    }

    setId(id: WordEntry['id']) {
        this.id = id
    }

    getWord(): string {
        return this.word
    }

    setWord(word: string): void {
        this.word = word
    }

    getLimit(): number | null {
        return this.limit
    }

    setLimit(limit: number) {
        this.limit = limit
    }

    getOffset(): number | null {
        return this.offset
    }

    setOffset(offset: number) {
        this.offset = offset
    }
}
