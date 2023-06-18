export type TimeInterval = { startDate?: Date, endDate?: Date }

export type WordId = string
export type LexicalCategory = string /* тут могут возникнуть сложности
с различными языками, в которых может быть разное количество частей речи */

export type WordsListItem = {
  id: WordId,
  word: string
}

export type WordsList = WordsListItem[]

export type PaginatedList<T> = {
  items: T[],
  total: number
}
