import { WordEntry } from '../entities/WordEntry'
import { PaginatedList, WordsListItem } from '../types/common'

export interface IDictionaryService{
  getWords(query): Promise<PaginatedList<WordsListItem>>
  getWord(query): Promise<WordEntry> | Promise<null>
}
