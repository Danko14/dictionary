import Knex from 'knex'
import { HttpApplication } from './application.http.js'
import { DictionaryService } from './implementation/dictionary/DictionaryService.js'
import { DictionaryRepository } from './implementation/dictionary/DictionaryRepository.js'
import { GptClient } from './implementation/adapters/GptClient.js'

const main = async () => {

    const knex = Knex({
        client: 'postgresql',
        connection: {
            host: process.env.PG_HOST ?? 'postgres',
            port: Number(process.env.PG_PORT ?? '5432'),
            user: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
        },
    })

    const dictionaryRepo = new DictionaryRepository({ knex })

    const gptClient = new GptClient()

    const dictionaryService = new DictionaryService({ gptClient, dictionaryRepo })

    const app = new HttpApplication({ dictionaryService }, {
        host: process.env.HTTP_HOST ?? '0.0.0.0',
        port: Number(process.env.HTTP_PORT ?? 80),
    })

    await app.init()
    await app.start()
    process.once('SIGINT', async () => {
        await app.stop()
        process.exit(0)
    })
}

main().catch(e => {
    console.error(e)
    process.exit(1)
})
