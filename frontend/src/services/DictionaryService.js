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
    console.log( JSON.stringify({ word }))
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

      console.log(resp)
      const wordData = await resp.json()

      console.log(wordData)

      return wordData
  }
}
