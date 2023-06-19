export class DictionaryService {
  static async getWords(limit = 0, offset = 0){
    const resp = await fetch(
      `/words?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': "application/json"
        }
      }
      )

      const words = await resp.json()

      return words
  }

  static async getWord(word){
    const resp = await fetch(
      `/words`,
      {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ word }),
      }
      )

      const wordData = await resp.json()

      return wordData
  }
}
