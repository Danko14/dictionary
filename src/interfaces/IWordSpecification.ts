import { WordEntry } from '../entities/WordEntry'

export interface IWordSpecification{
  getId(): WordEntry['id'] | null

  setId(id: WordEntry['id']): void

  getWord(): string

  setWord(word: string): void

  getLimit(): number | null

  setLimit(limit: number): void

  getOffset(): number | null

  setOffset(offset: number): void
}
