export type WordRequestBody = {
  word: string
}

export type GetWordRequest = {
  Body: WordRequestBody
}

export type GetListQuery = {
  limit: number | null
  offset: number | null
}

export type GetListRequest = {
  Querystring: GetListQuery
}
