import type { LexicalCategory, WordId } from '../types/common'

export class WordEntry {
    id: WordId
    initialForm: string
    meaning: string[]
    pronunciation: string
    lexicalCategory: LexicalCategory
    commonPhrases: string[]
    usageExamples: string[]
    synonyms: string[]
    forms: string[]
    createdAt: string

    constructor(data: Partial<WordEntry>) {
        Object.assign(this, data)
    }

    getId() {
        return this.id
    }

    getInitialForm() {
        return this.initialForm
    }

    getMeaning() {
        return this.meaning
    }

    getPronunciation() {
        return this.pronunciation
    }

    getLexicalCathegory() {
        return this.lexicalCategory
    }

    getCommonPhrases() {
        return this.commonPhrases
    }

    getUsageExamples() {
        return this.usageExamples
    }

    getSynonyms() {
        return this.synonyms
    }

    getForms() {
        return this.forms
    }
}

export class FormEntry {
    id: WordId
    initial: WordId
    form: string

    constructor(data: Partial<FormEntry>) {
        Object.assign(this, data)
    }

    getId() {
        return this.id
    }

    getInitial() {
        return this.initial
    }

    getForm() {
        return this.form
    }
}
