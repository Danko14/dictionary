import { WordEntry } from '../entities/WordEntry'

export interface IGptClient{
  getWordData(payload: { word: string }): Promise<WordEntry> | null
}
